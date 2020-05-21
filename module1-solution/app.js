(function(){
	'use strict';

	angular.module('LunchCheck',[])
	.controller('LunchCheckController',LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope){
		$scope.name = '';
		$scope.message = '';
		$scope.checked =false;

		$scope.DisplayAns = function(){
			if($scope.name.trim().length===0){
				$scope.empty=true;
			}
			else{
				$scope.checked =true;
				$scope.empty = false;
				var check  = $scope.name.split(',');
				var checkWithoutEmpty = check.filter(function(v){
					return v.trim()!=='';
				});

				if(checkWithoutEmpty.length<=3){
					$scope.message = 'Enjoy!';
				}
				else{
					$scope.message = 'Too much!';
				}
			}
		};
	}
})();


