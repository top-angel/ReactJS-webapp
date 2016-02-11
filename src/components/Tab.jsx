import React, {PropTypes} from 'react';

const Tab = ({onClick, width, children}) => (
	<a onClick={onClick} className='flex'>
		<p>{children}</p>
	</a>
);

Tab.propTypes = {
	selected: PropTypes.bool
};

export default Tab;