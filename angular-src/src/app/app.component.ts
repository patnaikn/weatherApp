import { Component } from '@angular/core';
import {GetWeatherInfoService} from "./get-weather-info.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style.less']
})
export class AppComponent {
  title = 'Weather Application';
  // options :
  //my_city: String = "Washington,USA";
  location: String;
  my_key: String;
  no_of_days: Number;
// build URI:
  //uri ="http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+this.my_city+"&key="+this.my_key+"&format=json&no_of_days="+this.no_of_days+"&includeLocation=yes";
// uri-encode it to prevent errors :
  //baseUrl = encodeURI(this.uri);

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

  onSubmitingLocation(){
    this.my_key = "f7b2171a5b7849cab85123255170311";
    this.no_of_days = 5 ;
// build URI:
    var uri ="http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+this.location+"&key="+this.my_key+"&format=json&no_of_days="+this.no_of_days+"&includeLocation=yes";
// uri-encode it to prevent errors :
    var baseUrl = encodeURI(uri);
    this.showWeatherInfo(baseUrl);

  }

  showWeatherInfo(url){
    this.getInfoService.getWeatherInfo(url).subscribe(result => {
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
