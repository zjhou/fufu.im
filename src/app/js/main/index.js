import React from 'react';
import ReactDom from 'react-dom';
import Blog from '../components/container-com/Blog/Blog';

window.onload = function () {
    ReactDom.render(<Blog/>, document.getElementById('app'));
};