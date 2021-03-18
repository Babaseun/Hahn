import { HttpClient } from "aurelia-fetch-client";

export class CountryService {
  static inject = [HttpClient];
  constructor(private http: HttpClient) {
    this.http = http;
  }
  getCountries(): Promise<any> {
    return this.http
      .fetch("https://restcountries.eu/rest/v2/")
      .then((response) => response.json());
  }
}
