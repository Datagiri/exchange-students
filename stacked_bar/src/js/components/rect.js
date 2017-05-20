import React from 'react';
import * as d3 from 'd3';

export default class Rect extends React.Component {
  componentWillReceiveProps(nextProps) {
    const node = this.rect;
    d3.select(node)
      .transition()
      .duration(1200)
      .attr('x', (nextProps.direction === 'vertical') ? (nextProps.x - (0.5 * nextProps.width)) : (nextProps.x))
      .attr('y', (nextProps.direction === 'horizontal') ? (nextProps.y - (0.5 * nextProps.height)) : (nextProps.y))
      .attr('width', nextProps.width)
      .attr('height', nextProps.height);
  }
  render() {
    if (!this.props) {
      return false;
    }
    return (
      <g className="rectGroup">
        <rect
          className="rect"
          ref={(rect) => { this.rect = rect; }}
          style={{
            fill: this.props.color,
          }}
        />
        <text
          className="rectText"
          transform={`translate(${this.props.x + 14},${this.props.y + 5})`}
        >
          <tspan x="0" dy="0">{this.props.data[0]}</tspan>
          <tspan x="0" dy="14">{this.props.data[1]}</tspan>
          <tspan x="0" dy="14">{this.props.data[2]}</tspan>
        </text>
      </g>
    );
  }
}
