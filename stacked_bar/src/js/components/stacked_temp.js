import React from 'react';
import * as d3 from 'd3';
import _ from 'underscore';

import { graphTypes, departmentColors } from '../global';

import Rect from './rect';

export default class StackedProg extends React.Component {
  render() {
    const programmes = Object.keys(this.props.data || {});
    const progLength = programmes.length;
    const progCountMapping = _.mapObject(this.props.data, progItem => (
      _.reduce(progItem, (sum, item) => sum + item[2], 0)
    ));
    console.log(progCountMapping);
    const xMax = d3.max(programmes, progItem => (
      _.reduce(this.props.data[progItem], (sum, item) => sum + item[2], 0)
    ));
    const xScale = (this.props.groupBy === graphTypes.program) ?
      d3.scaleLinear()
        .domain([0, xMax])
        .range([this.props.padding[3], this.props.width - this.props.padding[1]]) :
      d3.scaleLinear()
        .domain([0, progLength + 1])
        .range([this.props.padding[3], this.props.width - this.props.padding[1]]);
    const yScale = (this.props.groupBy === graphTypes.program) ?
      d3.scaleLinear()
        .domain([0, progLength + 1])
        .range([this.props.padding[2], this.props.height - this.props.padding[0]]) :
      d3.scaleLinear()
        .domain([0, xMax])
        .range([this.props.height - this.props.padding[2], this.props.padding[0]]);

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        {
          this.props.rawData.map(depProgItem => (
            <Rect
              key={depProgItem[3]}
              y={
              (this.props.groupBy === graphTypes.program) ?
                yScale(_.indexOf(programmes, depProgItem[0]) + 1) :
                yScale(depProgItem[5])
              }
              x={
              (this.props.groupBy === graphTypes.program) ?
                xScale(depProgItem[4] - depProgItem[2]) :
                xScale(_.indexOf(programmes, depProgItem[1]) + 1)
              }
              height={
                (this.props.groupBy === graphTypes.program) ?
                20 :
                yScale(xMax - depProgItem[2]) - this.props.padding[0]
              }
              direction={(this.props.groupBy === graphTypes.program) ? 'horizontal' : 'vertical'}
              width={
                (this.props.groupBy === graphTypes.program) ?
                xScale(depProgItem[2]) - this.props.padding[1] :
                20
              }
              color={departmentColors[depProgItem[1]]}
              data={depProgItem}
            />
          ))
        }
        {
          (this.props.groupBy === graphTypes.department) && (
            <g className="axes">
              <line
                x1={this.props.padding[3]}
                y1={this.props.height - this.props.padding[2]}
                x2={this.props.width - this.props.padding[1]}
                y2={this.props.height - this.props.padding[2]}
                style={{
                  stroke: '#aaaaaa',
                  strokeWidth: 1,
                }}
              />
              {
                programmes.map((deptItem, deptIndex) => (
                  <g key={deptItem}>
                    <text
                      className="textStyle"
                      textAnchor="middle"
                      transform={`translate(${xScale(deptIndex + 1)},${this.props.height - (this.props.padding[3] - 14)})`}
                    >{deptItem}</text>
                    <text
                      className="textStyle"
                      textAnchor="middle"
                      transform={`translate(${xScale(deptIndex + 1)},${yScale(progCountMapping[deptItem]) - 2})`}
                    >{progCountMapping[deptItem]}</text>
                  </g>
                ))
              }

            </g>
          )
        }
        {
          (this.props.groupBy === graphTypes.program) && (
            <g className="axes">
              <line
                x1={this.props.padding[3]}
                y1={this.props.padding[0]}
                x2={this.props.padding[3]}
                y2={this.props.height - this.props.padding[2]}
                style={{
                  stroke: '#aaaaaa',
                  strokeWidth: 1,
                }}
              />
              {
                programmes.map((deptItem, deptIndex) => (
                  <g key={deptItem}>
                    <text
                      className="textStyle"
                      textAnchor="middle"
                      transform={`translate(${this.props.padding[3] - 14},${yScale(deptIndex + 1) + 5}) rotate(90,0,0)`}
                    >{deptItem}</text>
                    <text
                      className="textStyle"
                      textAnchor="middle"
                      transform={`translate(${xScale(progCountMapping[deptItem]) + 10},${yScale(deptIndex + 1) + 5})`}
                    >{progCountMapping[deptItem]}</text>
                  </g>
                ))
              }

            </g>
          )
        }
      </svg>
    );
  }
}
