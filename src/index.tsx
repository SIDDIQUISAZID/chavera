import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import App from './App';
import './index.css';
import { isDevEnv, isLocalUrl } from './serverConfig';
if (isDevEnv && isLocalUrl) {
  const { worker } = require('./mocks/browser.ts')
  worker.start()
}

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
