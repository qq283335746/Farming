define(['app'], function (app) {
    app
        .config(function ($stateProvider, $urlRouterProvider) {
            // Override the internal 'views' builder with a function that takes the state
            // definition, and a reference to the internal function being overridden:
            $stateProvider.decorator('views', function (state, parent) {
                var result = {}, views = parent(state);
                //var head = "http://192.168.1.48:8081/kangbaomu/doctor/www/";
                var head = "";
                angular.forEach(views, function (config, name) {
                    config.controllerUrl = head + config.controllerUrl;
                    config.templateUrl = head + config.templateUrl;
                    result[name] = config;
                });
                return result;
            });

            $stateProvider
                // index
                .state('index', {
                    url: '/index',
                    templateUrl: "templates/index.html",
                    controller: "indexCtrl",
                    controllerUrl: 'js/controllers/index.js'
                })

                // 登录
                .state('login', {
                    url: '/login',
                    templateUrl: "templates/login.html",
                    controller: "loginCtrl",
                    controllerUrl: 'js/controllers/login.js'
                })

                // 注册
                .state('register', {
                    url: '/register',
                    templateUrl: "templates/register.html",
                    controllerUrl: 'js/controllers/register.js',
                    controller: "registerCtrl"
                })

                // 找回密码
                .state('findpsw', {
                    url: '/findpsw',
                    templateUrl: "templates/findpsw.html",
                    controllerUrl: 'js/controllers/findpsw.js',
                    controller: "findpswCtrl"
                })

                // 通用信息内容页
                .state('content-mine', {
                    url: '/content-mine/:type',
                    templateUrl: "templates/content-mine.html",
                    controller: "content-mineCtrl",
                    controllerUrl: 'js/controllers/content-mine.js'
                })

                // 文章详情通用页面
                .state('article', {
                    url: '/article/:Id',
                    templateUrl: "templates/article.html",
                    controller: "articleCtrl",
                    controllerUrl: 'js/controllers/article.js'
                })

                // setup an abstract state for the tabs directive
                .state('tab', {
                    url: '/tab',
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })

                // 首页
                .state('tab.home', {
                    url: '/home',
                    views: {
                        'tab-home': {
                            templateUrl: 'templates/home.html',
                            controller: 'homeCtrl',
                            controllerUrl: 'js/controllers/home.js'
                        }
                    }
                })

                //消息更多列表
                .state('msgList', {
                    url: '/msgList/:id',
                    templateUrl: "templates/msgList.html",
                    controller: "msgListCtrl",
                    controllerUrl: 'js/controllers/msgList.js'
                })

                    // 农机技术指导
                    .state('farmList', {
                        url: '/farmList/:id',
                        templateUrl: "templates/navigatelist.html",
                        controller: "farmListCtrl",
                        controllerUrl: 'js/controllers/farmList.js'
                    })

                // 地图
                .state('map', {
                    url: '/map',
                    templateUrl: "templates/map.html",
                    controller: "mapCtrl",
                    controllerUrl: 'js/controllers/map.js'
                })
                .state('MapView', {
                    url: '/MapView/:lnglat/:address',
                    templateUrl: "templates/MapView.html",
                    controller: "MapViewCtrl",
                    controllerUrl: 'js/controllers/MapView.js'
                })

                    // 农机租赁
                    .state('rent', {
                        url: '/rent/:type',
                        templateUrl: "templates/rent.html",
                        controller: "rentCtrl",
                        controllerUrl: 'js/controllers/rent.js'
                    })

                    // 发布农机
                    .state('rentPush', {
                        url: '/rentPush',
                        templateUrl: "templates/rentPush.html",
                        controller: "rentPushCtrl",
                        controllerUrl: 'js/controllers/rentPush.js'
                    })

                    // 详情
                    .state('product', {
                        url: '/product/:id',
                        templateUrl: "templates/product.html",
                        controller: "productCtrl",
                        controllerUrl: 'js/controllers/product.js'
                    })
                    //农机求租 地图
                    .state('LeaseMap', {
                        url: '/LeaseMap',
                        templateUrl: "templates/LeaseMap.html",
                        controller: "LeaseMapCtrl",
                        controllerUrl: 'js/controllers/LeaseMap.js'
                    })
                    //农机求租 查看详情
                    .state('ShowSingleLease', {
                        url: '/ShowSingleLease/:Id',
                        templateUrl: "templates/ShowSingleLease.html",
                        controller: "ShowSingleLeaseCtrl",
                        controllerUrl: 'js/controllers/ShowSingleLease.js'
                    })
                    // 农机求租
                    .state('rentOut', {
                        url: '/rentOut/:type',
                        templateUrl: "templates/rentOut.html",
                        controller: "rentOutCtrl",
                        controllerUrl: 'js/controllers/rentOut.js'
                    })
                    // 求租农机
                    .state('rentOutPush', {
                        url: '/rentOutPush',
                        templateUrl: "templates/rentOutPush.html",
                        controller: "rentOutPushCtrl",
                        controllerUrl: 'js/controllers/rentOutPush.js'
                    })

                    // 价格行情
                    .state('price', {
                        url: '/price',
                        templateUrl: "templates/price.html",
                        controller: "priceCtrl",
                        controllerUrl: 'js/controllers/price.js'
                    })
                    //农机管理
                    .state('tab.property', {
                        url: '/property',
                        views: {
                            'tab-home': {
                                templateUrl: 'templates/property.html',
                                controller: 'propertyCtrl',
                                controllerUrl: 'js/controllers/property.js'
                            }
                        }
                    })
                    //// 农资团购
                    //.state('property', {
                    //    url: '/property',
                    //    templateUrl: "templates/property.html",
                    //    controller: "propertyCtrl",
                    //    controllerUrl: 'js/controllers/property.js'
                    //})
                    // 风采展示
                    .state('graceful', {
                        url: '/graceful',
                        templateUrl: "templates/graceful.html",
                        controller: "gracefulCtrl",
                        controllerUrl: 'js/controllers/graceful.js'
                    })

                // 导航页
                .state('tab.navigate', {
                    url: '/navigate',
                    views: {
                        'tab-navigate': {
                            templateUrl: 'templates/navigate.html',
                            controller: 'navigateCtrl',
                            controllerUrl: 'js/controllers/navigate.js'
                        }
                    }
                })
                    // 导航列表页
                    .state('tab.navigatelist', {
                        url: '/navigatelist/:id',
                        views: {
                            'tab-navigate': {
                                templateUrl: 'templates/navigatelist.html',
                                controller: 'navigatelistCtrl',
                                controllerUrl: 'js/controllers/navigatelist.js'
                            }
                        }
                    })



                // 专家会诊
                .state('professor', {
                    url: '/professor',
                    templateUrl: 'templates/professor.html',
                    controller: 'professorCtrl',
                    controllerUrl: 'js/controllers/professor.js'
                })
                // 有问必答
                .state('AddExpertQuestion', {
                    url: '/AddExpertQuestion/:Id',
                    templateUrl: 'templates/AddExpertQuestion.html',
                    controller: 'AddExpertQuestionCtrl',
                    controllerUrl: 'js/controllers/AddExpertQuestion.js'
                })
                //.state('tab.professor', {
                //    url: '/professor',
                //    views: {
                //        'tab-professor': {
                //            templateUrl: 'templates/professor.html',
                //            controller: 'professorCtrl',
                //            controllerUrl: 'js/controllers/professor.js'
                //        }
                //    }
                //})

                // 问题上报
                .state('question', {
                    url: '/question',
                    templateUrl: 'templates/question.html',
                    controller: 'questionCtrl',
                    controllerUrl: 'js/controllers/question.js'
                })

                 // 每日签到
                    .state('tab.DailySign', {
                        url: '/DailySign',
                        views: {
                            'tab-DailySign': {
                                templateUrl: "templates/DailySign.html",
                                controller: "DailySignCtrl",
                                controllerUrl: 'js/controllers/DailySign.js'
                            }
                        }
                    })

                //青年之声
                .state('tab.YouthVoice', {
                    url: '/YouthVoice',
                    views: {
                        'tab-YouthVoice': {
                            templateUrl: "templates/YouthVoice.html",
                            controller: "YouthVoiceCtrl",
                            controllerUrl: 'js/controllers/YouthVoice.js'
                        }
                    }
                })
                //青年之声 发表
                .state('tab.AddYouthVoice', {
                    url: '/AddYouthVoice',
                    views: {
                        'tab-YouthVoice': {
                            templateUrl: "templates/AddYouthVoice.html",
                            controller: "AddYouthVoiceCtrl",
                            controllerUrl: 'js/controllers/AddYouthVoice.js'
                        }
                    }
                })

                // 我的
                .state('tab.mine', {
                    url: '/mine',
                    views: {
                        'tab-mine': {
                            templateUrl: 'templates/mine.html',
                            controller: 'mineCtrl',
                            controllerUrl: 'js/controllers/mine.js'
                        }
                    }
                })
                    // 个人信息页面
                    .state('tab.personal', {
                        url: '/personal',
                        views: {
                            'tab-mine': {
                                templateUrl: 'templates/personal.html',
                                controller: 'personalCtrl',
                                controllerUrl: 'js/controllers/personal.js'
                            }
                        }
                    })
                    // 个人问题页面
                    .state('tab.mineQuestion', {
                        url: '/mineQuestion/:id',
                        views: {
                            'tab-mine': {
                                templateUrl: 'templates/mineQuestion.html',
                                controller: 'mineQuestionCtrl',
                                controllerUrl: 'js/controllers/mineQuestion.js'
                            }
                        }
                    })
                        // 个人问题页面
                        .state('tab.mineQuestionDetail', {
                            url: '/mineQuestionDetail/:id/:roleType',
                            views: {
                                'tab-mine': {
                                    templateUrl: 'templates/mineQuestionDetail.html',
                                    controller: 'mineQuestionDetailCtrl',
                                    controllerUrl: 'js/controllers/mineQuestionDetail.js'
                                }
                            }
                        })
                    // 个人评论页面
                    .state('tab.mineAdvice', {
                        url: '/mineAdvice/:id',
                        views: {
                            'tab-mine': {
                                templateUrl: 'templates/mineAdvice.html',
                                controller: 'mineAdviceCtrl',
                                controllerUrl: 'js/controllers/mineAdvice.js'
                            }
                        }
                    })

                // 设置页面
                .state('tab.set', {
                    url: '/set',
                    views: {
                        'tab-mine': {
                            templateUrl: 'templates/set.html',
                            controller: 'setCtrl',
                            controllerUrl: 'js/controllers/set.js'
                        }
                    }
                })
                    .state('tab.callback', {
                        url: '/callback',
                        views: {
                            'tab-mine': {
                                templateUrl: 'templates/callback.html',
                                controller: 'callbackCtrl',
                                controllerUrl: 'js/controllers/callback.js'
                            }
                        }
                    });

            $urlRouterProvider.otherwise("/tab/home");

        });
});