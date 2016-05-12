import React, {PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import Base from './Base';
import Nav from './Nav';
import Ink from 'react-ink';

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
				<Nav>
					<IndexLink to='/sets'>
						<p>RECENT</p>
						<Ink />
					</IndexLink>
					<Link to='/sets/popular'>
						<p>POPULAR</p>
						<Ink />
					</Link>
					<Link to='/sets/festivals'>
						<p>FESTIVALS</p>
						<Ink />
					</Link>
					<Link to='/sets/mixes'>
						<p>MIXES</p>
						<Ink />
					</Link>
				</Nav>
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