import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import * as d3 from 'd3';

/*

Chart Line Component
==========

Component get data over data attr. On Init change time format with d3 function.
Append Svg to template div and start create svg.

When data update ngOnChanges send new data to updateChart function.
Just calculate recalculate data and call svg init again as same on load.
*/

@Component({
  selector: 'chart-line',
  styleUrls: ['./chart-line.scss'],
  template: `
    <div class="weather-line-chart" #chart></div>
  `,
})

export class ChartLineComponent implements OnInit {
  @ViewChild('chart') private chartElement: ElementRef;

  private _svg: any;
  private svg: any;
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private line: d3.Line<[number, number]>;
  private area: d3.Area;
  private margin: any = { top: 100, bottom: 100, left: 100, right: 100};
  private _data: any;
  @Input()
  set data(data: any) {
    let parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    data = data.map((d) => {
      d.dt_txt = parseDate(d.dt_txt);
      return d;
    });
    this._data = (data.slice(1,7) || []);
  }
  get data() {
    return this._data;
  }

  ngOnInit() {
    let element = this.chartElement.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
  }

  ngOnChanges() {
    if (this.svg) this.updateChart();
  }

  ngAfterViewChecked() {
    if (!this.svg) {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    }
  }

  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private initAxis() {
    this.x = d3.scaleTime().rangeRound([0, this.width]);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(d3.extent(this._data, (d) => d.dt_txt ));
    this.y.domain(d3.extent(this._data, (d) => d.main.temp ));
  }

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .transition()
      .call(d3.axisBottom(this.x).ticks(6).tickFormat(d3.timeFormat('%A %H:%M')));

     this.svg.append('g')
       .attr('class', 'axis axis--y')
       .transition()
       .call(d3.axisLeft(this.y).ticks(6));
  }

  private drawLine() {
    this.area = d3.area()
      .x((d) => this.x(d.dt_txt))
      .y0(this.height)
      .y1((d) => this.y(d.main.temp));

    this.line = d3.line()
      .x((d) => this.x(d.dt_txt))
      .y((d) => this.y(d.main.temp));

    this.svg.selectAll("dot")
      .data(this._data)
      .enter()
      .append("circle")
      .attr("fill", "white")
      .attr("r", 6)
      .attr("cx", (d) => this.x(d.dt_txt))
      .attr("cy", (d) => this.y(d.main.temp))
			.attr("class", "dot");


    this.svg.append('path')
      .datum(this._data)
      .attr('class', 'area')
      .attr("fill", "white")
      .attr("fill-opacity", ".6")
      .attr('d', this.area)
      .transition()
      ;

    this.svg.append('path')
      .datum(this._data)
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 4)
      .attr('d', this.line)
      .transition()
      ;
  }

  private updateChart() {
    this.x.domain(d3.extent(this._data, (d) => d.dt_txt ));
    this.y.domain(d3.extent(this._data, (d) => d.main.temp ));

    d3.select('svg').selectAll('*').remove();

    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }
}
