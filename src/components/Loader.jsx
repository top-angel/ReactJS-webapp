import React, {PropTypes} from 'react';
import Base from './Base';
import Spinner from './Spinner';

const {bool, node} = PropTypes;

export default class Loader extends Base {
    static propTypes = {
        loaded: bool.isRequired,
        children: node
    }
    constructor(props, context) {
        super(props, context);
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
            );
        } else {
            return children;
        }
    }
}