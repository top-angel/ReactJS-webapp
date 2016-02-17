import React, {PropTypes} from 'react';
const {oneOf, string, bool, object, func} = PropTypes;

const Icon = ({fixed, size, children, style, onClick}) => {
	// sets icons at fixed width
	let fixedWidth = fixed ? 'fa-fw' : undefined;
	let iconSize = size || 24;
	let mergedStyle = Object.assign({}, style, { fontSize: iconSize });

	return React.createElement('i', {
		displayName: 'FontAweSomeIcon',
		className: `fa fa-${children} ${fixedWidth}`,
		style: mergedStyle,
		onClick: onClick
	});
}

Icon.propTypes = {
	size: oneOf([14, 18, 24, 36, 48]),
	children: string.isRequired,
	fixed: bool,
	style: object,
	onClick: func
};

export default Icon;