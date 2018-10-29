define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('professorCtrl', ['$rootScope', '$scope', '$ionicActionSheet', 'httpRequest', 'Storage', function ($rootScope,$scope, $ionicActionSheet, httpRequest, Storage) {
        
        $scope.$on('$ionicView.enter', function () {
            //$scope.GetHotQuestionList();
        });

        $rootScope.ListExpertCategory = [{ "Id": "1", "Name": "气象专家" }, { "Id": "2", "Name": "农技专家" }, { "Id": "3", "Name": "畜牧兽医专家" }, { "Id": "4", "Name": "养殖业专家" }, { "Id": "5", "Name": "农产品质量安全专家" }, { "Id": "6", "Name": "更多" }, { "Id": "7", "Name": "农业种植" }, { "Id": "8", "Name": "水产养殖" }, { "Id": "9", "Name": "禽畜养殖" }];

        //$scope.ListHotQuestion = [];
        //var params = {
        //    pageindex: 1,
        //    pagesize: 10,
        //    istop:true
        //};
        //$scope.GetHotQuestionList = function () {
        //    httpRequest.get('/api/info/getlist?pageindex=1&pagesize=3&istop=true', params, function (result) {
        //        //console.log('result--' + JSON.stringify(result));
        //        if (result.data.Message == "OK") {
        //            $scope.ListHotQuestion = result.data.ResultObj;
        //        }
        //    });
        //}

        $scope.onTo = function (Id) {
            window.location = '#/AddExpertQuestion/' + Id + '';
        }

        $scope.onToDetail = function (item) {
            location.href = "#/article/" + item.Id + "";
        };

    }]);
});
    
