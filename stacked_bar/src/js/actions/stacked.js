import _ from 'underscore';

import store from '../store';

export const toggleView = () => ((dispatch) => {
  const currentView = store.getState().stackData.groupBy;
  const rawData = store.getState().stackData.raw;
  const regroupedData = _.groupBy(rawData, dataItem => dataItem[1 - currentView]);
  dispatch({
    type: 'CHANGE_VIEW',
    payload: {
      view: 1 - currentView,
      data: regroupedData,
    },
  });
});

export const setGraphData = () => ((dispatch) => {
  const rawData = store.getState().stackData.raw;
  const regroupedData = _.groupBy(rawData, dataItem => (
    dataItem[store.getState().stackData.groupBy]
  ));
  dispatch({
    type: 'CHANGE_GRAPH_DATA',
    payload: regroupedData,
  });
});
