define(['app'],function (app) {
    app.controller('setCtrl', ['$scope', '$ionicPopup', '$ionicHistory', 'Storage', function($scope, $ionicPopup, $ionicHistory, Storage) {
        $scope.comfirm = function () {
            $ionicHistory.goBack();
            Storage.set("DM_Auth", "");
            setTimeout(function(){
                location.href = "#/login";
                Storage.set("DM_TmpQuestion", "1");
                Storage.set("DM_TmpProfessor", "1");
            }, 100);
        }
    }]);
   
});