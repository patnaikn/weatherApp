import { Component, OnInit } from '@angular/core';
import {PassdataService} from "../passdata.service";
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  weatherData: any;
  indexValue: any;
  public lineChartData:Array<any> = [] ;
  public lineChartLabels:Array<any> = [] ;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(public passData: PassdataService, location: PlatformLocation) {
    this.weatherData = this.passData.serviceData.weatherData;
    this.indexValue = this.passData.serviceData.indexValue;
    this.setChartData(this.weatherData,this.lineChartData,this.lineChartLabels);
    history.pushState({title: 'chartdata', data: this.weatherData,  url:window.location.href}, document.title, window.location.href);
  }

  ngOnInit() {

  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public setChartData(weatherData, chartData, chartLabels){
    var indexValue = this.indexValue;
    var arr = weatherData.weather[indexValue].hourly;
    var labelData = [];
    for(var i= 0; i < arr.length; i++ ){
      chartLabels.push(arr[i].time);
      labelData.push(arr[i].tempC);
    }
    var dataObj = {
      data: labelData,
      label: "Temperature"
    };
    chartData.push(dataObj);
  }

}


