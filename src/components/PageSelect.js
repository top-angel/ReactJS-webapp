import React from 'react';
import Radium from 'radium';
import {History} from 'react-router';
import {colors} from '../constants/constants';

var headerOffset = '8vh';
var style = {
	position: {
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: `${headerOffset} auto 0`,
		width: '50%',
		height: headerOffset
	},
	hover: {
		cursor: 'pointer',
		':hover': {
			color: colors.blue
		}
	}
};

var PageSelect = React.createClass({

	mixins: [History],

	getDefaultProps() {
		return {
			items: []
		};
	},

	showPages() {
		var pages = this.props.items.map(page => {
			return <span onClick={this.props.changePage}>{page}</span>
		});
		return pages;
	},

	render() {
		return (
			<div className='flex-row' style={[style.position]}>
				<i className='fa fa-fw fa-chevron-left' style={[style.hover]} ref='left' onClick={this.props.changePage}/>
				{this.showPages()}
				<i className='fa fa-fw fa-chevron-right' style={[style.hover]} ref='right' onClick={this.props.changePage}/>
			</div>
		);
	}

});

module.exports = Radium(PageSelect);