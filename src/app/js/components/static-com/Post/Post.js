import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../../config/blog.config';
import './style.scss';

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.content !== this.props.content
            || nextProps.type !== this.props.type;
    }

    componentDidMount() {
        this.updateContent();
    }

    componentDidUpdate() {
        this.updateContent();
    }

    updateContent() {
        this.cont.innerHTML = '';
        let props = this.props;
        switch (props.type) {
        case config.docType.photo:
            this.cont.append(props.content);
            break;
        default:
            this.cont.innerHTML = props.content;
        }
    }

    render() {
        return <div className="markdown-body" ref={ref => this.cont = ref}/>;
    }
}

Content.propTypes = {
    type: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const Post = (props) => (
    <article>
        <header>
            <span className="title high-light">{props.title}</span>
            <time className="high-light">{props.date}</time>
        </header>
        <Content
            type={props.type}
            content={props.content}
        />
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
