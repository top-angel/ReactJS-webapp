import React, {PropTypes} from 'react'
import Base from './Base'
import NavMenu from './NavMenu'
import Tabs from './Tabs'

const tabs = [
	{
		text: 'RECENT',
		to: '/sets',
		index: true
	},
	{
		text: 'POPULAR',
		to: '/sets/popular',
		index: false
	}
]

export default class SetsPage extends Base {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Sets' })
	}
	render() {
		return (
			<div id='Sets' className='flex-column'>
				<Tabs tabs={tabs} />
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState
					})
				}
			</div>
		)
	}
}

SetsPage.contextTypes = {
	push: PropTypes.func
}