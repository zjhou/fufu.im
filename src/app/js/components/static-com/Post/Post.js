import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Post = (props) => (
    <article>
        <header>
            <span className="title high-light">{props.title}</span>
            <time className="high-light">{props.date}</time>
        </header>
        <div className="markdown-body" dangerouslySetInnerHTML={{__html: props.content}}/>
    </article>
);

Post.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    date: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

export default Post;
