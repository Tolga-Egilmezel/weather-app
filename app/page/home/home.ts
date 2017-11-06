import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiServ } from '../../service/index'; // API Service
import * as GlobalVariable from '../../global/globals'; // Global Variable
import * as _ from 'lodash';

/*

Home Component
==========

ngInit: call loadCitys function
loadCitys: Get cities forecast from api service
generateData: When get api callback it's generate simple data for view
*/

@Component({
  selector: 'div[outline][home]',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.html',
  providers: [
    ApiServ
  ],
})

export class HomePageComp implements OnInit {
  localLoader: boolean = false;
  cities: any = [];
  options: any = {
    cities: GlobalVariable.options.cities,
    units: GlobalVariable.options.units,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServ,
  ) {}

  loadCitys() {
    let cities = this.options.cities.join(',');
    this.localLoader = true;
    this.apiService.getMultiForecasts(`id=${cities}&units=${this.options.units}`)
      .subscribe( resultWeatherData => {
        this.cities = this.generateData(resultWeatherData.list);
      })
  }

  generateData(result) {
    let view = this;
    let data = result.map(function(city) {
      let json = {
        id: city.id,
        name: city.name,
        temp: (Math.round(city.main.temp) || '-'),
        condition: _.has(city, 'weather') ? (city.weather[0].main) : '-',
        description: _.has(city, 'weather') ? (city.weather[0].description) : '',
        humidity: city.main.humidity,
        wind: city.wind.speed,
      }
      return json;
    })
    return data;
  }

  ngOnInit() {
    this.loadCitys();
  }
}
