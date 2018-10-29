define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('mineQuestionCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', 'httpRequest', '$ionicScrollDelegate', function($scope, $ionicHistory, Storage, $state, httpRequest, $ionicScrollDelegate) {

        $scope.ModelData = {};

        $scope.$on('$ionicView.afterEnter', function () {
            $ionicScrollDelegate.scrollTo(0, -100, true);
            $scope.isLoadingMore = 0;
            $scope.fetch(true);
        });

        $scope.id = $state.params.id;
        $scope.ModelData.RoleType = $scope.id;
        if($scope.id == 0) {
            $scope.title = "我提交的";
        } else {
            $scope.title = "我收到的";
        }

        // 监听滚动变化，分页加载数据
        $scope.isLoadingMore = [];
        $scope.dataArr = [];

        // 下拉刷新
        $scope.fresh = function() {
            $scope.noMore = true;
            if ($scope.isLoadingMore == 2) $scope.isLoadingMore = 0;
            $scope.fetch(true);
        };

        $scope.fetch = function(isFresh) {
            $scope.isFresh = isFresh;

            if ($scope.isLoadingMore) return;
            $scope.isLoadingMore = 1;

            var url = "";
            url = $scope.id == 1 ? 'api/qa/getalist?channeltype=1' : 'api/qa/getqList?channeltype=1';

            httpRequest.getWithUI($scope, url, {}, function (re) {
                //console.log('re--' + JSON.stringify(re));
                if (re.data.Message == "OK") {
                    $scope.getIdData(re.data.ResultObj)
                } else {
                    Tips.showTips(re.data.Message);
                }
            }, function(){}, function(){
                $scope.isLoadingMore = 0;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.getIdData = function(data){
            if($scope.isFresh) $scope.dataArr = [];
            for(var a=0; a<data.length; a++) {
                var item = data[a];
                $scope.dataArr = $scope.dataArr.concat(item);
            }
        };
    }]);
   
});