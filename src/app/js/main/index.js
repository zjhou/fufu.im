import React from 'react';
import ReactDom from 'react-dom';
import Blog from '../components/container-com/Blog/Blog';
import ErrorBoundary from '../components/static-com/ErrorBoundary/ErrorBoundary';

window.onload = function () {
    ReactDom.render(
        <ErrorBoundary>
            <Blog/>
        </ErrorBoundary>
        , document.getElementById('app'));
};