define(['app'],function (app) {
    app.controller('propertyCtrl', ['$rootScope', '$scope', '$ionicHistory', 'Storage', '$state', function ($rootScope,$scope, $ionicHistory, Storage, $state) {

        var sVerticalAlign = (window.screen.height - 426) / 2 ;
        $scope.ModelData = { Style: sVerticalAlign };

        $scope.$on('$ionicView.enter', function () {
            var tabs = document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
        })

        //var h = $rootScope.WinHeight;
        //var unitHeight = (h - 45 - 49) / 2;
        //var pd = (unitHeight - 94) / 2;
        //$scope.UnitHeight = { "height": "" + unitHeight + "px", "padding-top": "" + pd + "px" };
        $scope.UnitHeight = { "height": "232px", "padding-top": "69px" };

        $scope.navigate = function (url) {
        	location.href = url;
        };

    }]);
   
});