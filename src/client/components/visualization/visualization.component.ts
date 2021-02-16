import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

import * as d3 from 'd3';
import {Selection} from 'd3/index';

import {SearchService} from '../search/search.service';
import {ResponseData, SearchResponse} from '../search/search.interface';
import {PointValuePair} from './visualization.interface';

@Component({
  selector: 'app-visualization',
  template: `
    <div class="linechart"></div>
  `
})
export class VisualizationComponent implements OnInit, OnDestroy {
  private svg: Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  private xAxis;
  private yAxis;
  private lineGroup;
  private dotGroup;

  private width: number = 700;
  private readonly height: number = 700;
  private readonly margin: number = 50;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly searchService: SearchService,
    private readonly chartElement: ElementRef) {
  }

  ngOnInit(): void {
    this.initializeChart();
    this.searchService.searchResponse.pipe(
      takeUntil(this.destroy),
      filter(response => !!response),
      tap((searchValue: SearchResponse) => this.drawChart(this.transformSearchData(searchValue.data)))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.searchService.searchResponse.next(null);
    this.destroy.next(true);
    this.destroy.complete();
  }

  @HostListener('window:resize')
  private onWindowResize() {
    const searchData = this.transformSearchData(this.searchService.searchResponse.value?.data);
    this.drawChart(searchData);
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElement.nativeElement)
      .select('.linechart')
      .append('svg')
      .attr('height', this.height);

    const svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

    this.yAxis = svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px, 0)');

    this.xAxis = svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0,' + (this.height - 2 * this.margin) + 'px)');


    this.lineGroup = svgInner
      .append('g')
      .attr('id', 'path-group')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', '#bfbfbd')
      .style('stroke-width', '2px');

    this.dotGroup = this.svg
      .select('#path-group')
      .selectAll('line-circle');
  }

  private drawChart(data: Array<PointValuePair>): void {
    this.width = this.chartElement.nativeElement.getBoundingClientRect().width;
    this.svg?.attr('width', this.width);

    const _xAxis = d3.axisBottom(this.initializeXScale(data))
      .ticks(data.length + 1)
      .tickFormat(d3.timeFormat('%Y'));
    this.xAxis.call(_xAxis);

    const _yAxis = d3.axisLeft(this.initializeYScale(data));
    this.yAxis.call(_yAxis);

    const points: Array<[number, number]> = data.map((_data: PointValuePair) =>
      [this.initializeXScale(data)(new Date(_data.date)), this.initializeYScale(data)(_data.value)]
    );

    this.lineGroup.attr('d', this.initializeLine()(points));
    this.setDataPoints(data);
  }

  private setDataPoints = (data: Array<PointValuePair>) => {
    this.svg.selectAll('circle').remove();
    this.dotGroup
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 3)
      .style('fill', '#d67407')
      .attr('cx', pointValuePair => this.initializeXScale(data)(new Date(pointValuePair.date)))
      .attr('cy', pointValuePair => this.initializeYScale(data)(pointValuePair.value));
  };

  private initializeLine = () => d3.line()
    .x(XYPointPair => XYPointPair[0])
    .y(XYPointPair => XYPointPair[1])
    .curve(d3.curveMonotoneX);

  private initializeXScale = (data: Array<PointValuePair>) =>
    d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([this.margin, this.width - 2 * this.margin]);

  private initializeYScale = (data: Array<PointValuePair>) =>
    d3.scaleLinear()
      .domain([d3.max(data, d => d.value) + 1, d3.min(data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

  private transformSearchData = (searchData: Array<ResponseData>): Array<PointValuePair> =>
    searchData.reduce((acc, current: ResponseData) => {
      const year = current.key.filter((key: string) => key.match(/\d{4}/g));
      acc.push({value: +current.values.join(''), date: year.join('')});
      return acc;
    }, []);
}
