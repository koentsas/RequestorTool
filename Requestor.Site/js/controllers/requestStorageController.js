Requestor.controller('requestStorageController', ['$scope', 'RequestHistoryService', 'RequestStorageService', 'SharedObjectsService', function ($scope, RequestHistoryService, RequestStorageService, SharedObjectsService) {
    $scope.requestHistory = RequestHistoryService.requestHistory;
    $scope.requestStorage = RequestStorageService.requestStorage;
    $scope.collections = RequestStorageService.collections;
    $scope.collectionToAdd;

    var showCollections = {};

    $scope.toggleCollection = function toggleCollection(collection) {
        if (showCollections[collection] === true) {
            showCollections[collection] = false;
        } else {
            showCollections[collection] = true;
        }
        return showCollections[collection];
    }

    $scope.collectionIsShown = function collectionIsShown(collection) {
        return showCollections[collection] || false;
    }

    $scope.addToStorage = function addToStorage(collection) {
        RequestStorageService.persistRequestToStorage(collection, SharedObjectsService.requestConfig);
    };

    $scope.addCollection = function addCollection() {
        if ($scope.collectionToAdd) {
            RequestStorageService.addCollection($scope.collectionToAdd);
            $scope.collectionToAdd = '';
        }
    };

    $scope.removeCollection = function removeCollection(collection) {
        RequestStorageService.removeCollection(collection);
    };

    $scope.removeFromStorage = function removeFromStorage(collection, request) {
        RequestStorageService.removeRequestFromStorage(collection, request);
    };

    $scope.clearHistory = function clearHistory() {
        RequestHistoryService.clearHistory();
    };

    $scope.fillRequest = function fillRequest(req) {
        angular.copy(req, SharedObjectsService.requestConfig);
    };
}]);