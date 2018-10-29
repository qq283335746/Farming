define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('loginCtrl', ['$rootScope', '$scope', '$ionicPopup', 'httpRequest', 'Storage', function ($rootScope,$scope, $ionicPopup, httpRequest, Storage) {

        $scope.ModelData = { UserName: '', Password: '', IsRemember: true };

        $scope.$on("$ionicView.beforeEnter", function(){
            if(!Storage.get("DM_First")){
                location.href = "#/index";
                return;
            }
            if (Storage.get("DM_Auth")) {
                location.href = "#/tab/home";
            }
        });

        $scope.doLogin = function () {
            var userName = $scope.ModelData.UserName,
                password = $scope.ModelData.Password;
            if (!userName || userName == '') {
                $scope.err_txt = '用户名不能为空';
                return;
            }
            if (!password || password == '') {
                $scope.err_txt = '请正确输入密码';
                return;
            }

            var postData = {
                userName: userName,
                password: password,
                deviceType: 0
            };
            //console.log('api/account/login-data--' + JSON.stringify(postData));
            httpRequest.getWithUI($scope, "api/account/login", postData, function (result) {
                //console.log('api/account/login--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    //$rootScope.UserInfo = result.data.ResultObj;
                    Storage.set("DM_Auth", result.data);
                    location.href = "#/tab/home";
                } else {
                    Tips.showTips(result.data.Message);
                }
            }, function (result) {
            });
        };
    }]);
});