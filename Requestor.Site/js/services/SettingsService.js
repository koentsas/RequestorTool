Requestor.service('SettingsService', function (PersistenceService) {
    this.settings = {
        maxNumberOfRequestsInHistory: 15,
        maxNumberOfHistoryRequestsShown: 5,
        baseUrl: "https://"
    }

    this.persistSettings = function persist() {
        PersistenceService.setTable("Settings", [this.settings]);
        this.getSettings();
    };

    this.getSettings = function updateSettings() {
        var settingsArr = PersistenceService.getTable("Settings");
        if (settingsArr[0]) {
            var settings = settingsArr[0];
            angular.copy(settings, this.settings);
        }
    };

    this.getSettings();
});