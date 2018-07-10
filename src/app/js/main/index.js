import React from 'react';
import {render} from 'react-dom';
import Blog from '../components/container-com/Blog/Blog';
import ErrorBoundary from '../components/static-com/ErrorBoundary/ErrorBoundary';
import Init from './init';
import ErrorPanel from '../components/static-com/ErrorBoundary/ErrorPanel';
import Spinner from '../components/static-com/Spinner/Spinner';
window.onload = function () {
    const $app = document.getElementById('app');
    render(<Spinner/>, $app);
    Init()
        .then((config) => {
            render(
                <ErrorBoundary>
                    <Blog {...config}/>
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
