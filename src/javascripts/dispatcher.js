var flux = require("flux");

var dispatcher = new flux.Dispatcher();

dispatcher.register(function(action){
  // Any action that passes through dispatcher(which probably be all actions)
  // Will run this function
  console.log(action);
})

module.exports = dispatcher;