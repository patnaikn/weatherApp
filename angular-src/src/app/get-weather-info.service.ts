import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import {PassdataService} from "./passdata.service";
import 'rxjs/add/operator/map';

@Injectable()
export class GetWeatherInfoService {

  constructor(private http: Http, public passDataService: PassdataService) { }

  getWeatherInfo(url){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(url,{headers: headers})
      .map(res => {
         var info = res.json();
        this.passDataService.serviceData = info.data;
        return info;

      },
        err => {
          console.log(err);
          return false;
        });
  }

}
