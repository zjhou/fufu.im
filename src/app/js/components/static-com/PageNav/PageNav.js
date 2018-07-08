import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const PageNav = (props) => {
    return (
        <div className="page-nav">
            {props.prevPage &&
            <button
                type="button"
                className="high-light"
                onClick={() => {
                    props.onClick(props.pagenow - 1);
                }}
            >上一页</button>
            }
            {props.nextPage &&
            <button
                type="button"
                className="high-light"
                onClick={() => {
                    props.onClick(props.pagenow + 1);
                }}
            >下一页</button>
            }
        </div>
    );
};

PageNav.propTypes = {
    prevPage: PropTypes.bool,
    nextPage: PropTypes.bool,
    pagenow: PropTypes.number,
    onClick: PropTypes.func,
};

export default PageNav;