import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';

import reducers from './app/store/reducers';
import Index from './app/index';

// done finish validation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

const App = () => {
  return (
    <Provider store={createStoreWithMiddleware}>
      <Index />
    </Provider>
  );
};

export default App;
