Requestor.service('PersistenceService', function () {
    var getStorageTableName = function getStorageKey(tableName) {
        return "Requestor." + tableName;
    };

    this.addToTable = function addToStorage(tableName, obj) {
        var tableArr = this.getTable(tableName);
        tableArr.push(obj);
        this.setTable(tableName, tableArr);
    };

    this.removeFromTable = function removeFromStorage(tableName, obj) {
        var tableArr = this.getTable(tableName);
        var toRemove = _.findWhere(tableArr, obj);
        var index = tableArr.indexOf(toRemove);
        if (index > -1) {
            tableArr.splice(index, 1);
        }
        this.setTable(tableName, tableArr);
    };

    this.getTable = function getTable(tableName) {
        var tableStr = localStorage.getItem(getStorageTableName(tableName));
        var tableArr;
        if (!tableStr) {
            return [];
        }
        try {
            tableArr = JSON.parse(tableStr);
        } catch (e) { }
        return tableArr;
    };

    this.setTable = function setTable(tableName, array) {
        localStorage.setItem(getStorageTableName(tableName), angular.toJson(array));
    };

    this.clearTable = function clearTable(tableName) {
        localStorage.removeItem(getStorageTableName(tableName));
    };
});