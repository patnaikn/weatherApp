import { Component, OnInit } from '@angular/core';
import {PassdataService} from "../passdata.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  weatherData: any;
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

  constructor(public passData: PassdataService) {
    this.weatherData = this.passData.serviceData;
    this.setChartData(this.weatherData,this.lineChartData,this.lineChartLabels);
  }

  ngOnInit() {
    history.pushState(this.weatherData, null, window.location.href);
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public setChartData(weatherData, chartData, chartLabels){
    var indexValue = this.weatherData.indexValue;
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


