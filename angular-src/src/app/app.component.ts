import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {GetWeatherInfoService} from "./get-weather-info.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style.less']
})
export class AppComponent {
  title = 'Weather Application';
  // options :
  location: String;
  my_key: String;
  no_of_days: Number;

  weatherInfo = {
    nearestArea: '',
    country: '',
    weather: null,
    current_temp: null,
    current_time: '',
    current_condition: '',
    hourly: null,
    max_temp: null,
    min_temp: null,
    humidity: null,
    precipitation: null,
    pressure: null,
    wind_speed_kmph: null,
    wind_dir: ''
  };

  backgroundUrl : any;
  iconSrc: any;
  infoText: String;

  constructor(private getInfoService : GetWeatherInfoService, private _sanitizer: DomSanitizer) { }

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
    this.weatherInfo.current_time = weatherInfo.current_condition[0].observation_time;
    this.weatherInfo.current_condition=weatherInfo.current_condition[0].weatherDesc[0].value;

    //weather on hourly basis
    this.weatherInfo.hourly     =weatherInfo.weather[0].hourly;

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

    this.changeBackGround(this.weatherInfo.current_time,this.weatherInfo.current_condition);
    this.setWeatherIconUrl(this.weatherInfo.hourly);
  }

  setWeatherIconUrl(hourly){
    for (var i = 0; i < hourly.length; i++){
      this.iconSrc = hourly[i].weatherIconUrl[0].value;
      this.iconSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.iconSrc);
      this.infoText = hourly[i].weatherDesc[0].value;
    }
  }

  changeBackGround(currrentTime,condition){
    var hour= currrentTime.toString("hh:mm tt").substring(0,2);
    hour = Number(hour);
    var flag= currrentTime.toString("hh:mm tt").substring(6);
    if ((hour >= 5 && hour <= 9) && flag === 'AM') {
      this.backgroundUrl = 'https://picoolio.net/images/2017/05/21/03fff34.jpg';
    } else if((hour > 9 && hour < 12) && flag === 'AM') {
      this.backgroundUrl = 'https://picoolio.net/images/2017/05/21/01f54bc.png';
    } else if ((hour >= 1 && hour <= 5 ) && flag === 'PM') {
      this.backgroundUrl = 'https://picoolio.net/images/2017/05/21/05393b0.jpg';
    } else if ((hour >= 6 && hour <= 11 ) && flag === 'PM') {
      this.backgroundUrl = 'https://picoolio.net/images/2017/05/21/021d3bf.jpg';
    } else if(condition.toLowerCase().indexOf('rain') > -1){
      this.backgroundUrl = 'https://picoolio.net/images/2017/05/21/0445513.jpg';
    } else if(condition.toLowerCase().indexOf('snow') > -1){
      this.backgroundUrl = 'https://picoolio.net/images/2017/05/21/06dfa8c.jpg';
    }
    this.backgroundUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this.backgroundUrl})`);
  }
}
