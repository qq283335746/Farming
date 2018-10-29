define(['app'],function (app) {
    app.controller('mineCtrl', ['$scope', '$rootScope', 'Storage', 'httpRequest', function ($scope, $rootScope, Storage, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            $scope.InitUserCenter();
        });

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

        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.auth = Storage.get("DM_Auth");
            if(!$scope.auth){
                location.href = "#/login";
            }

            //$rootScope.RecordCount = "";
            //$scope.ResultObj = "";
            //httpRequest.get("api/qa/zjmyreceivedcount", {}, function (re) {
            //    if (re.data.Message == "OK") {
            //        //console.log(re.data);
            //        $scope.ResultObj = re.data.ResultObj;
            //        $rootScope.RecordCount = re.data.RecordCount;
            //        $scope.CTotalCount = "" + re.data.ResultObj + "/" + re.data.RecordCount + "";
            //    }
            //});
        });

        $scope.ModelData = { Zjhz_TotalSend: 0, Zjhz_TotalReceive: 0, Wtsb_TotalSend:0, Wtsb_TotalReceive: 0, Wtsb_TotalReceive: 0 };
        $scope.InitUserCenter = function(){
            httpRequest.get("api/qa/zjmysubmitcount", {}, function (result) {
                //console.log('api/qa/zjmysubmitcount--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ModelData.Zjhz_TotalSend = result.data.ResultObj;
                }
            });
            httpRequest.get("api/qa/zjmyreceivedcount", {}, function (result) {
                //console.log('api/qa/zjmyreceivedcount--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ModelData.Zjhz_TotalReceive = result.data.ResultObj;
                }
            });
            httpRequest.get("api/qa/qtmyreportcount", {}, function (result) {
                //console.log('api/qa/qtmyreportcount--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ModelData.Wtsb_TotalSend = result.data.ResultObj;
                    //alert($scope.ModelData.Wtsb_TotalSend);
                }
            });
            httpRequest.get("api/qa/qtmyreceivedcount", {}, function (result) {
                //console.log('api/qa/qtmyreceivedcount--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ModelData.Wtsb_TotalReceive = result.data.ResultObj;
                    //alert($scope.ModelData.Wtsb_TotalReceive);
                }
            });
        }

    }]);
});
    
