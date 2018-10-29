define(['app'],function (app) {
    app.controller('navigatelistCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', function($scope, $ionicHistory, Storage, $state) {
        var menu = Storage.get("DM_Navigate");
        $scope.title = menu[$state.params.id];
    }]);
   
});