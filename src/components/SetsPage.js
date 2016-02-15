import React, {PropTypes} from 'react';
import Base from './Base';
import NavMenu from './NavMenu';
import Tabs from './Tabs';
import Tab from './Tab';

export default class SetsPage extends Base {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Sets' });;
	}
	render() {
		return (
			<div className='view'>
				{/*<Tabs tabs={tabs} />*/}
				<Tabs>
					<Tab to='/sets'>RECENT</Tab>
					<Tab to='/sets/popular'>POPULAR</Tab>
					<Tab to='/sets/festivals'>FESTIVALS</Tab>
					<Tab to='/sets/mixes'>MIXES</Tab>
				</Tabs>
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
};