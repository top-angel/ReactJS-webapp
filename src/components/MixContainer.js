import React, {Component} from 'react'
import InfiniteScrollify from './InfiniteScrollify'

export default class MixContainer extends React.Component {
	constructor(props) {
		super(props)
		this.onScroll = this.onScroll.bind(this)
	}
	onScroll() {
		this.props.onScroll()
	}
	render() {
		return (
			<div className='flex-row scrollable tile-container'>
				{this.props.children}
			</div>
		)
	}
}
