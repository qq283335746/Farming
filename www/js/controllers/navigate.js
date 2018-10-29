define(['app'],function (app) {
    app.controller('navigateCtrl', ['$scope', 'Storage', function ($scope, Storage) {

        $scope.$on('$ionicView.enter', function () {
            $scope.Init();
        });

        var pages = "#/tab/home+#/tab/navigate+#/tab/DailySign+#/tab/YouthVoice+#/tab/mine";
        $scope.$on('$ionicView.afterEnter', function() {
            if (pages.indexOf(location.hash) > -1) {
                var tabs =document.getElementsByTagName('ion-tabs');
                angular.element(tabs).removeClass("tabs-item-hide");
            }
        });
        $scope.$on('$ionicView.beforeLeave', function() {
            if (pages.indexOf(location.hash) > -1) return;
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).addClass("tabs-item-hide");
        });

        $scope.Init = function () {
            var navItems = [{ "Name": "政策服务", "Src": "img/zcfw.png", "Href": "#/msgList/1" }, { "Name": "灾害预警", "Src": "img/zhyj.png", "Href": "#/msgList/2" }, { "Name": "专家会诊", "Src": "img/zjhz.png", "Href": "#/professor" }, { "Name": "问题上报", "Src": "img/wtsb.png", "Href": "#/question" }, { "Name": "农技指导", "Src": "img/njzd.png", "Href": "#/msgList/94" }, { "Name": "农机技术指导", "Src": "img/njjszd.png", "Href": "#/msgList/107" }, { "Name": "农机租凭", "Src": "img/njzl.png", "Href": "#/rent/home" }, { "Name": "农机求租", "Src": "img/njqz.png", "Href": "#/LeaseMap" }, { "Name": "农机服务地图", "Src": "img/zcfw.png", "Href": "#/map" }, { "Name": "价格行情", "Src": "img/jghq.png", "Href": "#/price" }, { "Name": "农资团购", "Src": "img/nztg.png", "Href": "#/msgList/96" }, { "Name": "志愿风采", "Src": "img/zyfc.png", "Href": "#/msgList/105" }, { "Name": "农副产品", "Src": "img/nfcp.png", "Href": "#/msgList/102" }, { "Name": "合作社", "Src": "img/hzs.png", "Href": "#/msgList/103" }, { "Name": "农业企业", "Src": "img/nyqy.png", "Href": "#/msgList/104" }];
            var tempNavList = [];
            for (var i in navItems) {
                navItems[i].IsBlank = $scope.IsShow(i);
                tempNavList.push(navItems[i]);
            }
            $scope.ListNav = tempNavList;
        };

        $scope.IsShow = function (index) {
            index = parseInt(index);
            switch (index) {
                case 4:
                    return true;
                case 8:
                    return true;
                case 11:
                    return true;
                default:
                    return false;
            }
        };

        var menu = ["种植业", "养殖业", "能源生态", "农业机械", "加工工艺", "食品加工", "存储加工"];
        Storage.set("DM_Navigate", menu);
        $scope.navigate = function(detail) {
            location.href = detail;
        }

    }]);
});
    
