
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers";
import rootSaga from "../sagas";

function configureStore(cachedState = {}) {
    const sagaMiddleware = createSagaMiddleware();
    
    // Enhancer composition to include Redux DevTools Extension
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    // Create the Redux store with middleware and enhancers
    const store = createStore(
      rootReducer,
      cachedState, // Pass initial state
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    
    // Run the root saga
    sagaMiddleware.run(rootSaga);
    
    return store;
}

export default configureStore;
