import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  getCityInfo(cityName) {
      let unsplash_key = 'a59295a3a8ec2c4281ecaa30a8c33e1984fe47958c4339ca4efa07db3b814d7b';
      let api_url = 'https://api.unsplash.com/photos/random?query=' + cityName + '&client_id=' + unsplash_key + '&w=600&h=500';
      return this._http.get(api_url).map(data=>data.json()).toPromise()
  }

  getCityWeather(cityName) {
      let openweathermap_key = 'ce104c951db38a3f82beb2da5551180b';
      let api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + openweathermap_key;
      return this._http.get(api_url).map(data=>data.json()).toPromise()
  }
}
