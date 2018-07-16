import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import './style.scss';

const NavItem = (props) =>
    <li className="nav-item noselect"
        data-selected={props.selected}
        onClick={() => {props.onClick(props.text);}}
    >
        <div className="icon-wrap">
            <Image src={
                props.selected
                    ? props.highlightIcon
                    : props.icon
            }/>
            <span className="nav-item-text">{props.text.toUpperCase()}</span>
        </div>
    </li>;

NavItem.propTypes = {
    onClick: PropTypes.func,
    selected: PropTypes.bool,
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
        return nextProps.disabled !== this.props.disabled
            || nextState.activeType!== this.state.activeType
            || nextProps.activeType!== this.props.activeType
            || nextProps.onChange !== this.props.onChange
            || nextProps.navItems !== this.props.navItems;
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.disabled && prevState.activeType !== this.state.activeType){
            this.props.onChange && this.props.onChange(this.state.activeType);
        }
    }

    render() {
        let props = this.props;
        let sortedNavItems = props.navItems.sort((a, b) => a.order - b.order);
        return (
            <ul className="nav">
                {sortedNavItems.map((navItem, index) => {
                    return (
                        <NavItem
                            key={index}
                            {...navItem}
                            selected={navItem.text === this.state.activeType}
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


