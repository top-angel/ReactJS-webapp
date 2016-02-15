import React, {PropTypes} from 'react';
import Base from './Base';
import {playSet, updatePlayCount} from '../services/playerService';

export default class ShuffleButton extends Base {
	constructor(props) {
		super(props);
		this.autoBind('shuffle');
	}
	shuffle() {
		const sets = this.props.setIds;
		const random = Math.floor(Math.random() * (sets.length - 1));
		const randomSetId = sets[random];
		
		playSet(randomSetId, this.context.push);
		updatePlayCount(randomSetId, this.context.user.id);
	}
	render() {
		return (
			<p id='DetailButton' onClick={this.shuffle}>SHUFFLE</p>
		);
	}
}

ShuffleButton.contextTypes = {
	push: PropTypes.func,
	user: PropTypes.object
};

ShuffleButton.propTypes = {
	setIds: PropTypes.array.isRequired
};
