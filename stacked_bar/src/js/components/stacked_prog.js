import React from 'react';
import * as d3 from 'd3';
import _ from 'underscore';

import { departmentColors } from '../global';

import XYAxis from './xyAxes';
import Rect from './rect';

export default class StackedProg extends React.Component {
  render() {
    const programmes = Object.keys(this.props.data || {});
    const progCount = programmes.length;
    const xMax = d3.max(programmes, progItem => (
      _.reduce(this.props.data[progItem], (sum, item) => sum + item[2], 0)
    ));
    const xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([this.props.padding[3], this.props.width - this.props.padding[1]]);
    const yScale = d3.scaleLinear()
      .domain([0, progCount + 1])
      .range([this.props.padding[2], this.props.height - this.props.padding[0]]);

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        {
          // <XYAxis
          //   width={this.props.width}
          //   height={this.props.height}
          // />
        }
        {
          (programmes || []).map((progItem, progIndex) => {
            let cumulative = 0;
            return this.props.data[progItem].map((depProgItem) => {
              cumulative += depProgItem[2];
              return (
                <Rect
                  key={depProgItem[3]}
                  y={yScale(progIndex + 1)}
                  x={xScale(cumulative - depProgItem[2])}
                  height={20}
                  direction="horizontal"
                  width={xScale(depProgItem[2]) - this.props.padding[1]}
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
