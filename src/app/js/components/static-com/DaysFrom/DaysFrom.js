import React from 'react';
import PropTypes from 'prop-types';
import {daysFrom} from '../../../utils/utils';
import './style.scss';

const DaysFrom = (props) =>
    <div className="days-from high-light">
        <span data-unit="Days">{daysFrom(props.start)}</span>
    </div>;

DaysFrom.propTypes = {
    start: PropTypes.string.isRequired
};

export default DaysFrom;