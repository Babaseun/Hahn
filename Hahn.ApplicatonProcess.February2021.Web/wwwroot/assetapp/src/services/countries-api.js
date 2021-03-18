import { HttpClient } from "aurelia-fetch-client";
var CountryService = (function () {
    function CountryService(http) {
        this.http = http;
        this.http = http;
    }
    CountryService.prototype.getCountries = function () {
        return this.http
            .fetch("https://restcountries.eu/rest/v2/")
            .then(function (response) { return response.json(); })
            .then(function (data) { return data; });
    };
    CountryService.inject = [HttpClient];
    return CountryService;
}());
export { CountryService };
//# sourceMappingURL=countries-api.js.map