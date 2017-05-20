import React from 'react';
import * as d3 from 'd3';
import _ from 'underscore';

import { departmentColors } from '../global';

import XYAxis from './xyAxes';
import Rect from './rect';

export default class StackedDepartment extends React.Component {
  render() {
    const departments = Object.keys(this.props.data || {});
    const deptCount = departments.length;
    const yMax = d3.max(departments, depItem => (
      _.reduce(this.props.data[depItem], (sum, item) => sum + item[2], 0)
    ));
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([this.props.height - this.props.padding[2], this.props.padding[0]]);
    const xScale = d3.scaleLinear()
      .domain([0, deptCount + 1])
      .range([this.props.padding[3], this.props.width - this.props.padding[1]]);

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        {
          // <XYAxis
          //   width={this.props.width}
          //   height={this.props.height}
          //
          // />
        }
        {
          (departments || []).map((deptItem, deptIndex) => {
            let cumulative = 0;
            return this.props.data[deptItem].map((depProgItem) => {
              cumulative += depProgItem[2];
              return (
                <Rect
                  key={depProgItem[3]}
                  x={xScale(deptIndex + 1)}
                  y={yScale(cumulative)}
                  direction="vertical"
                  width={20}
                  height={yScale(yMax - depProgItem[2]) - this.props.padding[0]}
                  color={departmentColors[depProgItem[1]]}
                />
              );
            });
          })
        }
      </svg>
    );
  }
}
