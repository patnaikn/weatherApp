import { Component } from '@angular/core';
import {GetWeatherInfoService} from "./get-weather-info.service";
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

  constructor(private getInfoService : GetWeatherInfoService,
              private router: Router) { }

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
    var headerContent = <HTMLElement>document.querySelector('.jumbotron.text-center');
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
        this.router.navigateByUrl('/showDetail');
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
