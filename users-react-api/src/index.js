import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import store from './config/redux/store';

import './styles/App.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <CssBaseline />
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </>
);
