import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ApiServ } from '../../service/index'; // API Service
import * as GlobalVariable from '../../global/globals'; // Global Variable
import * as _ from 'lodash';

/*

Details Component
==========

Outlet to outlet name details
*/

@Component({
  selector: 'div[outline][details]',
  styleUrls: ['./details.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './details.html',
  providers: [
    ApiServ
  ],
})

export class DetailsPageComp implements OnInit {
  subscription: Subscription;
  private localLoader: boolean = false;
  private cityID: number = 0;
  private weekly: any = [];
  private result: any = {
    city: {
      name: '',
    }
  };
  private backgroundImage: string;
  private options: any = {
    units: GlobalVariable.options.units,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServ,
  ) {}

  loadForecast() {
    this.localLoader = true;
    this.apiService.getForecast(`id=${this.cityID}&units=${this.options.units}`)
      .subscribe( resultWeatherData => {
        this.result = resultWeatherData;
        this.weekly = this.generateData(resultWeatherData);
        this.getImage(resultWeatherData.city.name);
      });
  }

  generateData(result) {
    let view = this;

    let data =  {
      name: result.city.name,
      country: result.city.country,
      list: result.list,
    }
    return data;
  }

  getImage(city) {
    this.apiService.getCityImage(`${city}`)
      .subscribe( resultImageResult => {
        this.backgroundImage = resultImageResult.urls.regular || "https://images.unsplash.com/photo-1500487003906-9baadc8d610d?auto=format&fit=crop&w=1534&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
      },
      error => {
        console.log(error);
        this.backgroundImage = "https://images.unsplash.com/photo-1500487003906-9baadc8d610d?auto=format&fit=crop&w=1534&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
       let cityID = parseInt(params['cityID']);
       this.cityID = cityID;
       this.loadForecast();
     });
  }
}
