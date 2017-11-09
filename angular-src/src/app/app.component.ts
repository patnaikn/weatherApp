import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {GetWeatherInfoService} from "./get-weather-info.service";
import {PassdataService} from "./passdata.service";
import { Router } from '@angular/router';

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
  subCardBackgroundUrl: any;
  iconSrc: any;
  infoText: String;

  constructor(private getInfoService : GetWeatherInfoService, private _sanitizer: DomSanitizer,
              private router: Router, public passDataService: PassdataService) { }

  ngOnInit() {
     this.hideLocationLabel();
  }

  onSubmitingLocation(){
    this.my_key = "f7b2171a5b7849cab85123255170311";
    this.no_of_days = 5 ;
// build URI:
    var uri ="http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+this.location+"&key="+this.my_key+"&format=json&no_of_days="+this.no_of_days+"&includeLocation=yes";
// uri-encode it to prevent errors :
    var baseUrl = encodeURI(uri);
    var headerContent = <HTMLElement>document.querySelector('.jumbotron');
    headerContent.classList.add('next-page');
    this.showLocationLabel();
    this.showWeatherInfo(baseUrl);
  }

  hideLocationLabel(){
    var locationLabel = <HTMLElement>document.querySelector('#afterSearch');
    locationLabel.style.display = "none";
  }

  showLocationLabel(){
    var locationLabel = <HTMLElement>document.querySelector('#afterSearch');
    this.location = this.location.charAt(0).toUpperCase()+this.location.slice(1);
    locationLabel.style.display = "inline-block";
  }

  showWeatherInfo(url){
    this.getInfoService.getWeatherInfo(url).subscribe(result => {
        this.setWeatherInfo(this.passDataService.serviceData);
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
    this.weatherInfo.current_condition=weatherInfo.current_condition[0];

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
    this.setWeatherIconUrl(this.weatherInfo.current_condition);
  }

  setWeatherIconUrl(currentCondition){
      this.iconSrc = currentCondition.weatherIconUrl[0].value;
      this.iconSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.iconSrc);
      this.infoText = currentCondition.weatherDesc[0].value;
  }

  changeBackGround(currrentTime,currentCondition){
    var hour= currrentTime.toString("hh:mm tt").substring(0,2);
    hour = Number(hour);
    var flag= currrentTime.toString("hh:mm tt").substring(6);
    var condition = currentCondition.weatherDesc[0].value;
    this.backgroundUrl = '../assets/images/';
    if ((hour >= 5 && hour <= 9) && flag === 'AM') {
      this.backgroundUrl += '03fff34.jpg';
    } else if((hour > 9 && hour <= 12) && flag === 'AM') {
      this.backgroundUrl += '01f54bc.png';
    } else if ((hour > 12 && hour <= 5 ) && flag === 'PM') {
      this.backgroundUrl += '05393b0.jpg';
    } else if ((hour >= 5 && hour <= 11 ) && flag === 'PM') {
      this.backgroundUrl += '021d3bf.jpg';
    } else if(condition.toLowerCase().indexOf('rain') > -1){
      this.backgroundUrl += '0445513.jpg';
    } else if(condition.toLowerCase().indexOf('snow') > -1){
      this.backgroundUrl += '06dfa8c.jpg';
    }
    this.subCardBackgroundUrl = '../assets/images/wvNCf.png';
    this.subCardBackgroundUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this.subCardBackgroundUrl})`);
    this.backgroundUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this.backgroundUrl})`);
  }

  showWeatherChart(val){
    var mainContent = <HTMLElement>document.querySelector('.container');
    mainContent.classList.add('hide');
    this.passDataService.serviceData.indexValue = val;
    this.router.navigateByUrl('/showChart');
  }


}
