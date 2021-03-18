import { HttpClient, json } from "aurelia-fetch-client";

export class AssetService {
  static inject = [HttpClient];
  constructor(private http: HttpClient) {
    http.configure((config) => {
      config
        .useStandardConfiguration()
        .withBaseUrl("http://localhost:5000/api");
    });
    this.http = http;
  }
  addAsset(asset): Promise<any> {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(asset),
    };
    return this.http.fetch("/asset", config).then((res) => res.json());
  }
  getAssets(page: number): Promise<any> {
    return this.http
      .fetch(`/asset?pageNumber=${page}&perPage=6`)
      .then((res) => res.json());
  }
  async updateAsset(asset): Promise<any> {
    const id: number = asset.id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(asset),
    };
    try {
      const response = await this.http.fetch(`/asset/${id}`, config);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
  async deleteAsset(id: number): Promise<unknown> {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    };
    try {
      const response = await this.http.fetch(`/asset/${id}`, config);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
}
