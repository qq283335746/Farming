define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('rentOutPushCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', 'httpRequest', '$cordovaGeolocation', '$cordovaDatePicker', function ($scope, $ionicHistory, Storage, $state, httpRequest, $cordovaGeolocation, $cordovaDatePicker) {

        $scope.UserInfo = Storage.get("DM_Auth").ResultObj;

        $scope.$on('$ionicView.enter', function () {

            $scope.opt = {
                canEdit: true
            };

            //先获取地理位置信息
            var posOptions = { timeout: 60000, enableHighAccuracy: false };
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                $scope.LatLong = lat + ',' + long;

                var lnglatXY = [long, lat];//地图上所标点的坐标
                AMap.service('AMap.Geocoder', function () {//回调函数
                    var geocoder = new AMap.Geocoder({});
                    geocoder.getAddress(lnglatXY, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            //获得了有效的地址信息:
                            //即，result.regeocode.formattedAddress
                            $scope.msg.area = result.regeocode.formattedAddress;
                            $scope.opt.canEdit = "";
                        }
                    });
                });
            });
        })

        $scope.$on('$ionicView.beforeLeave', function () {
            Storage.set("DM_TmpRentOutData", "");
        });

        $scope.msg = {};
        var item = Storage.get("DM_TmpRentOutData");
        if(item){   
            /// 这里是修改
            $scope.msg.Id = item.Id;
            $scope.msg.title = item.Title;
            $scope.msg.summary = item.Summary;
            $scope.msg.rentaldate = new Date(item.RentalDate);
            $scope.msg.mu = item.Mu;
            $scope.msg.area = item.Area;
            $scope.msg.model = item.Model;
            $scope.msg.coor = item.Coor;
        };
        // push message
        $scope.comfirm = function () {
            if (!$scope.UserInfo) {
                Tips.showTips("请先登录");
                return;
            }
            if (!$scope.msg.title || $scope.msg.title == '') {
                Tips.showTips("请先输入标题");
                return;
            }
            if (!$scope.msg.summary) {
                Tips.showTips("请先输入简介");
                return;
            }
            if (!$scope.msg.rentaldate) {
                Tips.showTips("请先输入时间");
                return;
            }
            if (!$scope.msg.area) {
                Tips.showTips("请先输入面积大小");
                return;
            }
            if (!$scope.LatLong) {
                Tips.showTips("未获取到您的定位坐标，系统需要您的定位坐标，请开启定位！");
                return;
            }

            var kdata = {
                UserId: $scope.UserInfo.UserId,
                UserName: $scope.UserInfo.UserName,
                Title:$scope.msg.title,
                Summary:$scope.msg.summary,
                Mu:$scope.msg.mu,
                RentalDate:$scope.msg.rentaldate,
                Area: $scope.msg.area,
                Model: $scope.msg.model,
                Coor: $scope.LatLong
            };

            var url = 'api/lease/rental';
            if ($scope.msg.Id) {
                kdata.Id = $scope.msg.Id;
                url="api/lease/updaterental";
            }

            //alert('kdata--' + JSON.stringify(kdata));
            //return;

            httpRequest.postWithUI($scope, url, kdata, function(re){
                if(re.data.Message == "OK") {
                    Tips.showTips("提交成功了...");
                    $ionicHistory.goBack();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });
        };

        $scope.onDpDate = function (n) {
            var options = {
                date: new Date(),
                mode: 'date', // or 'time'
                allowOldDates: true,
                allowFutureDates: false,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };
            $cordovaDatePicker.show(options).then(function (date) {
                $scope.msg.rentaldate = Common.FormatDate(date);
            });
        };
    }]);
   
});