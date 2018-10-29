define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('MapViewCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$ionicLoading', '$ionicHistory', '$cordovaInAppBrowser', function ($rootScope,$scope, $state, $timeout, $ionicLoading, $ionicHistory, $cordovaInAppBrowser) {

        $scope.IsMapBrowser = false;

        $scope.$on('$ionicView.enter', function () {
            //if ($scope.IsMapBrowser) {
            //    $ionicGoBack();
            //    return false;
            //}
            $ionicLoading.show({ template: '正在定位...' });
            $timeout(function () {
                $scope.InitMapBrowser();
            }, 1000).then(function () {
                $ionicLoading.hide();
                //$ionicHistory.removeBackView();
            });
        });

        $rootScope.$on('$cordovaInAppBrowser:exit', function (e, event) {
            //$ionicGoBack();
            $ionicHistory.goBack(-2);
        });

        //$scope.$on('$ionicView.unloaded', function () {
            
        //    $timeout(function () {
        //        $scope.InitMapBrowser();
        //    }, 1000).then(function () {
        //        $ionicLoading.hide();
        //        $ionicHistory.removeBackView();
        //    });
            
        //    //if ($scope.IsMapBrowser) $ionicGoBack();
        //    //$ionicHistory.goBack(1);
        //    //$ionicGoBack();
        //})

        $scope.InitMapBrowser = function () {
            var lnglat = $state.params.lnglat;
            var toAddress = $state.params.address;

            var url = 'http://m.amap.com/navigation/index/daddr=' + lnglat + ',' + toAddress + '';
            var options = {
                location: 'no',
                clearcache: 'yes',
                toolbar: 'no'
            };
            $cordovaInAppBrowser.open(url, '_self', options).then(function (e) {
                $scope.IsMapBrowser = true;
                //alert('加载完成');
                //$ionicHistory.removeBackView();
            });
        };

        //var map;
        //var lnglat = $state.params.lnglat.split(',');
        ////lnglat = [lnglat[0], lnglat[1]];
        //var toAddress = $state.params.address;
        //var navUrl = 'http://m.amap.com/navigation/index/daddr=' + lnglat[0] + ',' + lnglat[1] + ',' + toAddress + '';
        //alert('navUrl--' + navUrl);
        ////window.open(navUrl);
        //window.location.href = navUrl;

        //$scope.InitMap = function () {
        //    //alert('lnglat--' + lnglat);
        //    //console.log('lnglat--' + lnglat);
        //    map = new AMap.Map('viewContainer', {
        //        zoom: 15,
        //        center: lnglat
        //    });
        //    var marker = new AMap.Marker({
        //        position: lnglat,
        //        map: map
        //    });
        //};


    }]);
});

