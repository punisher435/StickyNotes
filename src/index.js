import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AllnotesContextProvider } from './store/main-context';
ReactDOM.render(
  <React.StrictMode>
    <AllnotesContextProvider>
      <App />
    </AllnotesContextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


