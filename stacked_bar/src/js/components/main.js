import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleView, setGraphData } from '../actions/stacked';
import StackedTemp from './stacked_temp';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.setDimensions = this.setDimensions.bind(this);
    this.state = {
      width: 100,
      height: 100,
    };
  }
  componentWillMount() {
    this.props.setGraphData();
  }
  componentDidMount() {
    this.setDimensions();
    window.addEventListener('resize', this.setDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setDimensions);
  }
  setDimensions() {
    this.setState({
      width: this.item.offsetWidth,
      height: this.item.offsetHeight,
    });
  }
  render() {
    if (!this.props) {
      return null;
    }
    return (
      <div>
        <button
          id="toggleButton"
          onClick={this.props.toggleView}
        >Toggle</button>
        <div
          id="graphContainer"
          ref={(div) => { this.item = div; }}
        >
          <StackedTemp
            data={this.props.stackData.graphData}
            rawData={this.props.stackData.raw}
            width={this.state.width}
            height={this.state.height}
            padding={[20, 20, 20, 20]}
            groupBy={this.props.stackData.groupBy}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    stackData: state.stackData,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleView, setGraphData,
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Main);
