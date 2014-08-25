Requestor.controller('exportController', ['$scope', 'PersistenceService', 'RequestHistoryService', 'RequestStorageService', function ($scope, PersistenceService, RequestHistoryService, RequestStorageService) {
    $scope.collections = RequestStorageService.requestStorage;
    $scope.collectionToExport = $scope.collections && $scope.collections[0];

    $scope.exportEverything = function () {
        var history = getHistoryExportObject();
        var collections = getCollectionsExportObject();
        var settings = getSettingsExportObject();

        var exportObj = {
            version: $scope.importExportVersion,
            scope: "Everything",
            historyObject: history,
            collectionsObject: collections,
            settingsObject: settings
        };

        createExportLink(exportObj, 'Download export file - Everything');
    };

    $scope.exportHistory = function () {
        createExportLink(getHistoryExportObject(), 'Download export file - History');
    };

    $scope.exportCollections = function () {
        createExportLink(getCollectionsExportObject(), 'Download export file - All collections');
    };

    $scope.exportSettings = function () {
        createExportLink(getSettingsExportObject(), 'Download export file - Settings');
    };

    $scope.exportCollection = function () {
        createExportLink(getCollectionExportObject($scope.collectionToExport), 'Download export file - Collection: ' + $scope.collectionToExport.collection);
    };

    var getCollectionsExportObject = function () {
        var expArr = [];
        _.each(RequestStorageService.requestStorage, function (coll) {
            expArr.push(getCollectionExportObject(coll));
        });
        return {
            version: $scope.importExportVersion,
            scope: 'Collections',
            collectionObjects: expArr
        };
    };

    var getCollectionExportObject = function (collectionObj) {
        return {
            version: $scope.importExportVersion,
            scope: 'Collection',
            collection: collectionObj
        }
    };

    var getSettingsExportObject = function () {
        return {
            version: $scope.importExportVersion,
            scope: 'Settings',
            settings: PersistenceService.getTable("Settings")
        }
    };

    var getHistoryExportObject = function () {
        return {
            version: $scope.importExportVersion,
            scope: 'History',
            history: RequestHistoryService.getHistory()
        };
    };

    var createExportLink = function (exportObj, linkText) {
        var exportLink = document.createElement('a');
        exportLink.setAttribute('href', 'data:text/json;base64,' + window.btoa(angular.toJson(exportObj)));
        exportLink.appendChild(document.createTextNode(linkText));
        var results = document.getElementById('results');

        while (results.hasChildNodes()) {
            results.removeChild(results.lastChild);
        }

        results.appendChild(exportLink);
    }
}]);