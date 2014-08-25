Requestor.controller('importController', ['$scope', 'PersistenceService', 'RequestHistoryService', 'RequestStorageService', function ($scope, PersistenceService, RequestHistoryService, RequestStorageService) {
    $scope.switchDictionary = {};
    $scope.importObject = { importFileString: '', importedFileObject: {} };
    $scope.message = '';
    $scope.messageType = '';

    var Init = function Init() {
        $scope.switchDictionary["Everything"] = importEverything;
        $scope.switchDictionary["History"] = importHistory;
        $scope.switchDictionary["Settings"] = importSettings;
        $scope.switchDictionary["Collections"] = importCollections;
        $scope.switchDictionary["Collection"] = importCollection;
    };

    var importEverything = function () {
        importHistory();
        importSettings();
        importCollections();

        $scope.message = "Data was imported!";
        $scope.messageType = "success";
    };
    var importHistory = function () {
        var history;
        if ($scope.importObject.importedFileObject.scope === "History") {
            history = $scope.importObject.importedFileObject.history;
        } else {
            history = $scope.importObject.importedFileObject.historyObject.history;
        }
        PersistenceService.setTable("RequestHistory", history);
    };
    var importSettings = function () {
        var settings;
        if ($scope.importObject.importedFileObject.scope === "Settings") {
            settings = $scope.importObject.importedFileObject.settings;
        } else {
            settings = $scope.importObject.importedFileObject.settingsObject.settings;
        }
        PersistenceService.setTable("Settings", settings);
    };
    var importCollections = function () {
        var collections;
        if ($scope.importObject.importedFileObject.scope === "Collections") {
            collections = $scope.importObject.importedFileObject;
        } else {
            collections = $scope.importObject.importedFileObject.collectionsObject;
        }
        for (var i = 0; i < collections.collectionObjects.length; i++) {
            var coll = collections.collectionObjects[i].collection;
            RequestStorageService.addOrReplaceCollection(coll.collection, coll.requests);
        }
    };

    var importCollection = function () {
        coll = $scope.importObject.importedFileObject.collection;
        RequestStorageService.addOrReplaceCollection(coll.collection, coll.requests);
        $scope.message = "Data was imported!";
        $scope.messageType = "success";
    };

    $scope.import = function () {
        $scope.switchDictionary[$scope.importObject.importedFileObject.scope]();
    };

    var readFile = function readFile() {
        try {
            $scope.importObject.importedFileObject = JSON.parse(this.result);
            $scope.importObject.importFileString = this.result;
            $scope.$apply();
        } catch (e) {
            $scope.message = 'Something went wrong, is this a valid file?';
            $scope.messageType = 'error';
            $scope.$apply();
        }
    };

    $scope.readFile = function () {
        $scope.overviewString = '';
        $scope.message = '';
        $scope.messageType = '';
        fileInput = document.getElementById('importFileInput');

        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = readFile;
        reader.readAsText(file);
    };

    $scope.isEverythingScope = function () {
        if ($scope.importObject) {
            return $scope.importObject.importedFileObject.scope === 'Everything';
        }
        return false;
    };

    $scope.isCollectionsScope = function () {
        if ($scope.importObject) {
            return $scope.importObject.importedFileObject.scope === 'Collections';
        }
        return false;
    };

    $scope.isCollectionScope = function () {
        if ($scope.importObject) {
            return $scope.importObject.importedFileObject.scope === 'Collection';
        }
        return false;
    };

    $scope.isHistoryScope = function () {
        if ($scope.importObject) {
            return $scope.importObject.importedFileObject.scope === 'History';
        }
        return false;
    };

    $scope.isSettingsScope = function () {
        if ($scope.importObject) {
            return $scope.importObject.importedFileObject.scope === 'Settings';
        }
        return false;
    };

    Init();
}]);