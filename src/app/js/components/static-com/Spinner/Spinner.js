import React from 'react';
import './style.scss';
// const spinner = () => <div className="lds-ellipsis"><div/><div/><div/><div/></div>;
const walkingSquare = () => {
    return (
        <div className="spinner">
            <div className="square1" />
            <div className="square2" />
            <div className="square3" />
        </div>
    );
};

export default walkingSquare;