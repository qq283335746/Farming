
define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('callbackCtrl', ['$scope', '$ionicHistory', 'httpRequest', function ($scope, $ionicHistory, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            var tabs = document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
        })

    	$scope.feedBack = {Body:"", Title:"反馈"};
    	$scope.callBack = function() {
    		httpRequest.postWithUI($scope, "api/feedback/submit", $scope.feedBack, function(re){
	    		Tips.showTips("提交成功!");
	    		$ionicHistory.goBack();
    		});
    	}
    }]);
});