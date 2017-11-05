import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class GetWeatherInfoService {

  constructor(private http: Http) { }

  getWeatherInfo(url){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(url,{headers: headers})
      .map(res => res.json());
  }

}
