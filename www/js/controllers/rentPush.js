define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('rentPushCtrl', ['$scope', '$ionicHistory', 'Storage', '$ionicActionSheet', 'httpRequest', '$cordovaCamera', '$cordovaImagePicker', function($scope, $ionicHistory, Storage, $ionicActionSheet, httpRequest, $cordovaCamera, $cordovaImagePicker) {
        $scope.$on('$ionicView.beforeLeave', function() {
            Storage.set("DM_TmpRentData", "");
        });

        $scope.msg = {};
        $scope.picArr = [];
        var item = Storage.get("DM_TmpRentData");
        //console.log('item--' + JSON.stringify(item));
        if(item){   
            $scope.msg.Id = item.Id;
            $scope.msg.title = item.Title;
            $scope.msg.detail = item.Summary;
            $scope.msg.price = item.Price;
            $scope.msg.datefrom = new Date(item.DateFrom);
            $scope.msg.dateto = new Date(item.DateTo);
            $scope.msg.area = item.Area;
            $scope.msg.model = item.Model;
            $scope.picArr = $scope.picArr.concat(item.Photo);
            $scope.msg.IsShow = item.IsShow;
        };
        $scope.comfirm = function() {
            var tmp = "";
            if(!$scope.msg.title)tmp = "请先输入标题";
            if(!$scope.msg.price)tmp = "请先输入价格";
            if(!$scope.msg.datefrom)tmp = "请先输入起始时间";
            if(!$scope.msg.dateto)tmp = "请先输入目的时间";
            if(!$scope.msg.area)tmp = "请先输入地区";
            if(!$scope.msg.model)tmp = "请先输入型号";
            if(tmp){
                Tips.showTips(tmp);
                return;
            }

            var kdata = {
                Title:$scope.msg.title,
                Summary:$scope.msg.detail,
                Price:$scope.msg.price,
                DateFrom:$scope.msg.datefrom,
                DateTo:$scope.msg.dateto,
                Area:$scope.msg.area,
                Model:$scope.msg.model,
                Photo:$scope.msg.pic
            };
            var url = 'api/lease/wanted';
            if ($scope.msg.Id) {
                kdata.Id = $scope.msg.Id;
                url="api/lease/updatewanted";
            }
            httpRequest.postWithUI($scope, url, kdata, function(re){
                if(re.data.Message == "OK") {
                    Tips.showTips("提交成功了...");
                    $ionicHistory.goBack();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });
        };

        $scope.cancelImg = function (item) {
            for (var a = 0; a < $scope.picArr.length; a++) {
                if (item == $scope.picArr[a]) {
                    $scope.picArr.splice(a, 1);
                    return;
                }
            }
        };
        $scope.showImgPop = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<div class="c-6 text-center dm-border">拍照</div>' },
                    { text: '<div class="c-6 text-center dm-border">相册</div>' }
                ],
                buttonClicked: function (index) {
                    if (index == 0) {
                        $scope.takePic();
                    } else if (index == 1) {
                        $scope.imgPicker();
                    }
                    return true;
                }
            });
        };
        $scope.takePic = function () {
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
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(function (imageData) {
                if (imageData) {
                    uploadImgs("data:image/png;base64, " + imageData);
                }
            }, function (err) {
                Tips.showTips(err);
            });
        };
        $scope.imgPicker = function () {
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
                }, function (error) {
                    Tips.showTips(error);
                });
        };
        var uploadImgs = function (src) {
            httpRequest.postFileWithAuth($scope, src, function (re) {
                if (re.response) {
                    var tmp = JSON.parse(re.response);
                    $scope.picArr = $scope.picArr.concat(tmp[0]['Url']);
                } else {
                    Tips.showTips("获取返回信息出错了.")
                }
            });
        };

        // 放大图片设置
        $scope.imgSrc = "";
        $scope.getImg = function (item) {
            //console.log('item--' + item);
            $scope.imgSrc = item;
        };
        $scope.clearImg = function(){
            $scope.imgSrc = "";
        }

        //$scope.addPic = function () {
        //    if ($scope.msg.IsEdit) return false;
        //    $ionicActionSheet.show({
        //        buttons: [
        //            { text: '<div class="c-6 text-center dm-border">拍照</div>' },
        //            { text: '<div class="c-6 text-center dm-border">相册</div>' }
        //        ],
        //        buttonClicked: function(index) {
        //            if(index == 0) {
        //                $scope.takePic();
        //            } else if(index == 1) {
        //                $scope.imgPicker();
        //            }
        //            return true;
        //        }
        //    });
        //};
        //$scope.cancelImg = function (item) {
        //    for (var a = 0; a < $scope.pic.length; a++) {
        //        if (item == $scope.picArr[a]) {
        //            $scope.picArr.splice(a, 1);
        //            return;
        //        }
        //    }
        //};
        //// 拍照获取
        //$scope.takePic = function() {
        //    var options = {
        //        quality: 80,
        //        destinationType: Camera.DestinationType.DATA_URL,
        //        sourceType: Camera.PictureSourceType.CAMERA,
        //        allowEdit: true,
        //        encodingType: Camera.EncodingType.JPEG,
        //        targetWidth: 120,
        //        targetHeight: 120,
        //        popoverOptions: CameraPopoverOptions,
        //        saveToPhotoAlbum: false,
        //        correctOrientation:true
        //    };
        //    $cordovaCamera.getPicture(options).then(function(imageData) {
        //        if (imageData) {
        //            uploadImgs("data:image/png;base64, "+imageData);
        //        }
        //    }, function(err) {
        //        Tips.showTips(err);
        //    });
        //};
        //// 选择图片
        //$scope.imgPicker = function() {
        //    var options = {
        //        maximumImagesCount: 1,
        //        width: 800,
        //        height: 800,
        //        quality: 80
        //    };
        //    $cordovaImagePicker.getPictures(options)
        //        .then(function (results) {
        //            if (results[0]) {
        //                uploadImgs(results[0]);
        //            }
        //        }, function(error) {
        //            Tips.showTips(error);
        //        });
        //};
        //// upload img
        //var uploadImgs = function(src) {
        //    httpRequest.postFileWithAuth($scope, src, function(re) {
        //        if(re.response) {
        //            var tmp = JSON.parse(re.response);
        //            $scope.msg.pic = tmp[0]['Url'];
        //        } else {
        //            Tips.showTips("获取返回信息出错了.")
        //        }
        //    });
        //};

    }]);
   
});