define(['app'], function(app){
    app
      .config(['$ionicConfigProvider','$sceDelegateProvider', function($ionicConfigProvider,$sceDelegateProvider) {
          $ionicConfigProvider.tabs.position('bottom'); // other values: top
          $ionicConfigProvider.platform.android.views.maxCache(5); //安卓缓存5个view，ios默认10个
          $ionicConfigProvider.tabs.style('standard');

          $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://srv*.assets.example.com/**'
          ]);

            window.APP = {
                baseUrl:'http://nysh.kimnsoft.com/'
            }
      }])
      .run(function ($ionicPlatform, $rootScope, $ionicLoading) {

            //注册loadding
            function showLoadding(noBackdrop,content) {
                var tpl = '<div class="spinner"><div class="spinner-container container1"><div class="circle1"></div>'+
                    '<div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>'+
                    '<div class="spinner-container container2"><div class="circle1"></div><div class="circle2">'+
                    '</div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3">'+
                    '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4">'+
                    '</div></div></div>';
                if(content) {
                    tpl += ('<div class="row">'+ content +'</div>')
                }
                $ionicLoading.show({
                    noBackdrop:noBackdrop,
                    template: tpl
                });
            }
            $rootScope.$on('loadding',function(child,flag,content) {
                if(flag == 'false') {
                    $ionicLoading.hide();
                } else if( flag == 'noBackdrop') {
                    showLoadding(true,content);
                } else {
                    showLoadding(false,content)
                }
            })


            $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleLightContent();
            }
          });


        });
});
