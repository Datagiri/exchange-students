import React from 'react';

export default class Rect extends React.Component {
  render() {
    if (!this.props) {
      return false;
    }
    return (
      <rect
        width={this.props.width}
        height={this.props.height}
        x={this.props.x}
        y={this.props.y}
        style={{
          fill: this.props.color,
        }}
      />
    );
  }
}
