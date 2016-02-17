import React, {PropTypes} from 'react';

const Dropdown = ({children, style}) => {
	return (
		<div className='dropdown flex-column' style={style}>
			{children}
		</div>
	);
}

export default Dropdown;