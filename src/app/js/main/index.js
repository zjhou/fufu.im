import React from 'react';
import {render} from 'react-dom';
import Blog from '../components/container-com/Blog/Blog';
import ErrorBoundary from '../components/static-com/ErrorBoundary/ErrorBoundary';
import Init from './init';
import ErrorPanel from '../components/static-com/ErrorBoundary/ErrorPanel';
import Spinner from '../components/static-com/Spinner/Spinner';
import Config from '../../../config/blog.config';
import test from '../../redux/reducers/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(test);

window.onload = function () {
    const $app = document.getElementById('app');
    $app.setAttribute('data-is-mobile', Config.isMobile);

    render(<Spinner/>, $app);
    Init()
        .then((config) => {
            render(
                <ErrorBoundary>
                    <Provider store={store}>
                        <Blog {...config}/>
                    </Provider>
                </ErrorBoundary>,
                $app
            );
        })
        .catch((e) => {
            console.error(e);
            render(
                <ErrorPanel/>,
                $app
            );
        });
};
