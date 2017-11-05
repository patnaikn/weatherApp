/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetWeatherInfoService } from './get-weather-info.service';

describe('GetWeatherInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetWeatherInfoService]
    });
  });

  it('should ...', inject([GetWeatherInfoService], (service: GetWeatherInfoService) => {
    expect(service).toBeTruthy();
  }));
});
