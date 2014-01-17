var app = angular.module("tradingpost",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  console.log("config is happening");
  $routeProvider
    .when("/", { controller: 'homeCtl', templateUrl: '/view/home.html'})
    .otherwise({ redirectTo: "/" });
}]);

app.controller("homeCtl", ["$scope", function($scope) {
  console.log("homeCtl is happening");
  $scope.name = "Hello";
}]);