import React from 'react';
import PropTypes from 'prop-types';
const BlogHeader =
    (props) => {
        return (
            <div className="blog-header">
                <div>
                    <span className="blog-title high-light">
                        {props.title}
                    </span>
                </div>
                <div>
                    <span className="email high-light">
                        {props.email}
                    </span>
                </div>
            </div>
        );
    };

BlogHeader.propTypes = {
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default BlogHeader;
