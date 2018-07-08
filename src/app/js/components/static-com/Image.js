import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {
    componentDidMount() {
        this.wrapper.append(this.props.src);
    }
    shouldComponentUpdate(nextProps) {
        return (this.props.src !== nextProps.src);
    }
    componentDidUpdate() {
        this.wrapper.innerHTML = '';
        this.wrapper.append(this.props.src);
    }
    render(){return <span ref={ref => this.wrapper = ref}/>;}
}

Image.propTypes = {src: PropTypes.object.isRequired};