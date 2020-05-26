(function () {
    'use strict';

    angular.module('public')
    .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        // Routes
        $stateProvider
          .state('public', {
              absract: true,
              templateUrl: 'src/public/public.html'
          })
          .state('public.home', {
              url: '/',
              templateUrl: 'src/public/home/home.html'
          })
          .state('public.menu', {
              url: '/menu',
              templateUrl: 'src/public/menu/menu.html',
              controller: 'MenuController',
              controllerAs: 'menuCtrl',
              resolve: {
                  menuCategories: ['MenuService', function (MenuService) {
                      return MenuService.getCategories();
                  }]
              }
          })
          .state('public.menuitems', {
              url: '/menu/{category}',
              templateUrl: 'src/public/menu-items/menu-items.html',
              controller: 'MenuItemsController',
              controllerAs: 'menuItemsCtrl',
              resolve: {
                  menuItems: ['$stateParams', 'MenuService', function ($stateParams, MenuService) {
                      return MenuService.getMenuItems($stateParams.category);
                  }]
              }
          })

        .state('public.signup', {
            url: '/signup',
            templateUrl: 'src/public/sign/signUp.html',
            controller: 'SignController',
            controllerAs: 'signCtrl'
            //resolve: {
            //    menuCategories: ['DataService', function (DataService) {
            //        //return DataService.getCategories();
            //    }]
            //}
        })


        .state('public.myinfo', {
            url: '/info',
            templateUrl: 'src/public/sign/myInfo.html',
            controller: 'SignController',
            controllerAs: 'signCtrl',
            //resolve: {
            //    infoData: ['DataService', function (DataService) {
            //        return DataService.getInformation();
            //    }]
            //}
        })

    }
})();
