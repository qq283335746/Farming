define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('LeaseMapCtrl', ['$scope', '$timeout', '$ionicLoading', 'httpRequest', 'Storage', function ($scope, $timeout, $ionicLoading, httpRequest, Storage) {

        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show({ template: '正在加载...' });
            $timeout(function () {
                $scope.GetList();
            }, 1000).then(function () {
                $ionicLoading.hide();
            });
        });

        var map;
        map = new AMap.Map('leaseMapContainer');

        $scope.GetList = function () {
            var parms = {
                pageindex: 1,
                pagesize: 10000
            };
            //console.log('api/lease/getrentallist-parms--' + JSON.stringify('parms--' + JSON.stringify(parms)));
            httpRequest.getWithUI($scope, "api/lease/getrentallist", parms, function (result) {
                //console.log('api/lease/getrentallist--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    var jData = result.data.ResultObj;
                    var len = jData.length;

                    for (var i = 0; i < len; i++) {
                        var item = jData[i];
                        var itemLatlon = item.Coor.split(",");
                        if (itemLatlon.length < 2) continue;
                        //console.log('pos--' + pos);
                        var marker = new AMap.Marker({
                            position: [itemLatlon[1], itemLatlon[0]],
                            map: map
                        });
                        marker.content = item.Id + '|' + item.Title + '|' + item.Summary;
                        marker.on('click', function (e) {
                            var lnglat = e.target.getPosition();
                            //var items = e.target.content.split('|');
                            var infoWindow;
                            var infoWindowContent = '<div class="infowindow-content">' +
                              '<div class="amap-info-body">' +
                              '<div class="title">' + item.Title + '</div>' +
                              '<div class="body">' + item.Summary + '</div>' +
                              '<a href="#/ShowSingleLease/' + item.Id + '">查看详情</a> '+
                              '</div></div>';

                            //console.log('infoWindowContent--' + infoWindowContent);

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
                    Tips.showTips(result.data.Message);
                }
            });
        };

    }]);
});