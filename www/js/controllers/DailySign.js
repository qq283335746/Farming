define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('DailySignCtrl', ['$scope', '$ionicLoading', '$timeout', '$ionicActionSheet', 'httpRequest', 'Storage', function ($scope, $ionicLoading, $timeout, $ionicActionSheet, httpRequest, Storage) {

        $scope.$on('$ionicView.enter', function () {
            var tabs = document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
            $scope.Init();
        });

        $scope.ModelData = {};
        $scope.UserInfo = Storage.get("DM_Auth").ResultObj;
        $scope.ListSign = [];
        $scope.ListArticle = [];
        //$scope.ItemAvatarStyle = "item-avatar-none";

        $scope.Init = function () {
            $scope.GetSignList();
            $scope.GetArticleList();
        }

        $scope.GetSignList = function () {
            httpRequest.getWithUI($scope, 'api/user/getsinginlist?userid=' + $scope.UserInfo.UserId + '', {}, function (result) {
                //console.log('getsinginlist--result--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ListSign = result.data.ResultObj;
                    $scope.InitCircleDaily($scope.ListSign);

                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };

        $scope.InitCircleDaily = function (data) {
            var list = [];
            var totalSign = 0;
            var sToday = Common.FormatDate(new Date());
            //var circleAppend = '';
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var k = i;
                if (data[i].SignState) {
                    totalSign++;
                    if (data[i].SignDay == sToday) $scope.ModelData.HasTodaySign = true;
                }

                if (i % 7 == 0) {

                    var jRow = [];
                    for (var j = k; j < (k+7); j++) {
                        var jCol = {};
                        if (j < len) {
                            jCol.Date = data[j].SignDay;
                            jCol.IsHide = false;
                            jCol.Style = data[j].SignState ? 'current' : '';
                            jCol.Status = 0;
                        }
                        else {
                            jCol.Date = '';
                            jCol.IsHide = true;
                            jCol.Style = '';
                        }
                        jRow.push(jCol);
                    }

                    list.push({"RowData":jRow});
                }
            }
            $scope.ListCircleDaily = list;
            $scope.TotalSign = totalSign;
        };

        $scope.onCircleDaily = function (item) {
            //console.log('onCircleDaily--' + JSON.stringify(item));
            if (item.Style != 'current') {
                $scope.SaveSign(item);
            }
        };

        $scope.SaveSign = function (item) {
            var postData = {};
            postData.Id = 0;
            postData.UserId = $scope.UserInfo.UserId;
            postData.SignIn = item.Date;

            //console.log('SaveSign-postData--' + JSON.stringify(postData));
            httpRequest.postWithUI($scope, "api/user/singin", postData, function (result) {
                //console.log('SaveSign--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    item.Style = 'current';
                    $scope.TotalSign++;
                    item.Status = 1;
                    Tips.showTips("签到成功");
                } else {
                    Tips.showTips(result.data.Message);
                }
            })
        };

        $scope.doSign = function () {

            if ($scope.ModelData.HasTodaySign) {
                Tips.showTips("您今天已经签到，请勿重复操作");
                return false;
            }
            if ($scope.ListArticle.length > 0) {
                Tips.showTips("您有未读信息，无法签到！");
                return false;
            }

            var postData = {};
            postData.Id = 0;
            postData.UserId = $scope.UserInfo.UserId;
            postData.SignIn = '';

            //console.log('SaveSign-postData--' + JSON.stringify(postData));
            httpRequest.postWithUI($scope, "api/user/singin", postData, function (result) {
                //console.log('SaveSign--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    var signDate = Common.FormatDate(result.data.ResultObj.SignIn);
                    //console.log('signDate--' + signDate);

                    for (var i = 0; i < $scope.ListSign.length; i++) {
                        var item = $scope.ListSign[i];
                        if (item.SignDay == signDate) {
                            item.Style = 'current';
                            item.Status = 1;
                            $scope.TotalSign++;
                            $scope.ModelData.HasTodaySign = true;
                        }
                    }

                    Tips.showTips("签到成功");
                } else {
                    Tips.showTips(result.data.Message);
                }
            })
        }

        $scope.GetArticleList = function () {
            var list = [];
            var params = { pageindex: 1, pagesize: 3, isread: false, userid: $scope.UserInfo.UserId };
            //console.log('api/info/getlist--params--' + JSON.stringify(params));
            httpRequest.getWithUI($scope, 'api/info/getlist', params, function (result) {
                //console.log('api/info/getlist--result--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    list = result.data.ResultObj;
                }

                $scope.ListArticle = list;
            })
        };

        $scope.ShowArticle = function (item) {
            //Storage.set("DM_Article", item);
            location.href = "#/article/" + item.Id + "";
        };

    }]);
});