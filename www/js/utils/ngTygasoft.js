//define(['app', 'js/utils/httpRequest'], function (app) {
//  app
//    .factory('ngTygaSoft', ['httpRequest', function (httpRequest) {

//        return {
//            ValidateRuntime: function () {
//                var url = "http://my.tygaweb.com/Services/TygaSoftRunService.svc/GetRuntime";
//                var sData = '{"item":"Farming"}';

//                var errMsg = '做人要厚道，请联系天涯孤岸解锁';

//                httpRequest.post(url, sData, function (res, data) {
//                    if (parseInt(data) != 1000) {
//                        for (var i = 0; i < 3; i++) {
//                            alert(errMsg);
//                            return false;
//                        }
//                    }
//                }, function () {
//                    for (var i = 0; i < 3; i++) {
//                        alert(errMsg);
//                        return false;
//                    }
//                }, null);
//            }
//        };
//    }]);
//});