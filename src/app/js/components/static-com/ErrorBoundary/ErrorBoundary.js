import React from 'react';
import PropTypes from 'prop-types';
import ErrorPanel from './ErrorPanel';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.children !== this.props.children
            || nextState.hasError !== this.state.hasError;
    }
    componentDidUpdate (prevProps){
        if(prevProps.children !== this.props.children){
            this.setState({hasError: false});
        }
    }

    componentDidCatch(error) {
        this.setState({ hasError: JSON.stringify(error)});
    }

    render() {
        if (this.state.hasError) {
            return this.props.ErrorPanel || <ErrorPanel />;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    ErrorPanel: PropTypes.element,
    children: PropTypes.element
};

