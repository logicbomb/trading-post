var app = angular.module("tradingpost",["ngRoute", "firebase", "lvl.services"]);

app.constant("FIREBASE_URL", "https://scorching-fire-2975.firebaseio.com")

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/", { controller: 'homeCtl', templateUrl: '/view/home.html'})
    .otherwise({ redirectTo: "/" });
}]);

app.controller("homeCtl", ["$scope", "$firebase", "uuid", "FIREBASE_URL", function($scope, $firebase, uuid, FIREBASE_URL) {
  $scope.url = FIREBASE_URL;
  var baseRef = new Firebase(FIREBASE_URL);
  var userRef = baseRef.child("users");
  $scope.users = $firebase(userRef);
  $scope.wants = baseRef.child("items");

  $scope.addUser = function() {
    userRef.push(
      { 
        name: "User " +  Math.floor(Math.random() * 100),
        location:  Math.floor(Math.random() * 100),
        prize:  Math.floor(Math.random() * 100),
        want: [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
      }
    );
  };
}]);