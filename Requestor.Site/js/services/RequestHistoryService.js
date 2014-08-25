Requestor.service('RequestHistoryService', function (PersistenceService, SettingsService) {
    this.requestHistory = [];

    this.persistRequestToHistory = function persistRequestToHistory(requestConfig) {
        var arr = PersistenceService.getTable("RequestHistory");
        arr.push(requestConfig);

        while (arr.length > SettingsService.settings.maxNumberOfRequestsInHistory) {
            arr.shift();
        }
        PersistenceService.setTable("RequestHistory", arr);
        this.updateRequestHistory();
    };

    this.updateRequestHistory = function updateRequestHistory() {
        var arr = PersistenceService.getTable("RequestHistory");
        while (this.requestHistory.length > 0) {
            this.requestHistory.pop();
        }
        this.requestHistory.push.apply(this.requestHistory, arr.slice(Math.max(arr.length - SettingsService.settings.maxNumberOfHistoryRequestsShown, 0)));
    };

    this.clearHistory = function clearHistory() {
        PersistenceService.clearTable("RequestHistory");
        this.updateRequestHistory();
    };

    this.getHistory = function getHistory() {
        return PersistenceService.getTable("RequestHistory");
    };

    this.updateRequestHistory();
});