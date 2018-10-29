/**
 * 请求封装类
 * Created by luliang on 2015/11/19.
 */
//The response object has these properties:
//
//  data – {string|Object} – The response body transformed with the transform functions.
//  status – {number} – HTTP status code of the response.
//  headers – {function([headerName])} – Header getter function.
//config – {Object} – The configuration object that was used to generate the request.
//  statusText – {string} – HTTP status text of the response.
define(['app', 'js/utils/tips','js/utils/httpRequestBase','js/utils/md5'],function(app, Tips){
  app
    .factory('httpRequest',['$http','$q','httpRequestBase','md5Utils','$httpParamSerializerJQLike', 'Storage', '$cordovaFileTransfer',
      function($http,$q,httpRequestBase,md5Utils,$httpParamSerializerJQLike, Storage, $cordovaFileTransfer){
      
      var getBaseUrl = function(){
        return APP.baseUrl;
      };
      /**
       *http请求
       * @param {Object} config
       * @param{function}[onSuccess]
       * @param{function}[onFailed]
       * @param{function}[onFinal]
       * @returns {object}promise
       */
      function requestMethod(config,onSuccess,onFailed,onFinal){
        return httpRequestBase.request(config,function(response,data,status,headers,config,statusText){
          try {
            var code = data.code;
            //在这里处理公共错误
            if(code == 306) {
              
            }
            if (angular.isFunction(onSuccess)) {
              onSuccess(response,data,status,headers,config,statusText);
            }
            
          } catch (e) {
            // ssjjLog.error("response Error："+e.name+"："+ e.message);
            if(angular.isFunction(onFailed)){
              onFailed(response,data,status,headers,config,statusText);
            }
          }
        },onFailed,onFinal);
      }


      return{
        /**
         *Get请求
         * @param {Object.<string|Object>} extraUrl 接口地址 不包括其他参数 例子?c=user&a=login 不要包括最后面的'&'
         * @param {Object.<string|Object>}[extraParams] 请求参数 拼接到url后面
         * @param {function}[onSuccess]
         * @param {function}[onFailed]
         * @param {function}[onFinal]
         * @returns {object}promise
         */
        get: function(extraUrl,extraParams,onSuccess,onFailed,onFinal){
          var httpConfig = {};
          httpConfig.method = 'GET';
          var url = getBaseUrl();
          if(extraUrl.indexOf("http")>=0){
            if(angular.isString(extraUrl)){
              url=extraUrl;
              httpConfig.url = url;
            }
          }else{
            if(angular.isString(extraUrl)){
              url+=extraUrl;
              httpConfig.url = url;
            }
          }
          // var params = MyUrl.getDefaultParams();
          var params = {};
          for(var key in extraParams){
            params[key] = extraParams[key];
          }
          if(angular.isString(params) || angular.isObject(params)){
            httpConfig.params = params;
          }

          var auth = Storage.get("DM_Auth");
          if(auth) {
            httpConfig.headers = {
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
              'sessionKey':auth.SessionKey
            };
          }

          return requestMethod(httpConfig,onSuccess,onFailed,onFinal);
        },
        // attend to the task, concat the alertView and auth msg
        getWithUI: function($scope, extraUrl, data, onSuccess, onFailed, onFinal) {
          // 发送请求
          $scope.$emit('loadding', 'noBackdrop','请求中...');
          this.get(extraUrl, data, function(re){
            if(onSuccess)onSuccess(re);
          }, function(re){
            //console.log(JSON.stringify(re));
            Tips.showTips('亲~您好像断网了，请检查您的网络~~~');
            if(onFailed)onFailed(re);
          }, function(re){
            $scope.$emit('loadding', 'false');
            if(onFailed)onFinal(re);
          });
        },
        postJson: function (extraUrl, data, onSuccess, onFailed, onFinal) {
            var httpConfig = {};
            httpConfig.method = 'POST';
            var url = getBaseUrl();
            if (extraUrl.indexOf("http") >= 0) {
                if (angular.isString(extraUrl)) {
                    url = extraUrl;
                    httpConfig.url = url;
                }
            } else {
                if (angular.isString(extraUrl)) {
                    url += extraUrl;
                    httpConfig.url = url;
                }
            }
            httpConfig.data = data;
            httpConfig.headers = {
                'Content-Type': 'application/json; charset=UTF-8'
            };

            return requestMethod(httpConfig, onSuccess, onFailed, onFinal);
        },
        /**
         * POST请求
         * @param {string}extraUrl 接口地址 不包括其他参数 例子?c=user&a=login 不要包括最后面的'&'
         * @param {string|Object}[data] post 表单提交的数据 post请求附带参数
         * @param {function}[onSuccess]
         * @param {function}[onFailed]
         * @param {function}[onFinal]
         * @returns {object}promise
         */
        post: function(extraUrl,data,onSuccess,onFailed,onFinal){
          var httpConfig = {};
          httpConfig.method = 'POST';
          var url = getBaseUrl();
          if(extraUrl.indexOf("http")>=0){
            if(angular.isString(extraUrl)){
              url=extraUrl;
              httpConfig.url = url;
            }
          }else{
            if(angular.isString(extraUrl)){
              url+=extraUrl;
              httpConfig.url = url;
            }
          }
          httpConfig.data = data;

          var auth = Storage.get("DM_Auth");
          if(auth) {
            httpConfig.headers = {
              'Content-Type':'application/json; charset=UTF-8',
              'sessionKey':auth.SessionKey
            };
          }

          return requestMethod(httpConfig,onSuccess,onFailed,onFinal);
        },
        // attend to the task, concat the alertView and auth msg
        postWithUI: function($scope, extraUrl, data, onSuccess, onFailed, onFinal) {
          // 发送请求
          $scope.$emit('loadding', 'noBackdrop','请求中...');
          this.post(extraUrl, data, function(re){
            if(onSuccess)onSuccess(re);
          }, function(re){
            //console.log(JSON.stringify(re));
            Tips.showTips('亲~您好像断网了，请检查您的网络~~~');
            if(onFailed)onFailed(re);
          }, function(re){
            $scope.$emit('loadding', 'false');
            if(onFailed)onFinal(re);
          });
        },

        // attend to the task, concat the alertView and auth msg, it is a method to send imgs
        postFileWithAuth: function($scope, src, onSuccess, onFailed, onFinal) {
          var filename = src.split("/").pop();

          var options = {
            fileKey: "image",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/png",
            params: {}
          };
          $scope.$emit('loadding', 'noBackdrop','上传中...');

          $cordovaFileTransfer.upload(this.getBaseUrl() + 'api/HdFiles', src, options).then(function (re) {
            //console.log("success");
            if (onSuccess) onSuccess(re);
          }, function (err) {
            //console.log("fail");
            //console.log(JSON.stringify(err));
            Tips.showTips("失败了...");
            if (onFailed) onFailed(err);
          }, function (err) {
            $scope.$emit('loadding', 'false');
            if (onFinal) onFinal(err);
          });
        },

        getBaseUrl:getBaseUrl
      };
    }]);
});
