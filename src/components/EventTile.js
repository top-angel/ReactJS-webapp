import React, {PropTypes} from 'react';
import Moment from 'moment';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import Base from './Base';
import Icon from './FaIcon';

export default class EventTile extends Base {
    constructor(props) {
        super(props);
        this.autoBind('openEventPage', 'openTicketLink', 'openVenuePage');
    }
    openEventPage(e) {
        e.stopPropagation();
        this.context.router.push('/event/' + this.props.id);
    }
    openVenuePage(e) {
        e.stopPropagation();
        this.context.router.push('/venue/' + this.props.venueId);
    }
    openTicketLink() {
        window.open(this.props.ticketLink);
    }
    render() {
        let month = Moment(this.props.startDate).format('MMM');
        let day = Moment(this.props.startDate).format('DD');
        let image = {
            backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.bannerImage}')`
        };

        return (
            <div className='col-xs-6 col-sm-4 col-xl-3'>
                <div className='event-tile flex-column' style={image}>
                    <div className='body flex-column flex'>
                        <div className='event-info flex-column flex'>
                            <div className='event'>
                                <div className='date'>
                                    <h4>{day}</h4>
                                    <p className='caption'>{month}</p>
                                </div>
                                <h5 onClick={this.openEventPage} title={this.props.event}>{this.props.event}</h5>
                            </div>
                            <div className='venue-container'>
                                <Icon>map-marker</Icon>
                                <p
                                    className='venue'
                                    onClick={this.openVenuePage}
                                >
                                    {this.props.venue}
                                </p>
                            </div>
                        </div>
                        <button onClick={this.openTicketLink}>TICKETS</button>
                    </div>
                </div>
            </div>
        );
    }
}

const {func, object, string, number} = PropTypes;

EventTile.contextTypes = {
    push: func,
    router: object
};

EventTile.propTypes = {
    id: number,
    event: string,
    startDate: string,
    bannerImage: string,
    ticketLink: string,
    venue: string,
    address: string
};