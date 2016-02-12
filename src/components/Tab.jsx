import React, {PropTypes} from 'react';
import Base from './Base';

export default class Tab extends Base {
	constructor(props) {
		super(props);
		this.autoBind('handleClick');
	}
	handleClick(e) {
		if(this.props.onClick) {
			this.props.onClick(null, e, this);
		}
	}
	render() {
		let { width, children } = this.props;
		return (
			<a onClick={this.handleClick} style={{ width: width+'%'}}>
				<p>{children}</p>
			</a>
		);
	}
}