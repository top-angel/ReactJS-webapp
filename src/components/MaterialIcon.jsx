import React, {PropTypes} from 'react'
const {oneOf, string, bool, object, func} = PropTypes;

const Icon = ({size, children, style, onClick}) => {
	let iconSize = size || 24;
	let mergedStyle = Object.assign({}, style, { fontSize: iconSize });

	return React.createElement('i', {
		displayName: 'MaterialIcon',
		className: `mdi mdi-${children}`,
		style: mergedStyle,
		onClick: onClick
	});
}

Icon.propTypes = {
	size: oneOf([18, 24, 36, 48]),
	children: string.isRequired,
	onClick: func,
	style: object
}

export default Icon;