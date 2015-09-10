var dispatcher = require("./dispatcher.js");
var constants = require("./constants.js");

Object.keys(constants).forEach(function(key){

  var function_name = key.split("_").map(function(word, i){
    if(i === 0) return word.toLowerCase();
    return word[0] + word.slice(1).toLowerCase();
  }).join("");

  exports[function_name] = function(data){
    dispatcher.dispatch({
      actionType: constants[key],
      data: data
    })
  }

})
