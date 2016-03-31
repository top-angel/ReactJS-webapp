import React, {PropTypes} from 'react';
import Base from './Base';
import Spinner from './Spinner';

const {bool, node} = PropTypes;
const propTypes = {
    loaded: bool,
    children: node
};

export default class Loader extends Base {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.loaded) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const {loaded, children} = this.props;
        if(!loaded) {
            return (
                <div id='Loader'>
                    <Spinner />
                </div>
            )
        } else {
            return children
        }
    }
}

Loader.propTypes = propTypes;