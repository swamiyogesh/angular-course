(function () {
    "use strict";

    angular.module('public')
    .service('DataService', DataService);

    DataService.$inject = ['$http', 'ApiPath', 'MenuService'];
    function DataService($http, ApiPath, MenuService) {
        var service = this;

        service.info = {};

        service.setInfo = function (informations) {
            service.info = informations;
            //loads menu item in relation to the shortname in order to cache the result
            //service.getMenuItem();

        }
        service.getInfo = function () {
            return service.info;
        }

        service.infoSaved = function () {
            if (service.info == undefined) {
                return false;
            }
            return (service.info.firstName != undefined);
        }

        service.getMenuItem = function(){
            if (service.info.menuItemLoaded == undefined && service.info.menuItem != undefined) {
                MenuService.getMenuItem(service.info.menuItem).then(function (result) {
                    service.info.menuItemLoaded = result.data;
                }, function (result) {
                    service.info.menuItemLoaded = undefined;
                });
            }
        }

        service.retrieveMenuItem = function (shortName) {
            return MenuService.getMenuItem(shortName);
        }
    }

})();
