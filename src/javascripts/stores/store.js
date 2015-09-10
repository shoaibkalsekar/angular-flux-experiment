var assign = require("object-assign");
var EventEmitterProto = require("events").EventEmitter.prototype;

var CHANGE_EVENT = "CHANGE_EVENT";
var storeMethods = {
  // Generic methods that all stores should have
  // TODO: Have only 3 generic methods snapshot(), restore(), clear()
  init: function(){},
  set: function(data){
    var arr = data.data;
    // Like a bulk add. However, the problem is you dont want to have duplicates in data.
    // Hence the mess.
    // var currIds = this._data.map(function(m){ return m.id; });
    // arr.filter(function(item){
    //   return currIds.indexOf(item.id) === -1;
    // }).forEach( this.add.bind(this) );

    this._data = arr;

    console.log("Data Store: ", this._data);
  },
  add: function(item){
    this._data.push(item);
  },
  all: function(){
    return this._data;
  },
  get: function(id){
    return this._data.filter(function(item){
      return item.id === id
    })[0]
  },
  addChangeListener: function(fn){
    this.on(CHANGE_EVENT, fn);
  },
  removeChangeListener: function(fn){
    this.remove(CHANGE_EVENT, fn);
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  bind: function(actionType, actionFn){
    if(this.actions[actionType])
      this.actions[actionType].push(actionFn);
    else
      this.actions[actionType] = [actionFn];
  }
}

exports.extend = function(methods){
  // This extend method will allow
  // other stores that are created
  // to use the pub-sub pattern (EventEmitterProto)

  var store = {
    _data: [],
    actions: {}
  }

  // Assign simply copies one object's properties onto another
  // here EventEmitterProto, storeMethods and methods(custom) are copied into store
  assign(store, EventEmitterProto, storeMethods, methods);

  store.init();

  var dispatcher = require("../dispatcher.js");
  dispatcher.register(function(action){
    console.log("In Dispatcher:", action);
    if(store.actions[action.actionType]){
      store.actions[action.actionType].forEach(function(fn){
        fn.call(store, action.data);
        store.emitChange();
      })
    }
  });

  return store;

}