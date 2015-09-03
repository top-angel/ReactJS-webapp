import React from 'react';
import FeaturedTile from './FeaturedTile';

var FeaturedContainer = React.createClass({
    // scrollLeft: function() {
    //     $('.featured-tiles').scrollTo(, 200, {axis: 'x'});
    // },
    // scrollRight: function() {
    //     $('.featured-tiles').scrollTo(, 200, {axis: 'x'});
    // },
    // scroll: function(direction) {
    //     var landingLength = this.props.activeLanding;
    //     $('.featured-tiles').scrollTo(, 200, {axis: 'x'});
    // },
    loadMoreEvents: function () {
        var ii = 0;
        var push = this.props.push;
        var data = this.props.data;
        var activeLanding = this.props.activeLanding;
        console.log(activeLanding);

        //TODO push next value of splitLanding to activeLanding
    },
    render: function() {
        var activeLanding = this.props.activeLanding;
        
        var featuredTiles = activeLanding.map(function(event, index) {
            return(<FeaturedTile data={event} key={index} dataId={event.id}/>);
        });

        return (
        <div id='FeaturedContainer' className='overlay-container flex-row'>
            <div className="featured-tiles overlay-container">
                {featuredTiles}
            </div>
            <div className="overlay flex-column left-arrow click">
                <i className="fa fa-2x fa-chevron-left center"/>
            </div>
            <div className="overlay flex-column right-arrow click">
                <i className="fa fa-2x fa-chevron-right center"/>
            </div>
        </div>
        );
    }
});

module.exports = FeaturedContainer;