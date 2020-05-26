(function () {
    "use strict";

    angular.module('public')
    .component('infoDetails', {
        templateUrl: 'src/public/sign/info-details.html',
        controller : SignComponentController,
        bindings: {
            info: '<',
            onSubmit: '&',
            infoSaved: '&',
            retrieveMenuItem : '&'
        }
    });

    SignComponentController.$inject = ['MenuService'];
    function SignComponentController(MenuService) {
        var $ctrl = this;
        var saved = false;

        console.log('SignComponentController');

        if ($ctrl.info != undefined) {
            $ctrl.firstName = $ctrl.info.firstName;
            $ctrl.lastName = $ctrl.info.lastName;
            $ctrl.email = $ctrl.info.email;
            $ctrl.phone = $ctrl.info.phone;
            $ctrl.menuItem = $ctrl.info.menuItem;
        }

        $ctrl.infoHasBeenSaved = function () {
            return ($ctrl.infoSaved() && saved);
        }
        $ctrl.menuItemLoaded = {};

        $ctrl.submit = function () {
            $ctrl.onSubmit({
                info: {
                    firstName: $ctrl.firstName,
                    lastName: $ctrl.lastName,
                    email: $ctrl.email,
                    phone: $ctrl.phone,
                    menuItem: $ctrl.menuItem
                }
            });
            saved = true;
            $ctrl.getMenuItemInfo();

            console.log($ctrl.infoHasBeenSaved() && $ctrl.menuItemLoaded == undefined && ($ctrl.menuItem != '' || $ctrl.menuItem == undefined));
        }

        $ctrl.getMenuItemInfo = function () {
            MenuService.getMenuItem($ctrl.menuItem).then(function (result) {
                        $ctrl.menuItemLoaded = result.data;
                    }, function (reject) {
                        $ctrl.menuItemLoaded = undefined;
                    });
        }
        

    }

})();

