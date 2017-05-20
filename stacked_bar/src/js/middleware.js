import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const logger = () => next => (action) => {
  // console.log('Action fired', action);
  next(action);
};

const error = () => next => (action) => {
  try {
    next(action);
  } catch (err) {
    console.log(err);
  }
};

const middleware = applyMiddleware(error, thunk, logger);
export default middleware;
