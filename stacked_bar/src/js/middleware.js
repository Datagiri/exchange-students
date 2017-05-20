import { applyMiddleware } from 'redux';
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

const middleware = applyMiddleware(error, logger);
export default middleware;
