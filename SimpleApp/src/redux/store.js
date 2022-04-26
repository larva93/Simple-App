import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './actions';

const sagaMiddleware = createSagaMiddleware();

const storeRedux = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default storeRedux;
