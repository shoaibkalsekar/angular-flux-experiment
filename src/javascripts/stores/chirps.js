var constants = require("../constants.js");

var ChirpsStore = require("./store.js").extend({
  init: function(){
    this.bind(constants.GOT_CHIRPS, this.set);
    this.bind(constants.CHIRPED, this.add);
  }
});


module.exports = ChirpsStore;