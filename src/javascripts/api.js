var actions = require("./actions");
var dispatcher = require("./dispatcher");
var constants = require("./constants");


var giphy_url = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC";

var API = module.exports = {
  fetchChirps: function(text){
    get(giphy_url, text).then(actions.gotChirps.bind(actions))
  }
}

function get(url, query){
  query = query || "funny cat";
  url = url + "&q=" + query;
  return fetch(url)
          .then(function(res){
            return res.json();
          })
}

dispatcher.register(function(action){
  switch(action.actionType){
    case constants.CHIRP: {
      API.fetchChirps(action.data);
      break;
    }
  }
})