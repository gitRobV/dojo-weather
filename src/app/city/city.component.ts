import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    selected_city: string;
    city_img: string;
    city_weather = {
        temp_avg: 0,
        temp_min: 0,
        temp_max: 0,
        humidity: 0,
        status: ''
    }


    constructor(private _route: ActivatedRoute, private _httpService: HttpService) {

    }

    kelvinToFarenheit(kelvin){
        let f_temp = Math.floor(kelvin * (9/5) - 459.67);
        return f_temp;
    }

    extractInfo(OWM_response) {
        this.city_weather.temp_avg = this.kelvinToFarenheit(OWM_response.main.temp);
        this.city_weather.temp_min = this.kelvinToFarenheit(OWM_response.main.temp_min);
        this.city_weather.temp_max = this.kelvinToFarenheit(OWM_response.main.temp_max);
        this.city_weather.humidity = OWM_response.main.humidity;
        this.city_weather.status = OWM_response.weather[0].description;
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
          this.selected_city = params.city;
          // Call http Service to get image from unsplash for selected_city
          this._httpService.getCityInfo(this.selected_city)
          .then(response => this.city_img = 'url("' + response.urls.custom + '")')
          .catch(err => console.log(err));
          // Call http Service to get Weather information from Open Weather Map for selected_city
          this._httpService.getCityWeather(this.selected_city)
          .then(response => this.extractInfo(response))
          .catch(err => console.log(err));
        });
    }
}
