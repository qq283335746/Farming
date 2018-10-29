define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('mineQuestionDetailCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', 'httpRequest', function($scope, $ionicHistory, Storage, $state, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            $scope.id = $state.params.id;
            $scope.roleType = $state.params.roleType;

            httpRequest.getWithUI($scope, 'api/qa/getdetail?id=' + $scope.id, {}, function (re) {
                //console.log('getdetail--' + JSON.stringify(re));
                if(re.data.Message == "OK") {
                    var item = $scope.item = re.data.ResultObj;
                    $scope.title = item.Title;
                    $scope.content = item.Body;
                    $scope.time = item.AddDate;
                    $scope.Answer = item.Answer ? item.Answer.Body : '';
                    $scope.QuestionAttaches = item.QuestionAttaches;
                    $scope.IsEmpty = item.Answer == null ? true : false;
                } else {
                    Tips.showTips(re.data.Message);
                }
            });

            $scope.canSubmit = $scope.roleType == "1";
            //console.log('$scope.roleType--' + $scope.roleType);
        });


        $scope.msg = {};
        // 提交问题
        $scope.submit = function(){
            if(!$scope.msg.content){
                Tips.showTips("请输入回答内容");
                return;
            }
            var params = {
                Body:$scope.msg.content,
                ParentId:$scope.item.Id
            };
            httpRequest.postWithUI($scope, 'api/qa/submit', params, function(re){
                if(re.data.Message == "OK") {
                    Tips.showTips("提交回复成功！")
                    $ionicHistory.goBack();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });

        };

        // 放大图片设置
        $scope.imgSrc = "";
        $scope.getImg = function(src){
            $scope.imgSrc = src;
        };
        $scope.clearImg = function(){
            $scope.imgSrc = "";
        }

    }]);
});