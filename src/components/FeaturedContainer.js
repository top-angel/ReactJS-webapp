import React from 'react';
import constants from '../constants/constants';
import splice from '../services/splice';
import Loader from 'react-loader';

import FeaturedTile from './FeaturedTile';

var FeaturedContainer = React.createClass({
    
    getInitialState: function() {
        return {
            loaded: false
        };
    },
    componentWillMount: function() {
        this.getLandingEvents();
    },
    getLandingEvents: function() {
        var push = this.props.push;
        var landingUrl = constants.API_ROOT + 'landing';
        var _this = this;

        $.ajax({
            url: landingUrl,
            type: 'GET'
        })
        .done(function(response) {
            var landingEvents = response.payload.landing;
            splice.bigArray(landingEvents, 25);
            console.log(landingEvents);

            push({
                type: 'SHALLOW_MERGE',
                data: {
                    landingEvents: landingEvents
                }
            });

            _this.setState({
                loaded: true
            });
        });
    },
    render: function() {
        var landingEvents = this.props.appState.get('landingEvents');
        var push = this.props.push;
        
        var featuredTiles = landingEvents.map(function(event, index) {
            return(
                <FeaturedTile
                    data={event}
                    key={index}
                    dataId={event.id}
                    push={push} />
            );
        });

        return (
            <Loader loaded={this.state.loaded}>
                <div id='FeaturedContainer'>
                    <div className='container'>
                        {featuredTiles}
                    </div>
                </div>
            </Loader>
        );
    }
});

// <div className="featured-tiles overlay-container">
//                     {featuredTiles}
//                 </div>
// <div className="overlay flex-column left-arrow click">
//                 <i className="fa fa-2x fa-chevron-left center"/>
//             </div>
//             <div className="overlay flex-column right-arrow click">
//                 <i className="fa fa-2x fa-chevron-right center"/>
//             </div>

module.exports = FeaturedContainer;