import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { API_WS_ROOT } from './constants';
import App from './App';
import reportWebVitals from './reportWebVitals';
// @ts-ignore
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
