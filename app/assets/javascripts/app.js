app = angular.module('demo_angular_auth0', ['ngRoute', 'auth0', 'angular-storage', 'angular-jwt', 'ngResource', 'interest.app']);
app.config(['$routeProvider', '$httpProvider', 'authProvider', 'jwtInterceptorProvider', function($routeProvider, $httpProvider, authProvider, jwtInterceptorProvider){
  authProvider.init({
    domain: 'test-auth0.auth0.com',
    clientID: '0YGkpYcoASDuftP3qFVU6bYB2qG0ou6e'
  });

  $routeProvider.when('/login', {
    templateUrl: '/templates/login.tpl.html',
    controller: 'LoginCtrl'
  }).when('/', {
    templateUrl: '/templates/login.tpl.html',
    controller: 'LoginCtrl'
  }).when('/user-info', {
    templateUrl: '/templates/userInfo.tpl.html',
    controller: 'UserInfoCtrl',
    requiresLogin: true
  });
  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
}])
app.run(['$rootScope', '$location', 'auth', 'store', 'jwtHelper', function($rootScope, $location, auth, store, jwtHelper) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/login');
      }
    }
  });
  auth.hookEvents();
}])
app.controller('LoginCtrl', ['$scope', '$http', '$location', 'auth', 'store',
  function ($scope, $http, $location, auth, store) {
    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        $http.post('/api/v1/users', profile)
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/user-info');
      }, function () {
        // Error callback
      });
    }
  }
])
app.controller('UserInfoCtrl', ['$scope', '$http', '$location', 'auth', 'store', 'Interest',
  function ($scope, $http, $location, auth, store, Interest) {
    $scope.auth = auth;
    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/login');
    }
  }
])
function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
}
