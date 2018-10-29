define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('AddExpertQuestionCtrl', ['$rootScope', '$scope', '$state', '$ionicActionSheet', 'httpRequest', 'Storage', '$cordovaCamera', '$cordovaImagePicker', function ($rootScope,$scope, $state, $ionicActionSheet, httpRequest, Storage, $cordovaCamera, $cordovaImagePicker) {

        var pages = "#/tab/home+#/tab/navigate+#/tab/DailySign+#/tab/YouthVoice+#/tab/mine";
        $scope.$on('$ionicView.afterEnter', function () {
            if (pages.indexOf(location.hash) > -1) {
                var tabs =document.getElementsByTagName('ion-tabs');
                angular.element(tabs).removeClass("tabs-item-hide");
            }

            // 获取一次数据
            if (!$scope.cateDic && fetchList){
                fetchList();
            }

            // 判断是否清空数据
            var tmp = Storage.get("DM_TmpProfessor");
            if(tmp) {
                $scope.clearData();
                Storage.set("DM_TmpProfessor", "");
            }

        });
        $scope.$on('$ionicView.beforeLeave', function () {
            if (pages.indexOf(location.hash) > -1) return;
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).addClass("tabs-item-hide");
        });

        $scope.typeOne = '请选择专家分类';
        $scope.typeTwo = '请选择分类';

        $scope.msg = {
            title :"",
            content :""
        };

        var Id = parseInt($state.params.Id)-1;
        //var selectExpertCategory = $rootScope.ListExpertCategory[Id];
        //console.log('selectExpertCategory--' + JSON.stringify(selectExpertCategory));

        var fetchList = function () {
            var url = 'api/qa/getcates?type=1';
            if (Id > 5) url = 'api/qa/getcates?type=3';
            httpRequest.getWithUI($scope, url, {}, function (re) {
                //console.log(url+'--re--' + JSON.stringify(re));
                if (re.data.Message == "OK") {
                    var category = re.data.ResultObj;
                    $scope.cateDic = {};

                    for (var i=0; i< category.length; i++) {
                        var item = category[i];
                        if (item.ParentId == 0) {
                            $scope.cateDic[item.Id] = [item];
                        }
                    }
                    for (var i=0; i<category.length; i++) {
                        var item  = category[i];
                        if (item.ParentId != 0) {
                            $scope.cateDic[item.ParentId] = $scope.cateDic[item.ParentId].concat(item);
                        }
                    }
                    $scope.changeCate();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });
        };

        $scope.changeCate = function () {
            var selectExpertCategory = $rootScope.ListExpertCategory[Id];
            //console.log('selectExpertCategory--' + JSON.stringify(selectExpertCategory));
            $scope.type = [];
            $scope.typeValue1 = [];
            for (var item in $scope.cateDic) {
                var tmp = {
                    name:$scope.cateDic[item][0].CateName,
                    id:$scope.cateDic[item][0].Id
                };

                if (tmp.name.indexOf(selectExpertCategory.Name) > -1) {
                    $scope.typeOne = tmp.name;
                    $scope.typeId = tmp.id;
                    $scope.getSubType($scope.typeId);
                }
                $scope.typeValue1 = $scope.typeValue1.concat(tmp);

                var tmp = {text:'<div class="c-6 text-center dm-border">'+$scope.cateDic[item][0].CateName+'</div>'};
                $scope.type = $scope.type.concat(tmp);
            }
        };

        $scope.getSubType = function(id){
            $scope.subType = [];
            $scope.typeValue2 = [];
            $scope.typeValue2Id = [];
            for (var i=1; i< $scope.cateDic[id].length; i++) {
                var item = $scope.cateDic[id][i];
                $scope.typeValue2 = $scope.typeValue2.concat(item.CateName);
                $scope.typeValue2Id = $scope.typeValue2Id.concat(item.Id);
                var tmp = { text: '<div class="c-6 text-center dm-border">' + item.CateName + '</div>' };
                $scope.subType = $scope.subType.concat(tmp);
            }
        };

        $scope.selectType = function(){
            $ionicActionSheet.show({
                buttons: $scope.type,
                buttonClicked: function(index) {
                    $scope.typeOne = $scope.typeValue1[index]['name'];
                    $scope.typeId = $scope.typeValue1[index]['id'];
                    $scope.getSubType($scope.typeValue1[index]['id']);
                    return true;
                }
            });
        };

        $scope.selectCount = function() {
            if (!$scope.subType) {
                Tips.showTips("请先选择分类");
                return;
            }
            $ionicActionSheet.show({
                buttons:  $scope.subType,
                buttonClicked: function(index) {
                    $scope.typeTwo = $scope.typeValue2[index];
                    $scope.subTypeId = $scope.typeValue2Id[index];
                    return true;
                }
            });
        };
        
        // 设置图片内容
        $scope.picArr = [];
        // delete picture
        $scope.cancelImg = function(item) {
            for(var a =0; a<$scope.picArr.length;a++) {
                if(item == $scope.picArr[a]){
                    $scope.picArr.splice(a, 1);
                    return;
                }
            }
        };
        // add pic
        $scope.showImgPop = function() {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<div class="c-6 text-center dm-border">拍照</div>' },
                    { text: '<div class="c-6 text-center dm-border">相册</div>' }
                ],
                buttonClicked: function(index) {
                    if(index == 0) {
                        $scope.takePic();
                    } else if(index == 1) {
                        $scope.imgPicker();
                    }
                    return true;
                }
            });
        };
        // 拍照获取
        $scope.takePic = function() {
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 120,
                targetHeight: 120,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                if (imageData) {
                    uploadImgs("data:image/png;base64, "+imageData);
                }
            }, function(err) {
                Tips.showTips(err);
            });
        };
        // 选择图片
        $scope.imgPicker = function() {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    if (results[0]) {
                        uploadImgs(results[0]);
                    }
                }, function(error) {
                    Tips.showTips(error);
                });
        };
        // upload img
        var uploadImgs = function(src) {
            httpRequest.postFileWithAuth($scope, src, function(re) {
                if(re.response) {
                    var tmp = JSON.parse(re.response);
                    $scope.picArr = $scope.picArr.concat(tmp[0]['Url']);
                } else {
                    Tips.showTips("获取返回信息出错了.")
                }
            });
        };

        // push message
        $scope.push = function() {
            var str = "";
            if (!$scope.msg.title) str = "请输入标题";
            if (!$scope.msg.content) str = "请输入详情";
            if (!$scope.subTypeId) str = "请先选择分类";
            if (str) {
                Tips.showTips(str);
                return;
            }
            var tmp = {
                Title:$scope.msg.title,
                Body:$scope.msg.content,
                CateId:$scope.subTypeId,
                ChannelType:"1",
                Files:$scope.picArr
            };
            httpRequest.postWithUI($scope, 'api/qa/submit', JSON.stringify(tmp), function(re){
                if(re.data.Message == "OK") {
                    Tips.showTips("提交成功了...");
                    $scope.clearData();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });
        };

        // get category
        var auth = Storage.get("DM_Auth");
        if (!auth){
            Tips.showTips("需要登陆");
            return;
        }
        fetchList();

        // clearData
        $scope.clearData = function(){
            $scope.msg = {};
            $scope.picArr = [];
            $scope.typeOne = '请选择专家分类';
            $scope.typeTwo = '请选择主管部门';
        };

    }]);
});
    
