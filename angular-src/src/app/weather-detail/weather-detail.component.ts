import { Component, OnInit } from '@angular/core';
import {GetWeatherInfoService} from "../get-weather-info.service";
import {Weather} from "../weather";

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./style.less']
})
export class WeatherDetailComponent implements OnInit {

  // options :
  my_city: String = "Washington,USA";
  my_key: String = "f7b2171a5b7849cab85123255170311";
  no_of_days: Number = 5 ;
// build URI:
  uri ="http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+this.my_city+"&key="+this.my_key+"&format=json&no_of_days="+this.no_of_days+"&includeLocation=yes";
// uri-encode it to prevent errors :
  baseUrl = encodeURI(this.uri);

  weatherInfo = {
    nearestArea: '',
    country: '',
    weather: null,
    current_temp: null,
    current_condition: '',
    max_temp: null,
    min_temp: null,
    humidity: null,
    precipitation: null,
    pressure: null,
    wind_speed_kmph: null,
    wind_dir: ''
  };

  constructor(private getInfoService : GetWeatherInfoService) { }

  ngOnInit() {

  }

  showWeatherInfo(){
    this.getInfoService.getWeatherInfo(this.baseUrl).subscribe(result => {
      this.setWeatherInfo(result.data);
      },
      err => {
        console.log(err);
        return false;
      });
  }

  setWeatherInfo(weatherInfo){
    // Name of nearest area :
    this.weatherInfo.nearestArea    =weatherInfo.nearest_area[0].region[0].value;

    // Name of country :
    this.weatherInfo.country         =weatherInfo.nearest_area[0].country[0].value;

    this.weatherInfo.weather = weatherInfo.weather;

    // Current temperature in celsius:
    this.weatherInfo.current_temp  =weatherInfo.current_condition[0].temp_C;

    // A short description of current  weather conditions:
    this.weatherInfo.current_condition=weatherInfo.current_condition[0].weatherDesc[0].value;

    // Max/min temperature in celsius:
    this.weatherInfo.max_temp     =weatherInfo.weather[0].tempMaxC;
    this.weatherInfo.min_temp      =weatherInfo.weather[0].tempMinC;

    //Humidity in %
    this.weatherInfo.humidity        =weatherInfo.current_condition[0].humidity;

    // Precipitation in mm :
    this.weatherInfo.precipitation   =weatherInfo.current_condition[0].precipMM;

    // Pressure in millibars:
    this.weatherInfo.pressure        =weatherInfo.current_condition[0].pressure;

    // Wind speed in kmph
    this.weatherInfo.wind_speed_kmph =weatherInfo.current_condition[0].windspeedKmph;

    // Wind direction degree (0 degree corresponds with North)
    this.weatherInfo.wind_dir        =weatherInfo.current_condition[0].winddirDegree;
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

}
