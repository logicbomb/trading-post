var app = angular.module("tradingpost",["ngRoute", "firebase"]);

app.constant("FIREBASE_URL", "https://scorching-fire-2975.firebaseio.com/");

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/", { controller: 'homeCtl', templateUrl: '/view/home.html'})
    .otherwise({ redirectTo: "/" });
}]);

app.controller("homeCtl", ["$scope", "$firebase", "FIREBASE_URL", function($scope, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  $scope.users = $firebase(ref);

  $scope.addUser = function() {
    $scope.users.$add({
      name: "User " +  Math.floor(Math.random() * 100),
      location:  Math.floor(Math.random() * 100),
      prize:  Math.floor(Math.random() * 100),
      want: [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
    });
  };
}]);