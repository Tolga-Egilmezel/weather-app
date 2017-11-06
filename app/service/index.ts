import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/*

API Service
===========

All api services

getMultiForecasts: Get Multiple city forecast details
params: id=1,2,3,4,5

getForecast: Get Single City forecast details
params: id=1

getCityImage: Get selected city image (random) from unsplash api.
param: City Name
*/
@Injectable()
export class ApiServ {
  private api_url: string = "http://api.openweathermap.org/data";
  private api_version: string = "2.5";
  private api_key: string = "7ca5e93aa9611423e024f131213eeff6";

  constructor(
    public http: Http,

  ) {}

  getMultiForecasts(param) {
    return this.http.get(`${this.api_url}/${this.api_version}/group?appid=${this.api_key}&${param}`)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getForecast(param) {
    return this.http.get(`${this.api_url}/${this.api_version}/forecast?appid=${this.api_key}&${param}`)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getCityImage(city) {
    return this.http.get(`https://api.unsplash.com/photos/random?client_id=8eee369aa21f6396d833f8d95e58259340d376d904884b19f97da3511d3ef094&query=${city}`)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response){
    console.error(error);
    return Observable.throw(error || "Server Error");
  }
}
