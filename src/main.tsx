import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import App from './App';
import store from './Service/StateManagement/store';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
<Provider store={store}>
    <App />
  </Provider>,  </React.StrictMode>
);
