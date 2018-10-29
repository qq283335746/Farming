define(['app', 'js/utils/citySelect', 'js/utils/tips'],function (app, CitySelect, Tips) {
    app.controller('personalCtrl', ['$scope', '$ionicHistory', 'Storage', '$state', '$ionicActionSheet', 'httpRequest', '$cordovaCamera', '$cordovaImagePicker', function($scope, $ionicHistory, Storage, $state, $ionicActionSheet, httpRequest, $cordovaCamera, $cordovaImagePicker) {

        $scope.changeIcon = function() {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<div class="c-6 text-center dm-border">拍照</div>' },
                    { text: '<div class="c-6 text-center dm-border">相册</div>' },
                    { text: '<div class="c-6 text-center dm-border">取消</div>' }
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
                    $scope.msg.Photo = tmp[0]['Url'];
                } else {
                    Tips.showTips("获取返回信息出错了.")
                }
            });
        };

        var auth = Storage.get("DM_Auth");
        $scope.msg = {
            TrueName:auth.ResultObj.TrueName,
            Photo:auth.ResultObj.Photo?auth.ResultObj.Photo:'img/mike.png',
            Address:auth.ResultObj.Address,
            sex:auth.ResultObj.Sex?auth.ResultObj.Sex:"男"
        }
        $scope.save = function(){
            var tmp = "";
            if(!$scope.msg.Photo)tmp = "请选择头像";
            if(!$scope.msg.TrueName)tmp = "请输入真实姓名";
            if(!$scope.msg.Address)tmp = "请选择地区";
            if(tmp){
                Tips.showTips(tmp);
                return;
            }

            var params = {
                Photo:$scope.msg.Photo,
                TrueName:$scope.msg.TrueName,
                Address:$scope.msg.Address,
                Id:auth.ResultObj.UserId,
                Sex: $scope.msg.sex
            };
            //console.log('params--' + JSON.stringify(params));
            httpRequest.postWithUI($scope, "api/user/update", params, function (re) {
                //console.log('api/user/update--' + JSON.stringify(re));
                if (re.data.Message == "OK") {
                    Tips.showTips("修改成功！");

                    // 更新数据
                    auth.ResultObj.Photo = $scope.msg.Photo;
                    auth.ResultObj.TrueName = $scope.msg.TrueName;
                    auth.ResultObj.Address = $scope.msg.Address;
                    auth.ResultObj.Sex = $scope.msg.sex;
                    Storage.set("DM_Auth", auth);

                    $ionicHistory.goBack();
                } else {
                    Tips.showTips(re.data.Message);
                }
            });
        };

        $scope.show = function(){
            var options = {
                date: new Date(),
                mode: 'date'
            };
            window.plugins.datePicker.show(options, function(re){
                $scope.data.birthday = re.Format("yyyy年MM月dd日");
                $scope.$apply();
            });
        };

        //显示地址选择
        $scope.showCitySelect = function() {
            CitySelect.init({
                element: ".js-citySelestNode",
                value: ["江苏省", "泰州市", "兴化市"],
                callback: function(data) {
                    $scope.$apply(function() {
                        $scope.msg.Address = data.join('，')
                    })
                },
                initComplete: function(data) {
                    if ($scope.msg.Address && $scope.msg.Address != '') {
                        var data = $scope.msg.Address.split('，');
                        CitySelect.set(data)
                    } else {
                        $scope.$apply(function() {
                            $scope.msg.Address = data.join('，')
                        })
                    }
                },
                url: 'data/city.json'
            })
        };

        // 手势处理隐藏
        var htmlEl = angular.element(document.querySelector('#personal'));
        htmlEl.on("click", function(e) {
            if ($($('.js-citySelestNode')[0]).find(e.target).length == 0 && $(e.target) != $('.item-content')[0]) {
                $('.js-citySelestNode').html("")
            }
        });

        // 日期格式转化
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }]);
   
});