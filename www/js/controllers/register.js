
define(['app', 'js/utils/tips'], function (app, Tips) {
    app.controller('registerCtrl', ['$scope', '$ionicHistory', '$ionicModal', '$ionicActionSheet', '$cordovaImagePicker', 'httpRequest', function ($scope, $ionicHistory, $ionicModal, $ionicActionSheet, $cordovaImagePicker, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            $scope.GetUserTypeList();
            $scope.GetTownList();
        });

        $ionicModal.fromTemplateUrl('templates/DlgTown.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.DlgTownModal = modal;
        });
        $scope.onCloseDlgTown = function () {
            $scope.DlgTownModal.hide();
        }
        $ionicModal.fromTemplateUrl('templates/DlgVillage.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.DlgVillageModal = modal;
        });
        $scope.onCloseDlgVillage = function () {
            $scope.DlgVillageModal.hide();
        }

        $scope.ModelData = { "UserType": "请选择用户类别", "TownName": "选择镇", "VillageName": "选择村", "HeaderPic": "img/register-1.png" };
        $scope.ListTown = [];
        $scope.ListVillage = [];
        $scope.ListUserType = [];
        $scope.UserTypeRows = [];

        $scope.ClearData = function () {
            $scope.ModelData = { "MobliePhone": "", "Email": "", "Password": "", "NickName": "", "UserType": "请选择用户类别", "TownName": "选择镇", "VillageName": "选择村", "HeaderPic": "img/zc.png" };
        }

        $scope.GetTownList = function () {
            httpRequest.getWithUI($scope, 'api/address/getlist?parentid=0', {}, function (result) {
                if (result.data.Message == "OK") {
                    $scope.ListTown = result.data.ResultObj;
                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };
        $scope.GetVillageList = function (parentId) {
            //console.log('api/address/getlist?parentid=' + parentId + '');
            httpRequest.getWithUI($scope, 'api/address/getlist?parentid=' + parentId + '', {}, function (result) {
                if (result.data.Message == "OK") {
                    $scope.ListVillage = result.data.ResultObj;
                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };
        $scope.GetUserTypeList = function () {
            httpRequest.getWithUI($scope, 'api/account/getusertypes', {}, function (result) {
                if (result.data.Message == "OK") {
                    $scope.ListUserType = result.data.ResultObj;
                    $scope.BindUserType();
                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };

        $scope.BindUserType = function () {
            for (var item in $scope.ListUserType) {
                var temp = { text: '<div class="c-6 text-center dm-border">' + $scope.ListUserType[item].UserType + '</div>' };
                $scope.UserTypeRows = $scope.UserTypeRows.concat(temp);
            }
        };

        $scope.onUserType = function () {
            $ionicActionSheet.show({
                buttons: $scope.UserTypeRows,
                buttonClicked: function (index) {
                    $scope.ModelData.UserType = $scope.ListUserType[index].UserType;
                    $scope.ModelData.UserTypeId = $scope.ListUserType[index].Id;
                    return true;
                }
            });
        };

        $scope.onTown = function () {
            $scope.DlgTownModal.show();
        };
        $scope.onSelectTown = function (item) {
            $scope.ModelData.TownName = item.Name;
            $scope.ModelData.TownId = item.Id;
            $scope.GetVillageList($scope.ModelData.TownId);
            $scope.DlgTownModal.hide();
        }
        $scope.onVillage = function () {
            if (!$scope.ModelData.TownId) {
                Tips.showTips('请先选择镇');
                return false;
            }
            $scope.DlgVillageModal.show();
        };
        $scope.onSelectVillage = function (item) {
            $scope.ModelData.VillageName = item.Name;
            $scope.ModelData.VillageId = item.Id;
            $scope.DlgVillageModal.hide();
        }

        $scope.doRegister = function () {
            var mobilePhone = $scope.ModelData.MobliePhone;
            if (!mobilePhone) {
                Tips.showTips('请正确输入您的手机号');
                return false;
            }
            var email = $scope.ModelData.Email;
            if (!email) {
                Tips.showTips('请正确输入电子邮箱');
                return false;
            }
            var password = $scope.ModelData.Password;
            if (!password) {
                Tips.showTips('请正确输入密码');
                return false;
            }
            var nickName = $scope.ModelData.NickName;
            if (!nickName || nickName == '') {
                Tips.showTips('请输入姓名');
                return false;
            }
            var userType = $scope.ModelData.UserType;
            if (!userType || userType == '') {
                Tips.showTips('请选择用户类别');
                return false;
            }
            var townName = $scope.ModelData.TownName;
            var townId = $scope.ModelData.TownId;
            if (!townId || townId == '') {
                Tips.showTips('请选择镇');
                return false;
            }
            var villageName = $scope.ModelData.VillageName;
            var villageId = $scope.ModelData.VillageId;
            if (!villageId || villageId == '') {
                Tips.showTips('请选择村');
                return false;
            }
            var postData = {};
            postData.Phone = mobilePhone;
            postData.TrueName = nickName;
            postData.Email = email;
            postData.TownId = townId;
            postData.Town = townName;
            postData.VillageId = villageId;
            postData.Village = villageName;
            postData.Password = password;
            postData.Sex = '男';
            postData.Photo = $scope.ModelData.HeaderPic;
            postData.Address = '';
            postData.UserType = userType;

            //console.log('api/account/reg-postData--' + JSON.stringify(postData));

            httpRequest.postJson('api/account/reg', JSON.stringify(postData), function (result) {
                //console.log('result--' + result);
                if (result.data.Message == "OK") {
                    Tips.showTips("提交成功了，请先登录...");
                    setTimeout(function () {
                        window.location = '#/login';
                    }, 1000);
                    //$scope.ClearData();
                } else {
                    Tips.showTips(result.data.Message);
                }
            });
        };

        // 设置图片内容
        $scope.picArr = [];
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
                    $scope.ModelData.HeaderPic = tmp[0]['Url'];
                } else {
                    Tips.showTips("获取返回信息出错了.")
                }
            });
        };

    }]);
   
});