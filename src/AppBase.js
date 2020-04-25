import React from 'react';

import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";

const store = createStore(reducer);

function AppBase() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppBase;
