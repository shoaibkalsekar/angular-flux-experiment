var ChirpApp = require("../chirpApp.js");
var ChirpStore = require("../stores/chirps");
var constants = require("../constants");
var actions = require("../actions");

module.exports = ChirpApp.controller('chirpsController', function ($scope) {

  $scope.chirps = [];
  $scope.chirpSearchText = "";

  $scope.onChange = function() {
    console.log("In Controller: Chirps data change");
    $scope.chirps = ChirpStore.all();
    $scope.chirps = _decorate($scope.chirps);

    function _decorate(arr){
      var _arr = [[], [], []];
      arr.map(function(item, i){
        _arr[i%3].push(item);
      });
      return _arr;
    }
    $scope.$apply();
  };

  ChirpStore.addChangeListener($scope.onChange)

  $scope.searchGIF = function (text) {
    actions.chirp(text);
    $scope.chirpSearchText = "";
  }

  $scope.searchGIF("funny cats");
});