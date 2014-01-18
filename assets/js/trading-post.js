var app = angular.module("tradingpost",["ngRoute", "firebase", "lvl.services"]);

app.constant("FIREBASE_URL", "https://scorching-fire-2975.firebaseio.com")

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", { controller: 'homeCtl', templateUrl: '/view/home.html'})
    .when("/add-item", { controller: 'addCtl', templateUrl: '/view/new-item.html'})
    .when("/login", { controller: 'loginCtl', templateUrl: '/view/login.html'})
    .otherwise({ redirectTo: "/" });
}])
.run(["$location", "$rootScope", "tradingService", function($location, $rootScope, tradingService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // if route requires auth and user is not logged in
      if ( !tradingService.isLoggedIn() && $location.url() !== '/login') {
          // redirect back to login
          return $location.path("/login");
      }
   });
}]);

app.factory('tradingService', ["$firebase", "$firebaseSimpleLogin", "FIREBASE_URL", function($firebase, $firebaseSimpleLogin, FIREBASE_URL) {
  var baseRef = new Firebase(FIREBASE_URL);
  var u = baseRef.child("users");
  var i = baseRef.child("items");
  var theUser = null;

  // var auth = new FirebaseSimpleLogin(baseRef, function(error, user) {
  //   if (user) {
  //     theUser = user;
  //   } else if (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // });

  var auth = $firebaseSimpleLogin(baseRef);

  return {
    userRef: u,
    itemRef: i,

    getUsers: function() { 
      return $firebase(u); 
    },
    
    getItems: function() { 
      return $firebase(i);
    },

    isLoggedIn: function() {
      return auth.user != null;
    },

    getCurrentUser: function() {
      return auth.user;
    },

    logout: function() {
      auth.$logout();
    },

    login: function() {
      auth.$login("github", 
        { 
          rememberMe: false, 
          scope: 'user:email' 
        });
    }
  };
}]);

app.controller("homeCtl", ["$scope", "uuid", "tradingService", function($scope, uuid, tradingService) {  
  $scope.loaded = false;
  $scope.itemCount = 0;
  $scope.items = tradingService.getItems();

  $scope.items.$on("loaded", function() {
    $scope.loaded = true;
    $scope.itemCount = $scope.items.$getIndex().length;
    console.log($scope.items);
  })
  // $scope.addUser = function() {
  //   tradingService.userRef.push(
  //     { 
  //       name: "User " +  Math.floor(Math.random() * 100),
  //       location:  Math.floor(Math.random() * 100),
  //       prize:  Math.floor(Math.random() * 100),
  //       want: [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
  //     }
  //   );
  // };
}]);

app.controller("addCtl", ["$scope", "$timeout", "tradingService", function($scope, $timeout, tradingService) {
  $scope.reset = function() {
    $scope.item = {
      name: '',
      price: '',
      url: 'https://cdn1.iconfinder.com/data/icons/ballicons-free/128/box.png',
    };
  }

  $scope.addItem = function() {
    tradingService.itemRef.push($scope.item);
    $scope.reset();
    $scope.showAddedMessage = true;
    $timeout(function() {
      $scope.showAddedMessage = false;
    }, 750);
  }

  $scope.reset();
}]);

app.controller("loginCtl", ["$scope", "tradingService", function($scope, tradingService) {
  tradingService.login();
}]);