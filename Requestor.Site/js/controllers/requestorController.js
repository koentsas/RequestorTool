Requestor.controller('requestorController', ['$scope', '$sce', 'AppHttpService', 'SharedObjectsService', 'RequestHistoryService', function ($scope, $sce, AppHttpService, SharedObjectsService, RequestHistoryService) {
    $scope.requestConfig = SharedObjectsService.requestConfig;
    $scope.response;
    $scope.response_html;
    $scope.response_json;
    $scope.response_headers;
    $scope.status;
    $scope.status_message;
    $scope.json = false;
    $scope.html = false;
    $scope.moreSettings = false;
    $scope.curHeader = { name: '', value: '' };
    $scope.curParam = { name: '', value: '' };
    $scope.loading = AppHttpService.loading;

    (function InitController() {
        if (!$scope.requestConfig.method) {
            $scope.requestConfig.method = $scope.methods[0];
            $scope.requestConfig.url = $scope.settings.baseUrl;
            $scope.requestConfig.params = {};
            $scope.requestConfig.headers = {};
            $scope.requestConfig.data = '';
        }
    }());

    $scope.onHttpResponse = function onHttpResponse(data, status, headers) {
        $scope.response = data;
        $scope.response_headers = headers;
        $scope.loadHtml();
        $scope.loadJSON();
        $scope.status = status;
        var statusMessage = _.where($scope.responses, { status: $scope.status });
        if (statusMessage.length) {
            $scope.status_message = statusMessage[0].message
        } else {
            $scope.status_message = '';
        }
    };

    $scope.isSuccessStatusCode = function isSuccessStatusCode() {
        if (!$scope.status) {
            return false;
        }
        return $scope.status.toString().substring(0, 1) == '2';
    };

    $scope.makeRequest = function makeRequest() {
        $scope.status = '';
        $scope.status_message = '';
        AppHttpService.request($scope.requestConfig);
        RequestHistoryService.persistRequestToHistory($scope.requestConfig);
    };

    AppHttpService.subscribeToHttpResponses($scope.onHttpResponse);

    $scope.loadHtml = function loadHtml() {
        try {
            $scope.response_html = $sce.trustAsHtml($scope.response);
            $scope.html = true;
        }
        catch (err) {
            $scope.response_html = $sce.trustAsHtml('<p>This is not valid HTML</p>');
            $scope.html = false;
        };
    };

    $scope.loadJSON = function loadJSON() {
        try {
            $scope.response_json = angular.toJson($scope.response, true);
            $scope.response_json = $sce.trustAsHtml($scope.response_json);
            
            $scope.json = true;
        }
        catch (err) {
            $scope.response_json = 'This is not valid JSON';
            $scope.json = false;
        };
    };

    $scope.setUrl = function (url) {
        console.log(url);
    };

    $scope.addParam = function () {
        if (!$scope.curParam.name || !$scope.curParam.value) {
            return;
        }
        $scope.requestConfig.params[$scope.curParam.name] = $scope.curParam.value;

        $scope.curParam.name = '';
        $scope.curParam.value = '';
    };

    $scope.addHeader = function () {
        if (!$scope.curHeader.name || !$scope.curHeader.value) {
            return;
        }
        $scope.requestConfig.headers[$scope.curHeader.name] = $scope.curHeader.value;

        $scope.curHeader.name = '';
        $scope.curHeader.value = '';
    };

    $scope.removeParam = function (name) {
        delete $scope.requestConfig.params[name];
    };

    $scope.removeHeader = function (name) {
        delete $scope.requestConfig.headers[name];
    };
}]);