import React, {PropTypes} from 'react';
import Base from './Base';
import {Link} from 'react-scroll';
import Ink from 'react-ink';

const {number, string, func} = PropTypes;

export default class SearchTab extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }
    handleClick(e) {
        this.props.onClick(null, e, this); // changes inkbar position
    }
    render() {
        let { width, children, to, duration, offset, tabIndex } = this.props;

        return (
            <Link 
                className='Tab'
                activeClass='Tab--active'
                to={to}
                style={{ width: width.toString() + '%'}}
                onClick={this.handleClick}
                spy
                smooth
                offset={offset}
                duration={duration}
            >
                <p>{children.toUpperCase()}</p>
                <Ink />
            </Link>
        );
    }
}

SearchTab.propTypes = {
    width: number,
    children: string,
    onClick: func
};

SearchTab.defaultProps = {
    offset: -112,
    duration: 200
};