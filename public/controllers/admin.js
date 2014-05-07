'use strict';

angular.module('mean').controller('AdminController', ['$scope', 'Global', 'Menus', '$rootScope',
    function($scope, Global, Menus, $rootScope) {
        $scope.global = Global;
        $scope.menus = {};
        $scope.overIcon = false;

        // Default hard coded menu items for main menu
        var defaultAdminMenu = [{
            'roles': ['admin'],
            'title': 'MODULES',
            'link': 'modules',
            'icon' : 'modules.jpg'
        }, {
            'roles': ['admin'],
            'title': 'THEMES',
            'link': 'themes',
            'icon': 'themes.jpg'
        }, {
            'roles': ['admin'],
            'title': 'SETTINGS',
            'link': 'settings',
            'icon' : 'settings.jpg'
        }, {
            'roles': ['admin'],
            'title': 'USERS',
            'link': 'users',
            'icon' : 'users.jpg'
        }];

        // Query menus added by modules. Only returns menus that user is allowed to see.

        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('admin', defaultAdminMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('admin', defaultAdminMenu);

            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user
            };
        });

        $scope.wideMenu = function() {
            $scope.openMenu = true;
        };

    }
]);
