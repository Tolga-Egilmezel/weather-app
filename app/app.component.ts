/*
app.component
=============

Outline structure of project. Every element will placed inside of this component

*/

import { ViewEncapsulation, Component, OnInit } from '@angular/core';

@Component({
  selector: 'main[main]',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  globalLoader: boolean;

  constructor() {}

  ngAfterViewInit() {}

  ngOnInit() {}
}
