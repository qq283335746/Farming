define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('mapCtrl', ['$scope', '$cordovaGeolocation', '$timeout', '$ionicLoading', 'httpRequest', function ($scope, $cordovaGeolocation, $timeout, $ionicLoading, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show({ template: '正在加载地图...' });
            $timeout(function () {
                $scope.GetAddressList();
            }, 1000).then(function () {
                $ionicLoading.hide();
            });
        });

        var map;
        map = new AMap.Map('mapContainer');
        $scope.ListSideMenu = [{ Id: "1", Name: "农机维修", checked: true }, { Id: "2", Name: "零配件", checked: true }, { Id: "3", Name: "加油站", checked: true }];

        $scope.onChecked = function (item) {
            map.clearMap();
            if (item == 'All') {
                $scope.ListSideMenu = [{ Id: "1", Name: "农机维修", checked: true }, { Id: "2", Name: "零配件", checked: true }, { Id: "3", Name: "加油站", checked: true }];
            }
            else if (item == 'None') {
                $scope.ListSideMenu = [{ Id: "1", Name: "农机维修", checked: false }, { Id: "2", Name: "零配件", checked: false }, { Id: "3", Name: "加油站", checked: false }];
            }
            $scope.GetAddressList();
        }

        $scope.GetAddressList = function () {
            var categoryAppend = '';
            var appendIndex = 0;
            for (var k = 0; k < $scope.ListSideMenu.length; k++) {
                if ($scope.ListSideMenu[k].checked) {
                    if (appendIndex > 0) categoryAppend += ',';
                    categoryAppend += $scope.ListSideMenu[k].Name;
                    appendIndex++;
                }
            };
            var parms = {
                pageindex: 1,
                pagesize: 500,
                catename: categoryAppend
            };
            //console.log('api/map/getlist-parms--' + JSON.stringify(parms));
            httpRequest.getWithUI($scope, "api/map/getlist", parms, function (re) {
                //console.log('api/map/getlist--' + JSON.stringify(re));

                if (re.data.Message == "OK") {
                    var jData = re.data.ResultObj;
                    var len = jData.length;

                    for (var i = 0; i < len; i++) {
                        var item = jData[i];
                        var itemLatlon = item.Coor.split(",");
                        //console.log('pos--' + pos);
                        var marker = new AMap.Marker({
                            position: [itemLatlon[0], itemLatlon[1]],
                            map: map
                        });
                        marker.content = item.CateName + '|' + item.Name;
                        marker.on('click', function (e) {
                            var lnglat = e.target.getPosition();
                            var items = e.target.content.split('|');
                            var infoWindow;
                            var infoWindowContent = '<div class="infowindow-content">' +
                              '<div class="amap-info-header">' + items[0] + '</div>' +
                              '<div class="amap-info-body">' + items[1] + '<a href="#/MapView/' + lnglat + '/' + items[1] + '">前 往</a> </div></div>';

                            map.plugin('AMap.AdvancedInfoWindow', function () {

                                infoWindow = new AMap.AdvancedInfoWindow({
                                    panel: 'panel',
                                    placeSearch: false,
                                    driving: false,
                                    walking: false,
                                    transit: false,
                                    asOrigin: false,
                                    asDestination: false,
                                    content: infoWindowContent,
                                    offset: new AMap.Pixel(0, -30)
                                });
                                infoWindow.open(map, lnglat);
                            });
                        });
                    }
                    map.setFitView();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });
        };

    }]);
});
    
