import React from 'react';
import {nextPage, prevPage} from '../../../../redux/actions/index';
import PropTypes from 'prop-types';
import './style.scss';
import {connect} from 'react-redux';

const PageNav = (props) => {
    return (
        <div className="page-nav">
            {props.prevPage &&
            <button
                type="button"
                className="high-light"
                onClick={() => {
                    props.dispatch(prevPage(props.pagenow));
                }}
            >上一页</button>
            }
            {props.nextPage &&
            <button
                type="button"
                className="high-light"
                onClick={() => {
                    props.dispatch(nextPage(props.pagenow));
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
    dispatch: PropTypes.func
};

export default connect()(PageNav);