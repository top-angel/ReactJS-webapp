import React, {PropTypes} from 'react';
const {number, string, bool, object, func} = PropTypes;

const Icon = ({children, caption, fixed, style, onClick, size, className, title}) => {
    const fixedClass = fixed ? 'fixed' : '';
    const clickable = onClick ? 'clickable' : '';
    const captionClass = caption ? 'clickable' : '';

    const iconSize = size || 24;
    // const fixedStyle = {
    //     textAlign: 'center',
    //     width: iconSize
    // };

    // let mergedClass = `${className} ion-${children}`;
    let mergedStyle = Object.assign({}, style, {
        fontSize: iconSize
    });

    // if(fixed) Object.assign(mergedStyle, fixedStyle);
    // if(onClick) {
    //     Object.assign(mergedStyle, {
    //         cursor: 'pointer'
    //     });
    // }

    const iconElement = (
        <i
            className={`icon ${className} ion-${children} ${fixedClass} ${clickable}`}
            style={mergedStyle}
            onClick={onClick}
            title={title}
        />
    );

    if(caption) {
        return (
            <div className='flex-row-nowrap'>
                {iconElement}
                <p className='caption'>
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