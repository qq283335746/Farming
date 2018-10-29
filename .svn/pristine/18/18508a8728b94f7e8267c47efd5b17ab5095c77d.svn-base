define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('ShowSingleLeaseCtrl', ['$scope', '$state', '$timeout', '$ionicLoading', '$ionicHistory', 'httpRequest', function ($scope, $state, $timeout, $ionicLoading, $ionicHistory, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show({ template: '正在加载...' });
            $timeout(function () {
                $scope.GetLeaseInfo();
            }, 1000).then(function () {
                $ionicLoading.hide();
            });
        });

        var Id = parseInt($state.params.Id) - 1;

        $scope.GetLeaseInfo = function () {
            httpRequest.getWithUI($scope, "api/lease/getrentaldetail?id=" + Id + "", {}, function (result) {
                //console.log('api/lease/getrentaldetail--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ModelData = result.data.ResultObj;

                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };

    }]);
});

