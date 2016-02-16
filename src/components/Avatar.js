import React, {PropTypes} from 'react';
import Base from './Base';
import {Motion, spring, presets} from 'react-motion';
import Dropdown from './Dropdown';
import Icon from './FaIcon';

const {bool, func, object} = PropTypes;

export default class Avatar extends Base {
	constructor(props) {
		super(props);
		this.autoBind('toggleDropdown');
		this.state = {
			open: false
		};
	}
	toggleDropdown() {
		this.setState({
			open: !this.state.open
		});
	}
	render() {
		return (
			<div id='Avatar'>
				<div className='flex-row'>
					<Icon>user</Icon>
					{/*<Icon onClick={this.toggleDropdown} size={18}>chevron-down</Icon>*/}
				</div>
			</div>
		);
	}
}

Avatar.propTypes = {
	loginStatus: bool,
	user: object,
	push: func
};
