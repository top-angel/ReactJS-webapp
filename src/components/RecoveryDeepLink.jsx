import React, {PropTypes} from 'react';
import Button from './Button';

import Base from './Base';

export default class RecoveryDeepLink extends Base {
    constructor(props) {
        super(props);
        // this.autoBind();
        this.state = {
        };
    }

    componentWillMount() {
        this.context.push({
            loginStatus: true
        });
    }

    render() {
        return (
            <div className='RecoveryDeepLink flex-column'>
                <img className='flex-center' src='/images/setstory-logo-white.png'/>
                <h2 className='flex-center'>Setstory</h2>
                <a className='sign-in flex-2x flex-column' href={'intent://www.setmine.com/#Intent;scheme=setstory;package=com.setmusic.setstory;S.action=recover;S.data=' + this.props.params.data + ';end'}>
                    <div className='sign-in-text flex-center'>
                        One-Click Sign In
                    </div>
                </a>
                
            </div>
        )
    }
}

RecoveryDeepLink.contextTypes = {
    push: PropTypes.func
};