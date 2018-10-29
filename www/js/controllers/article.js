define(['app'],function (app) {
    app.controller('articleCtrl', ['$scope', '$state', '$ionicHistory', 'Storage', '$state', 'httpRequest', function ($scope, $state, $ionicHistory, Storage, $state, httpRequest) {

        var Id = 0;
        $scope.ModelData = {'Title':'','Content':'','CreateDate':''};

        //var item = Storage.get("DM_Article");
        //$scope.ModelData.title = item.Title;
        //$scope.aTime = item.AddDate;

        $scope.UserInfo = Storage.get("DM_Auth").ResultObj;

        $scope.$on('$ionicView.enter', function () {
            //console.log('$state.params.Id--' + $state.params.Id);
            Id = $state.params.Id;
            $scope.GetArticleDetail();
        });

        $scope.GetArticleDetail = function () {
            var data = { id: Id, userid: $scope.UserInfo.UserId };
            //console.log('GetArticleDetail--' + JSON.stringify(data));
            httpRequest.getWithUI($scope, "api/info/getdetail", data, function (result) {
                //console.log('result--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    var jData = result.data.ResultObj;
                    $scope.ModelData.Title = jData.Title;
                    $scope.ModelData.Content = jData.Content;
                    $scope.ModelData.CreateDate = jData.AddDate;
                    $scope.ModelData.Auth = jData.Auth;
                }
            });
        };

    }]);
});