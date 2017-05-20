export default function (state = null, action) {
  let nextState = state;

  switch (action.type) {
    case 'RANDOM_ACTION':
      nextState = {
        ...nextState,
      };
      break;
    default:
      break;
  }
  return nextState;
}
