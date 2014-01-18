var app = angular.module("tradingpost",["ngRoute", "firebase", "lvl.services"]);

app.constant("FIREBASE_URL", "https://scorching-fire-2975.firebaseio.com")

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/", { controller: 'homeCtl', templateUrl: '/view/home.html'})
    .when("/add-item", { controller: 'addCtl', templateUrl: '/view/new-item.html'})
    .otherwise({ redirectTo: "/" });
}]);

app.factory('tradingService', ["$firebase", "FIREBASE_URL", function($firebase, FIREBASE_URL) {
  var baseRef = new Firebase(FIREBASE_URL);
  var u = baseRef.child("users");
  var i = baseRef.child("items");

  return {
    userRef: u,
    itemRef: i,

    getUsers: function() { return $firebase(u); },
    getItems: function() { return $firebase(i); }
  };
}]);

app.controller("homeCtl", ["$scope", "uuid", "tradingService", function($scope, uuid, tradingService) {  
  $scope.addUser = function() {
    tradingService.userRef.push(
      { 
        name: "User " +  Math.floor(Math.random() * 100),
        location:  Math.floor(Math.random() * 100),
        prize:  Math.floor(Math.random() * 100),
        want: [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
      }
    );
  };
}]);

app.controller("addCtl", ["$scope", "uuid", "tradingService", function($scope, uuid, tradingService) {
  $scope.reset = function() {
    $scope.item = {
      name: '',
      price: '',
      url: ''
    };
  }

  $scope.addItem = function() {
    tradingService.itemRef.push($scope.item);
  }

  $scope.reset();
}]);