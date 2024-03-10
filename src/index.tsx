import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import './assets/fontello/css/fontello.css'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from './redux/store'
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <ToastContainer />
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
