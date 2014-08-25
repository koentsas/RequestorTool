Requestor.controller('settingsController', ['$scope', '$timeout', 'SettingsService', function ($scope, $timeout, SettingsService) {
    $scope.settings = SettingsService.settings;
    $scope.message = '';
    $scope.messageType = '';

    $scope.persistSettings = function persistSettings() {
        SettingsService.persistSettings();
        $scope.message = "";
        $scope.messageType = "";

        $timeout(setMessage, 500);
    };

    var setMessage = function () {
        $scope.message = "Settings saved.";
        $scope.messageType = "success";
    };
}]);