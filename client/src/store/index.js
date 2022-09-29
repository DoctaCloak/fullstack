import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import appReducer from 'store/reducers/appReducer';

/**
 * @internal
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * @internal
 */
function getMiddlewares() {
  const middlewares = [thunk];

  middlewares.push(createLogger());

  return middlewares;
}

export default createStore(
  appReducer,
  {},
  composeEnhancers(applyMiddleware(...getMiddlewares())),
);
