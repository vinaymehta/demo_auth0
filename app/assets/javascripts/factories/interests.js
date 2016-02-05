angular.module('demo_angular_auth0').factory('Interest', ['$resource', function($resource) {
  return $resource('/api/v1/interests/:id', {id: '@id'},
    {
        'update': { method:'PUT' },
        'query':  {method:'GET', isArray:true}
    });
}]);
