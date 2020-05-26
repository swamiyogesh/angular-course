(function(){
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.constant('ApiBase','https://davids-restaurant.herokuapp.com')
	.directive('foundItems',FoundItems);

	function FoundItems(){
		var ddo ={
			templateUrl : "foundItems.html",
			restrict: 'E',
			scope:{
				items:'<',
				onRemove : '&'
			},
			controller: directiveController,
			controllerAs: 'ctr',
			bindToController: true
		};
		return ddo;
	}


	function directiveController(){
		var ctr=this;
		ctr.isEmptyItems = function(){
			if(ctr.items!== undefined && ctr.items.length===0){
				return true;
			}
			return false;
		};
	};


	NarrowItDownController.$inject= ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var cont = this;

		cont.narrow = function(){
			var promise = MenuSearchService.getMatchedMenuItems(cont.search);
			promise.then(function(result){
				cont.found=result;
			}).catch(function(e){
				console.log(e.message);
			});
		};

		cont.removeItem = function(itemIndex){
			cont.found.splice(itemIndex,1);
		};

	}





	MenuSearchService.$inject = ['$http','ApiBase']
	function MenuSearchService($http,ApiBase){
		var service = this;
		service.getMatchedMenuItems=function(searchTerm){
			return $http({
				method:"GET",
				url:(ApiBase+'/menu_items.json')
			}).then(function success(result){
				var foundItem = [];
				if(searchTerm!== undefined && searchTerm.length>0){
					searchTerm=searchTerm.toLowerCase();
					for(var i=0; i<result.data.menu_items.length; i++){
						var menu_item = result.data.menu_items[i];
						var description = menu_item.description.toLowerCase();
						if(description.indexOf(searchTerm)!== -1){
							foundItem.push(menu_item);
						}
					}
				}
				return foundItem;
			},function error(result){
				throw new Error("Error occured!");
			});


		};

	}
})();