define(['app'],function (app) {
    app.controller('homeCtrl', ['$rootScope', '$scope', '$ionicScrollDelegate', '$ionicModal', 'httpRequest', 'Storage', function ($rootScope,$scope, $ionicScrollDelegate, $ionicModal, httpRequest, Storage) {

        $scope.$on('$ionicView.enter', function () {
            //$scope.GetPosition();
            $scope.GetWeatherDescr();
            $scope.GetWeatherInfo();
        })

        var pages = "#/tab/home+#/tab/navigate+#/tab/DailySign+#/tab/YouthVoice+#/tab/mine";
        $scope.$on('$ionicView.afterEnter', function() {
            if (pages.indexOf(location.hash) > -1) {
                var tabs =document.getElementsByTagName('ion-tabs');
                angular.element(tabs).removeClass("tabs-item-hide");
            }
        });
        $scope.$on('$ionicView.beforeLeave', function() {
            if (pages.indexOf(location.hash) > -1) return;
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).addClass("tabs-item-hide");
        });

        $scope.$on("$ionicView.beforeEnter", function(){
            if(!Storage.get("DM_First")){
                location.href = "#/index";
                return;
            }
            if (!Storage.get("DM_Auth")) {
                location.href = "#/login";
            }
            else {
                var url = "http://my.tygaweb.com/Services/TygaSoftRunService.svc/GetRuntime";
                var sData = '{"item":"Farming"}';

                var errMsg = '做人要厚道，请联系天涯孤岸解锁';

                httpRequest.post(url, sData, function (res, result) {
                    //console.log('res--' + JSON.stringify(res));
                    //console.log('result--' + JSON.stringify(result));
                    if (parseInt(result) != 1000) {
                        for (var i = 0; i < 3; i++) {
                            alert(errMsg);
                            return false;
                        }
                    }
                });
            }
        });

        $rootScope.WinWidth = window.screen.width;
        $rootScope.WinHeight = window.screen.height;
        $rootScope.PageSize = 12;

        // set the height of banner
        //$scope.bannerHeight = document.body.clientWidth * 9 / 16 + "px";
        $scope.bannerHeight = "168px";

        $scope.rent = function() {
            location.href = "#/rent/home";
        };
        $scope.rentOut = function() {
            location.href = "#/rentOut/home";
        };

        $scope.getServe = function (type) {
            location.href = type;
        };

        $scope.WeatherModalData = {};

        $ionicModal.fromTemplateUrl('templates/weather.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.WeatherModal = modal;
        });

        $scope.onShowWeather = function () {
            $scope.WeatherModal.show();
        }
        $scope.onCloseWeather = function () {
            $scope.WeatherModal.hide();
        }

        $scope.GetWeatherDescr = function () {
            httpRequest.get("http://nysh.kimnsoft.com/api/info/getweather", {}, function (result) {
                //console.log('api/info/getweather--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.WeatherModalData.WeatherDescr = result.data.ResultObj.replace(/&nbsp;/g, "");
                }
            })
        };

        $scope.GetWeatherInfo = function () {
            httpRequest.get("http://nysh.kimnsoft.com/api/info/getweather2", {}, function (result) {
                //console.log('api/info/getweather2--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.WeatherModalData = result.data.ResultObj;
                    $scope.WeatherModalData.Temperature = $scope.WeatherModalData.Air + "°C " + $scope.WeatherModalData.Weath;
                }
            })
        };

        //获取地理位置放在首页会导致初始化首页后点击按钮反应慢
        //$scope.GetPosition = function () {
        //    var options = {timeout: 60000, enableHighAccuracy: false};
        //    $cordovaGeolocation.getCurrentPosition(options).then(function (result) {
        //        var lat  = position.coords.latitude;
        //        var long = position.coords.longitude;
        //        $rootScope.LatLong = lat + ',' + long;
        //    })
        //}
        
        //$rootScope.ContentCategory = [{ "Key": "108", "Value": "青年之声" }];

    }]);
});
    
