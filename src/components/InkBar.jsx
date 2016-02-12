import React, {PropTypes} from 'react';

const InkBar = ({animation, width}) => {
	let defaultStyle = {
		background: '#22a7f0',
		height: 3,
		width: width,
		position: 'absolute',
		bottom: 0,
		left: animation + '%'
	};

	let mergedStyle = Object.assign({}, defaultStyle, animation);
	// let mergedStyle = R.merge(defaultStyle, animation);

	return (
		<div style={mergedStyle} />
	);
};

InkBar.propTypes = {
	style: PropTypes.object
};

export default InkBar;