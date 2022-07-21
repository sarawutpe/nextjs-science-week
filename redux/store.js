import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import reducers from './reducers';
import reduxSaga from './saga';

export const makeStore = (ctx) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  // 2: Add an extra parameter for applying middleware
  const store = createStore( reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  // 3: Run your sagas on server
  store.sagaTask = sagaMiddleware.run(reduxSaga);
  // 4: Now return the store
  return store;
};

// Export an assembled wrapper
const storeWrapper = createWrapper(makeStore, { debug: false });

export default storeWrapper;
