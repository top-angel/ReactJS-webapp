import React, {PropTypes} from 'react';
import Base from './Base';
import {Element, Events, animateScroll} from 'react-scroll';
import Footer from './Footer';
import Button from './Button';
import Icon from './Icon';
import {IOS_URL, ANDROID_URL} from '../constants/constants';

const {object, func} = PropTypes;
const scroll = animateScroll;

import unlockImg from '../images/beacons.png';
import calendarImg from '../images/calendar.png';
import festivalImg from '../images/festivals.png';

export default class LandingPage extends Base {
    static contextTypes = {
        router: object.isRequired,
        push: func
    }
    constructor(props) {
        super(props);
        this.autoBind('scrollTo', 'handleClick');
    }
    componentWillMount() {
        this.context.push({
            showNavbar: false,
            currentPage: 'Setmine'
        });
    }
    componentDidMount() {
        Events.scrollEvent.register('begin', () => {
            console.log('begin');
        });

        Events.scrollEvent.register('end', () => {
            console.log('end');
        });

        scroll.scrollToTop();
    }
    componentWillUnmount() {
        this.context.push({ showNavbar: true });
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    handleClick() {
        setTimeout(() => {
            this.context.router.push('/sets');
        }, 150);
    }
    scrollTo() {
        scroll.scrollTo((window.innerHeight - 250), {
            duration: 450
        });
    }
    render() {
        return (
            <div className='landing-page'>
                <section className='landing-page__section--main'>
                    <h2>Relive your favorite sets</h2>
                    <div className='flex-column'>
                        <Button solid onClick={this.handleClick} className='ActionButton'>ListenNow</Button>
                        <h4>Discover music festivals and live events around the globe.</h4>
                    </div>
                </section>

                <section className='landing-page__section--info'>
                    <div className='landing-page__arrow' onClick={this.scrollTo}>
                        <Icon size={32}>ios-arrow-down</Icon>
                        <div className='landing-page__vertical-line' />
                    </div>
                    <li className='landing-page__li'>
                        <img src={unlockImg} />
                        <div className='circle'/>
                        <p>Unlock FREE exclusive music from our artists by walking into select stores, bars, and venues</p>
                    </li>
                    <li className='landing-page__li--reverse'>
                        <img src={festivalImg} />
                        <div className='circle'/>
                        <p>Listen to performances played at previous events and festivals</p>
                    </li>
                    <li className='landing-page__li'>
                        <img src={calendarImg} />
                        <div className='circle'/>
                        <p>See lineups and find tickets for upcoming events in your area</p>
                    </li>
                    <div className='landing-page__app-links'>
                        <Icon
                            title='View on AppStore'
                            onClick={() => window.open(IOS_URL)}
                            size={72}
                        >
                            social-apple
                        </Icon>
                        <Icon
                            title='View on Google Play'
                            onClick={() => window.open(ANDROID_URL)}
                            size={72}
                        >
                            social-android
                        </Icon>
                    </div>
                </section>
                <h5 className='landing-page__scroll-back' onClick={animateScroll.scrollToTop}>Back to Top</h5>
                <Footer/>
            </div>
        );
    }
}