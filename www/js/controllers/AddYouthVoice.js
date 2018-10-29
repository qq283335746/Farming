define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('AddYouthVoiceCtrl', ['$scope', '$ionicActionSheet', 'httpRequest', 'Storage', '$cordovaCamera', '$cordovaImagePicker', function ($scope, $ionicActionSheet, httpRequest, Storage, $cordovaCamera, $cordovaImagePicker) {

        $scope.$on('$ionicView.enter', function () {
            
        });

        $scope.FmData = { "Title": "", "Content": "" };

        // 设置图片内容
        $scope.picArr = [];

        // delete picture
        $scope.cancelImg = function (item) {
            for (var a = 0; a < $scope.picArr.length; a++) {
                if (item == $scope.picArr[a]) {
                    $scope.picArr.splice(a, 1);
                    return;
                }
            }
        };

        // add pic
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
        // 拍照获取
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

        // 选择图片
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

        // upload img
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

        // push message
        $scope.onSave = function () {

            var sTitle = $scope.FmData.Title;
            var sContent = $scope.FmData.Content;

            if (!sTitle) {
                Tips.showTips('请输入标题');
                return;
            }
            if (!sContent) {
                Tips.showTips('请输入内容');
                return;
            }
            var postData = {
                Title: sTitle,
                Content: sContent,
                Files:$scope.picArr
            };

            //console.log('api/info/submit-postData--' + JSON.stringify(postData));
            httpRequest.postWithUI($scope, 'api/info/submit', postData, function (result) {
                //console.log('api/info/submit--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    Tips.showTips("提交成功了...");
                    $scope.ClearData();
                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };

        // clearData
        $scope.ClearData = function () {
            $scope.FmData = { "Title": "", "Content": "" };
        };

    }]);
});