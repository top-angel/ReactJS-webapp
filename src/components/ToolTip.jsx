import React, {PropTypes} from 'react';
const {oneOf, object} = PropTypes;

const ToolTip = ({style, children}) => {
	return (
		<div className='tooltip' style={style}>
			<p>{children}</p>
		</div>
	);
}

ToolTip.propTypes = {
	style: object,
	direction: oneOf(['top', 'right', 'left', 'bottom'])
};

export default ToolTip;