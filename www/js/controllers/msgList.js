define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('msgListCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', 'httpRequest', '$ionicScrollDelegate', function($scope, $ionicHistory, Storage, $state, httpRequest, $ionicScrollDelegate) {

        $scope.ModelData = { "ImgLeft": "img/default.jpg" };
        $scope.$on('$ionicView.afterEnter', function () {
            $ionicScrollDelegate.scrollTo(0, -100, true);
            $scope.isLoadingMore = 0;
            $scope.fetch(true);
            if ($scope.dataArr.length == 0) {
                $scope.hasMore = true;
            }
        });

        var title = "";
        var id = $state.params.id;
        if (id == 1) title = "政策服务";
        if (id == 2) title = "灾害预警";
        if (id == 3) title = "专家会诊";
        if (id == 94) title = "农技指导";
        if (id == 96) title = "农资团购";
        if (id == 102) title = "农副产品";
        if (id == 103) title = "合作社";
        if (id == 104) title = "农业企业";
        if (id == 105) title = "志愿风采";
        if (id == 107) title = "农机技术指导";
        $scope.title = title;

        $scope.ItemAvatarStyle = 'item-avatar-none';
        if (title == '志愿风采' || title == '农技指导' || title == '农资团购') $scope.ItemAvatarStyle = 'item-avatar-img';

        $scope.getArticle = function(item) {
            //Storage.set("DM_Article", item);
            location.href = "#/article/"+item.Id+"";
        };

        // 监听滚动变化，分页加载数据
        $scope.isLoadingMore = 0;
        $scope.dataArr = [];
        var pageNum = 12;

        // 下拉刷新
        $scope.fresh = function() {
            $scope.hasMore = true;
            if ($scope.isLoadingMore == 2) $scope.isLoadingMore = 0;
            $scope.fetch(true);
        };

        $scope.fetch = function(isFresh){
            $scope.isFresh = isFresh;

            if ($scope.isLoadingMore) return;
            $scope.isLoadingMore = 1;
            var index = 1;
            if (!$scope.isFresh)index = Math.floor($scope.dataArr.length/pageNum) + 1;
            var params = {
                cateId:id,
                pagesize:pageNum,
                pageindex:index
            };
            //console.log('params--' + JSON.stringify(params));
            httpRequest.get('/api/info/getlist', params, function (re) {
                //console.log('api/info/getlist--' + JSON.stringify(re));
                if (re.data.Message == "OK") {
                    if($scope.isFresh)$scope.dataArr = [];
                    $scope.dataArr = $scope.dataArr.concat(re.data.ResultObj);
                }

                // 没有数据返回的时候
                if (!re.data.ResultObj) {
                    $scope.isLoadingMore = 2;
                    $scope.hasMore = false;
                    Tips.showTips(re.data.Message);
                } else if (re.data.ResultObj.length == pageNum) {
                    $scope.isLoadingMore = 0;
                } else {
                    $scope.isLoadingMore = 2;
                    $scope.hasMore = false;
                }
            }, function(){}, function(){
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    }]);
   
});