define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('rentCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', 'httpRequest', function($scope, $ionicHistory, Storage, $state, httpRequest) {
        $scope.type = "home";
        if ($state.params.type == "mine") {
            $scope.type = "mine";
        }

        // 监听滚动变化，分页加载数据
        $scope.isLoadingMore = 0;
        $scope.dataArr = [];
        var pageNum = 10;

        // 下拉刷新
        $scope.fresh = function() {
            $scope.hasMore = true;
            if ($scope.isLoadingMore == 2) $scope.isLoadingMore = 0;
            $scope.fetch(true);
        };

        $scope.fetch = function(isFresh){
            $scope.isFresh = isFresh;
            if($scope.isFresh)$scope.isLoadingMore = 0;
            if ($scope.isLoadingMore) return;
            $scope.isLoadingMore = 1;
            var index = 1;
            if (!$scope.isFresh)index = Math.floor($scope.dataArr.length/pageNum) + 1;
            var params = {
                pagesize:pageNum,
                pageindex:index
            };
            // 获取我的列表
            if($scope.type == "mine") {
                var auth = Storage.get("DM_Auth");
                params.userId = auth.ResultObj.UserId
            }
            var url = "api/lease/getwantedlist?";
            httpRequest.get(url, params, function(re){
                if (re.data.Message == "OK") {
                    if($scope.isFresh)$scope.dataArr = [];
                    $scope.dataArr = $scope.dataArr.concat(re.data.ResultObj);
                }

                // 没有数据返回的时候
                if (!re.data.ResultObj) {
                    $scope.isLoadingMore = 2;
                    $scope.hasMore = false;
                    Tips.showTips(re.data.Message);
                } else if (re.data.ResultObj.length != pageNum) {
                    $scope.isLoadingMore = 2;
                    $scope.hasMore = false;
                }
            }, function(){}, function(){
                if($scope.isLoadingMore != 2)$scope.isLoadingMore = 0;
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.$on('$ionicView.afterEnter', function() {
            $scope.fetch(true);
        });

        // 进入详情页
        $scope.getDetail = function(item){
            if (!item) return;
            item.IsShow = true;
            Storage.set("DM_TmpRentData", item);
            location.href = "#/rentPush"
        };

        // 删除发布
        $scope.remove = function(item){
            httpRequest.getWithUI($scope, "api/lease/delete", {Id:item.Id}, function(re){
                if (re.data.Message == "OK") {
                    for (var i = 0; i<$scope.dataArr.length; i++) {
                        if($scope.dataArr[i].Id == item.Id) {
                            $scope.dataArr.splice(i, 1);
                        }
                    };
                }
            });
        };

    }]);
   
});