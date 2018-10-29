define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('YouthVoiceCtrl', ['$rootScope', '$scope', '$ionicActionSheet', 'httpRequest', 'Storage', '$cordovaCamera', '$cordovaImagePicker', function ($rootScope,$scope, $ionicActionSheet, httpRequest, Storage, $cordovaCamera, $cordovaImagePicker) {

        $scope.ModelData = { "ImgLeft": "img/default.jpg" };
        $scope.ContentCategoryId = 108;
        $scope.YouthVoiceList = [];
        $scope.PageIndex = 1;

        $scope.UserInfo = Storage.get("DM_Auth").ResultObj;

        $scope.$on('$ionicView.enter', function () {
            var tabs = document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
            $scope.GetYouthVoiceList();
        });

        $scope.GetYouthVoiceList = function () {

            var params = {
                cateId: $scope.ContentCategoryId,
                pagesize: $rootScope.PageSize,
                pageindex: 1
            };

            //console.log('GetYouthVoiceList--' + JSON.stringify(params));
            httpRequest.getWithUI($scope, 'api/info/getlist', params, function (result) {
                //console.log('GetYouthVoiceList--result--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.YouthVoiceList = result.data.ResultObj;
                    $scope.PageIndex++;
                }
                else {
                    Tips.showTips(result.data.Message);
                }
            });
        };

        $scope.ToDetail = function (item) {
            //Storage.set("DM_Article", item);
            location.href = "#/article/"+item.Id+"";
        };

    }]);
});