import React, {PropTypes} from 'react';
import Base from './Base';
const {func, number, arrayOf, element, object, oneOf} = PropTypes;

const Nav = ({children}) => (
	<nav id='Tabs' className='flex-row'>
		{
			React.Children.map(children, (child, index) => {
				return React.cloneElement(child, {
					activeClassName: 'active'
				})
			})
		}
	</nav>
);

Nav.propTypes = {
	children: arrayOf(element).isRequired
};

export default Nav;