export default function (state = null, action) {
  let nextState = state;

  switch (action.type) {
    case 'CHANGE_GRAPH_DATA':
      nextState = {
        ...nextState,
        graphData: action.payload,
      };
      break;
    case 'CHANGE_VIEW':
      nextState = {
        ...nextState,
        groupBy: action.payload.view,
        graphData: action.payload.data,
      };
      break;
    default:
      break;
  }
  return nextState;
}
