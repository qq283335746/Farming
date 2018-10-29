
define(['app'],function (app) {
    app.controller('productCtrl', ['$scope','$ionicPopup', 'Storage', function($scope, $ionicPopup, Storage) {
		$scope.$on('$ionicView.beforeEnter', function() {
			$scope.item = Storage.get("DM_TmpRentData");
        });
    }]);
});