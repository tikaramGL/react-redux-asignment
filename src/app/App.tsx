import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducer from './reducers/index';
import createRoutes from './routes';
import { BrowserRouter, Route } from 'react-router-dom';

const allroutes = createRoutes;

declare let module: any

const store = createStore(allReducer);

ReactDOM.render(

    <Provider store={store}>
        {allroutes}
    </Provider>
    , document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
} 

export default store;