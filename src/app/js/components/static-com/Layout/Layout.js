import PropTypes from 'prop-types';
import React from 'react';

const RowStyle = {
    overflow: 'hidden',
    width: '100%'
};

const ColStyle = {
    float: 'left',
    display: 'inline-block',
    height: '100%'
};

const Row = (props) => <div style={RowStyle}>{props.children}</div>;
const Col = (props) =>
    <div style={Object.assign({width: `${(props.width || 1) * 100}%`}, ColStyle)}>{props.children}</div>;


Row.propTypes = {
    children: PropTypes.any
};

Col.propTypes = {
    width: PropTypes.number,
    children: PropTypes.any
};

export {Row, Col};