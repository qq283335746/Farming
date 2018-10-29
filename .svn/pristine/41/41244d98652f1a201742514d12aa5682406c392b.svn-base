define(['app', 'js/utils/tips'],function (app, Tips) {
    app.controller('priceCtrl', ['$rootScope', '$scope', '$ionicHistory', '$ionicModal', 'Storage', '$state', 'httpRequest', function ($rootScope, $scope, $ionicHistory, $ionicModal, Storage, $state, httpRequest) {

        $scope.$on('$ionicView.enter', function () {
            $scope.getListCategory();
        });

        $ionicModal.fromTemplateUrl('templates/DlgYear.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.DlgYearModal = modal;
        });
        $scope.onCloseDlgYear = function () {
            $scope.DlgYearModal.hide();
        };
        $ionicModal.fromTemplateUrl('templates/DlgPriceSubCategory.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.DlgDlgPriceSubCategoryModal = modal;
        });
        $scope.onCloseDlgPriceSubCategory = function () {
            $scope.DlgDlgPriceSubCategoryModal.hide();
        };

        $scope.btnTabIndex = 0;
        $scope.ListCategory = [];
        $scope.ListSubCategory = [];
        $scope.ListPrice = [];
        $scope.ListYear = Common.GetListYear();

        $scope.ModelData = { "Year": "" + $scope.ListYear[0].Year + "", "SubCategoryName": "选择类别" };

        $scope.onTabSelected = function (index) {
            $scope.btnTabIndex = index;
            $scope.ModelData.SubCategoryId = null;
            $scope.getCategoryByParentId($scope.ListCategory[index].Id);
        };

        $scope.getListCategory = function () {
            httpRequest.getWithUI($scope, 'api/price/getbigcates', {}, function (result) {
                //console.log('api/price/getbigcates--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ListCategory = result.data.ResultObj;
                    var categoryId = $scope.ListCategory[0].Id;
                    //console.log('categoryId--' + categoryId);
                    $scope.getCategoryByParentId(categoryId);
                }
                else {
                    Tips.showTips(result.data.Message);
                }
            })
        };

        $scope.getCategoryByParentId = function (parentId) {
            httpRequest.getWithUI($scope, 'api/price/getsmallcates', { pid: parentId }, function (result) {
                //console.log('api/price/getsmallcates' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    $scope.ListSubCategory = result.data.ResultObj;
                    if (!$scope.ModelData.SubCategoryId) {
                        $scope.ModelData.SubCategoryId = $scope.ListSubCategory[0].Id;
                        $scope.ModelData.SubCategoryName = $scope.ListSubCategory[0].SName;
                    }
                    $scope.getListPrice(parentId);
                }
                else {
                    Tips.showTips(result.data.Message);
                }
            })
        };

        $scope.getListPrice = function (categoryId) {
            var parms = { bid: categoryId, year: $scope.ModelData.Year };
            $scope.ModelData.SubCategoryId ? parms.sid = $scope.ModelData.SubCategoryId : '';

            //console.log('getprices--parms--' + JSON.stringify(parms));
            httpRequest.getWithUI($scope, 'api/price/getprices', parms, function (result) {
                //console.log('api/price/getprices--' + JSON.stringify(result));
                if (result.data.Message == "OK") {
                    var jData = result.data.ResultObj;
                    var sX = [];
                    var sY = [];
                    for (var i = 0; i < jData.length; i++) {
                        sX = sX.concat(jData[i].Month);
                        sY = sY.concat(jData[i].Price);
                    }
                    var xAxis = eval('[' + sX + ']');
                    var yAxis = eval('[' + sY + ']');

                    $scope.chartConfig = {
                        options: {
                            //This is the Main Highcharts chart config. Any Highchart options are valid here.
                            //will be overriden by values specified below.
                            chart: {
                                type: 'areaspline'
                            },
                            tooltip: {
                            },
                            legend: {
                                enabled: false
                            }
                        },
                        //The below properties are watched separately for changes.

                        //Series object (optional) - a list of series using normal Highcharts series options.
                        series: [{
                            name:'',
                            data: yAxis
                        }],
                        //Title configuration (optional)
                        title: {
                            text: ''
                        },
                        //Boolean to control showing loading status on chart (optional)
                        //Could be a string if you want to show specific loading text.
                        loading: false,
                        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                        //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
                        xAxis: {
                            title: {
                                text: ''
                            },
                            labels: {
                                formatter: function () {
                                    return this.value+'月'; // clean, unformatted number for year
                                }
                            },
                            categories: xAxis
                            //plotBands: [{ // visualize the weekend
                            //    from: 0,
                            //    to: 19
                            //}]
                        },
                        yAxis: {
                            title: {
                                text: '',
                            }
                        },
                        //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
                        useHighStocks: false,
                        //size (optional) if left out the chart will default to size of the div or something sensible.
                        size: {
                            width: $rootScope.WinWidth - 10,
                            height: 300
                        },
                        //function (optional)
                        func: function (chart) {
                            //setup some logic for the chart
                        }
                    };
                }
                else {
                    Tips.showTips(result.data.Message);
                }
            })
        };

        $scope.onYearChanged = function () {
            $scope.DlgYearModal.show();
        };

        $scope.onSubCategoryChanged = function () {
            $scope.DlgDlgPriceSubCategoryModal.show();
        };

        $scope.onSelectYear = function (item) {
            $scope.ModelData.Year = item.Year;
            $scope.onCloseDlgYear();
            $scope.getListPrice($scope.ListCategory[$scope.btnTabIndex].Id);
        };

        $scope.onSelectSubCategory = function (item) {
            $scope.ModelData.SubCategoryName = item.SName;
            $scope.ModelData.SubCategoryId = item.Id;
            $scope.onCloseDlgPriceSubCategory();
            $scope.getListPrice($scope.ListCategory[$scope.btnTabIndex].Id);
        };
    }]);
   
});