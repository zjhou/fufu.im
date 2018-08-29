import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import './style.scss';
import {connect} from 'react-redux';
import {switchPostType, gotoPage} from '../../../../redux/actions/index';

const NavItem = (props) =>
    <li className="nav-item noselect"
        data-selected={props.selected}
        onClick={() => {
            props.dispatch(switchPostType(props.text));
            props.dispatch(gotoPage(1));
        }}
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
    selected: PropTypes.bool,
    icon: PropTypes.object.isRequired,
    highlightIcon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    dispatch: PropTypes.func
};

const ConnectedNavItem = connect()(NavItem);

const Nav = (props) => {
    let sortedNavItems = props.navItems.sort((a, b) => a.order - b.order);
    return (
        <ul className="nav">
            {sortedNavItems.map((navItem, index) => {
                return (
                    <ConnectedNavItem
                        key={index}
                        {...navItem}
                        selected={navItem.text === props.activePostsType}
                    />
                );
            })}
        </ul>
    );
};

Nav.propTypes = {
    navItems: PropTypes.arrayOf(PropTypes.shape(NavItem.propTypes)),
    activePostsType: PropTypes.string,
    disabled: PropTypes.bool
};

export default Nav;


