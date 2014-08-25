Requestor.service('AppHttpService', function ($http) {
    var subs = [];
    this.loading = { counter: 0 };

    this.subscribeToHttpResponses = function subscribeToHttpResponses(sub) {
        subs.push(sub);
    };

    this.request = function request(config) {
        var loading = this.loading;
        loading.counter++;
        $http(config)
            .success(function (data, status, headers) {
                _.each(subs, function (sub) {
                    loading.counter--;
                    sub(data, status, headers());
                });
            })
            .error(function (data, status, headers) {
                _.each(subs, function (sub) {
                    loading.counter--;
                    var hdrs;
                    if (headers) {
                        hdrs = headers();
                    }
                    sub(data, status, hdrs);
                });
            });
    };
});