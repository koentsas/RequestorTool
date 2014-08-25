Requestor.service('RequestStorageService', function (PersistenceService) {
    this.requestStorage = [];
    this.collections = [];

    this.persistRequestToStorage = function persistRequestToStorage(collection, requestConfig) {
        if (this.collectionExists(collection)) {
            PersistenceService.addToTable("RequestStorage." + collection, requestConfig);
            this.updateRequestStorage();
        }
    };

    this.updateRequestStorage = function updateRequestStorage() {
        var collections = PersistenceService.getTable("Collections");
        var getTable = PersistenceService.getTable;

        while (this.requestStorage.length > 0) {
            this.requestStorage.pop();
        }

        var requestStorage = this.requestStorage;
        _.each(collections, function (coll) {
            var arr = getTable("RequestStorage." + coll);

            requestStorage.push({ collection: coll, requests: arr });
        });
    };

    this.addCollection = function addCollection(collectionName) {
        if (!this.collectionExists(collectionName)) {
            PersistenceService.addToTable("Collections", collectionName);
        }
        this.updateCollections();
    };

    this.addOrReplaceCollection = function (collectionName, requests) {
        PersistenceService.removeFromTable("Collections", collectionName);
        PersistenceService.addToTable("Collections", collectionName);
        PersistenceService.setTable("RequestStorage." + collectionName, requests);
        this.updateCollections();
    };

    this.removeCollection = function removeCollection(collectionName) {
        PersistenceService.removeFromTable("Collections", collectionName);
        PersistenceService.clearTable("RequestStorage." + collectionName);
        this.updateCollections();
    };

    this.removeRequestFromStorage = function removeRequestFromStorage(collectionName, req) {
        PersistenceService.removeFromTable("RequestStorage." + collectionName, { method: req.method, data: req.data, url: req.url });
        this.updateCollections();
    };

    this.getCollectionNames = function getCollectionNames() {
        return PersistenceService.getTable("Collections");
    };

    this.updateCollections = function updateCollections() {
        while (this.collections.length > 0) {
            this.collections.pop();
        }
        this.collections.push.apply(this.collections, this.getCollectionNames());
        this.updateRequestStorage();
    };

    this.collectionExists = function collectionExists(collectionName) {
        var arr = PersistenceService.getTable("Collections");
        return _.any(arr, function (coll) { return coll === collectionName; });
    };

    this.updateCollections();
});