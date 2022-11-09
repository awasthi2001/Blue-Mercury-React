import { applyMiddleware, legacy_createStore as createstore } from "redux";
import { reducer } from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
//const middleware = applyMiddleware(thunk)
export const store = createstore(reducer,composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  ));
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());