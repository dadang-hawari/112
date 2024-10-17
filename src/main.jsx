import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/main.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './styles/toast.css';
import './styles/calendar.css';

import './styles/scrollbar.css';
import Route from './Routes.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Toast from './components/Common/Toast.jsx';
import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Route />
      <Toast autoClose={2500} transition={Flip} />
    </Provider>
  </React.StrictMode>,
);
