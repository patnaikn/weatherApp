import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import {RouterModule,Routes} from "@angular/router";

import { AppComponent } from './app.component';
import {GetWeatherInfoService} from "./get-weather-info.service";
import {PassdataService} from "./passdata.service";
import { LineChartComponent } from './line-chart/line-chart.component';
import { WeatherdetailComponent } from './weatherdetail/weatherdetail.component';

const appRoutes: Routes = [{path:'showDetail', component: WeatherdetailComponent},{path:'showChart', component: LineChartComponent}];

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    WeatherdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GetWeatherInfoService, PassdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
