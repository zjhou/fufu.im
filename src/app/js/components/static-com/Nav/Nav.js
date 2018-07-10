import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import './style.scss';

class NavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status || 'normal' // normal <- -> hover -> selected -> normal
        };
        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick() {
        this.props.onClick && this.props.onClick(this.props.text);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
        if(prevState.status !== this.state.status){
            this.setState({
                status: this.state.status
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.status !== this.props.status ||
            nextState.status !== this.state.status;
    }

    render() {
        let props = this.props;
        return (
            <li className="nav-item noselect"
                data-status={this.state.status}
                onClick={this.onItemClick}
                onMouseEnter={() => {
                    if (this.state.status !== 'selected') {
                        this.setState({status: 'hover'});
                    }
                }}
                onMouseLeave={() => {
                    if (this.state.status !== 'selected') {
                        this.setState({status: 'normal'});
                    }
                }}
            >
                <div className="icon-wrap">
                    <Image src={
                        this.state.status === 'selected'
                            ? props.highlightIcon
                            : props.icon
                    }/>
                    <span className="nav-item-text">{props.text.toUpperCase()}</span>
                </div>
            </li>
        );
    }
}

NavItem.propTypes = {
    onClick: PropTypes.func,
    status: PropTypes.string,
    icon: PropTypes.object.isRequired,
    highlightIcon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
};

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeType: props.activeType,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.activeIdx !== this.state.activeIdx
            || nextProps.disabled !== this.props.disabled
            || nextProps.navItems.length !== this.props.navItems.length;
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.disabled && prevState.activeType !== this.state.activeType){
            this.props.onChange && this.props.onChange(this.state.activeType);
        }
    }

    render() {
        let props = this.props;
        return (
            <ul className="nav">
                {props.navItems.map((navItem, index) => {
                    return (
                        <NavItem
                            key={index}
                            {...navItem}
                            status={navItem.text === this.state.activeType? 'selected' : 'normal'}
                            onClick={(text) => {
                                if(this.props.disabled) return;
                                this.setState({
                                    activeIdx: index,
                                    activeType: text
                                });
                            }}
                        />
                    );
                })}
            </ul>
        );
    }
}

Nav.propTypes = {
    navItems: PropTypes.arrayOf(PropTypes.shape(NavItem.propTypes)),
    activeType: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

export default Nav;


