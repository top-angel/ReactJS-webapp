import React, {PropTypes} from 'react'
import Base from './Base'
import Link from 'react-router/lib/Link'

const Tabs = props => (
	<nav id='Tabs' className='flex-row'>
		{
			props.tabs.map(tab => {
				let props = {
					to: tab.to,
					activeClassName: 'active',
					onlyActiveOnIndex: tab.index
				}

				return(
					<Link {...props}>
						<p>{tab.text}</p>
					</Link>
				)
			})
		}
	</nav>
)

Tabs.propTypes = {
	tabs: PropTypes.array.isRequired
}

export default Tabs