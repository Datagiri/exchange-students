import store from '../store';

export const addDevice = deviceDetails => ((dispatch) => {
  dispatch({
    type: 'DEVICE_ADD_PENDING',
    payload: null,
  });
});