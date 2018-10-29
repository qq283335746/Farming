define(['app'],function (app) {
    app.controller('farmListCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', function($scope, $ionicHistory, Storage, $state) {
        if ($state.params.id == 33) {
            $scope.title = "农机技术指导";
        } else if ($state.params.id == 34) {
            $scope.title = "农机服务";
        }
    }]);
   
});