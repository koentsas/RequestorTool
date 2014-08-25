Requestor.controller('mainController', ['$scope', 'SettingsService', function ($scope, SettingsService) {
    $scope.importExportVersion = 1;
    $scope.settings = SettingsService.settings;
    $scope.methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
    $scope.responses = [
        { status: 200, message: 'OK' },
        { status: 400, message: 'Bad request' },
        { status: 401, message: 'Unauthorized' },
        { status: 403, message: 'Forbidden' },
        { status: 404, message: 'Not found' },
        { status: 405, message: 'Method not allowed' },
        { status: 500, message: 'Internal server error' }
    ];

    $scope.htmlHeaders = [
        'Accept',
        'Accept-Charset',
        'Accept-Datetime',
        'Accept-Encoding',
        'Accept-Language',
        'Authorization',
        'Cache-Control',
        'Connection',
        'Content-Length',
        'Content-MD5',
        'Content-Type',
        'Cookie',
        'Date',
        'Expect',
        'From',
        'Host',
        'If-Match',
        'If-Modified-Since',
        'If-None-Match',
        'If-Range',
        'If-Unmodified-Since',
        'Max-Forwards',
        'Origin',
        'Pragma',
        'Proxy-Authorization',
        'Range',
        'Referer[sic]',
        'TE',
        'Upgrade',
        'User-Agent',
        'Via',
        'Warning'
    ];

    $scope.isEmptyObject = function isEmptyObject(obj) {
        return Object.getOwnPropertyNames(obj).length;
    };

    $scope.isLocalStoragePossible = function isLocalStoragePossible() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };
}]);