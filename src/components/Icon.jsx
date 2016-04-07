import React, {PropTypes} from 'react';
const {number, string, bool, object, func} = PropTypes;

const Icon = ({children, caption, fixed, style, onClick, size, className}) => {
    const iconSize = size || 24;
    const fixedStyle = {
        textAlign: 'center',
        width: iconSize
    };

    let mergedClass = `${className} ion-${children}`;
    let mergedStyle = Object.assign({}, style, {
        fontSize: iconSize
    });

    if(fixed) Object.assign(mergedStyle, fixedStyle);
    if(onClick) {
        Object.assign(mergedStyle, onClickStyle);
        mergedClass += ' clickable';
    }

    const iconElement = React.createElement('i', {
        displayName: 'Icon',
        className: mergedClass,
        style: mergedStyle,
        onClick: onClick
    });

    if(caption) {
        return (
            <div className='flex-row-nowrap'>
                {iconElement}
                <p style={{marginLeft: '3rem'}}>
                    {caption}
                </p>
            </div>
        );
    }

    return iconElement;
}

Icon.propTypes = {
    size: number,
    // text placed to right of icon
    caption: string,
    // icon className from ionicons
    children: string.isRequired,
    // sets fixed width for icons, useful for stacking
    fixed: bool,
    // custom styling
    style: object,
    className: string,
    // click handlers for icon
    onClick: func
};

export default Icon;