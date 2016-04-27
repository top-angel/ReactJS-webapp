import React, {PropTypes} from 'react';
import R from 'ramda';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';

import Base from './Base';
import Loader from 'react-loader';
import DetailHeader from './DetailHeader';
import ArtistTileContainer from './ArtistTileContainer';
import Tab from './Tab';

export default class EventDetail extends Base {
    constructor(props) {
        super(props);
        this.autoBind('getEvent', 'openTicketLink', 'openMapLink');
        this.state = {
            loaded: false,
            event: '',
            date: '',
            ticketLink: null,
            lineup: [],
            eventImage: DEFAULT_IMAGE,
            venue: '',
            address: ''
        };
    }
    componentWillMount() {
        this.getEvent();
        this.context.push({ currentPage: 'Events' });
    }

    getEvent() {
        api.get(`events/id/${this.props.params.event}`).then(payload => {
            let e = payload.events_id;
            // this.context.push({ currentPage: e.event });
            this.setState({
                event: e.event,
                date: e.formatted_date,
                ticketLink: e.ticket_link,
                eventImage: e.banner_image.imageURL,
                venue: e.venue.venue,
                address: e.venue.address,
                lineup: e.lineup
            });
        }).then(() => {
            this.setState({ loaded: true });
        });
    }
    openMapLink(e) {
        e.stopPropagation();
        window.open(`http://google.com/maps/place/${this.state.address}`);
    }
    openTicketLink(e) {
        e.stopPropagation();
        window.open(this.state.ticketLink);
    }
    render() {
        return (
            <Loader loaded={this.state.loaded}>
                <div className='detail-view'>
                    <DetailHeader image={this.state.eventImage}>
                        <h3>{this.state.event}</h3>
                        <p>{this.state.date}</p>
                        <p title='Open in Google Maps' className='link' onClick={this.openMapLink}>{this.state.venue}</p>
                        {this.state.ticketLink ? 
                            <p id='DetailButton' onClick={this.openTicketLink}>TICKETS</p>
                            :
                            null
                        }
                    </DetailHeader>
                    <div className='tab'>
                        <p>LINEUP</p>
                    </div>
                    <ArtistTileContainer artists={this.state.lineup} />
                </div>
            </Loader>
        );
    }
}

EventDetail.contextTypes = {
    push: PropTypes.func
};