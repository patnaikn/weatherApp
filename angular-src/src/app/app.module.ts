import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import {GetWeatherInfoService} from "./get-weather-info.service";
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

const appRoutes : Routes = [
  {path:'showweather',component: WeatherDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GetWeatherInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
