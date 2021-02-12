import {AfterViewInit, Component, ElementRef} from '@angular/core';

import * as d3 from 'd3';
import {chartData} from './chartdata.const';

@Component({
  selector: 'app-visualization',
  template: `
    <div class="linechart"></div>
  `
})
export class VisualizationComponent implements AfterViewInit {

  private width: number = 700;
  private height: number = 700;
  private margin = 50;
  private readonly data: Array<{ value: number, date: string }>;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;

  constructor(private readonly chartElement: ElementRef) {
    this.data = chartData;
  }


  ngAfterViewInit(): void {
    this.initializeChart();
    this.drawChart();
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElement.nativeElement)
      .select('.linechart')
      .append('svg')
      .attr('height', this.height);

    this.svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

    this.yScale = d3.scaleLinear()
      .domain([d3.max(this.data, d => d.value) + 1, d3.min(this.data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px, 0)');

    this.xScale = d3.scaleTime()
      .domain(d3.extent(this.data, d => new Date(d.date)));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0,' + (this.height - 2 * this.margin) + 'px)');


    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', '2px');
  }

  private drawChart(): void {
    this.width = this.chartElement.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const _xAxis = d3.axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%m / %Y'));
    this.xAxis.call(_xAxis);

    const _yAxis = d3.axisLeft(this.yScale);
    this.yAxis.call(_yAxis);

    const line = d3.line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveMonotoneX);

    const points: Array<[number, number]> = this.data.map(
      data => [this.xScale(new Date(data.date)), this.yScale(data.value)]
    );

    this.lineGroup.attr('d', line(points));
  }
}
