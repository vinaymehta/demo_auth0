angular.module('interest.app', [])
.controller('interestController', ['$scope', 'Interest', 'auth',
  function($scope, Interest, auth){
    var getInterests = function(){
      Interest.query(function(response){
        $scope.interests = response
      }, function(error){

      });
    }
    getInterests();
    $scope.toggleEditInterestModal = function(region, form){
      $scope.editRegion = angular.copy(region);
      if(form){
        form.$setPristine()
        form.$setUntouched();
      }
    };

    $scope.createInterest = function(newInterest, form){
      Interest.save(newInterest, function(data){
        if(data.error == undefined){
          getInterests();
          $scope.newInterest = {};
        }
      }, function(error){
        $scope.newRegion = {};
      });
      if(form){
        form.$setPristine()
        form.$setUntouched();
      }
    };
  }
])
