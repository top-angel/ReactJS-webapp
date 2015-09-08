import React from 'react';

var PlayerTrackInfo = React.createClass({
  displayName: 'PlayerTrackInfo',

	render: function() {

    //var track = this.props.appState.get('currentTrack').setSMObject.trackname;
    var favoriteClass = 'fa fa-fw click fa-star-o' || 'fa fa-fw fa-star';

		return (
			<div className="player-track-info flex-row flex-fixed">
                        <div className="current-track center flex">kushdank</div>
                        <i className="fa fa-fw fa-star-o click"/>
                        <i className="fa fa-fw fa-bars click"/>
                        <i className="fa fa-fw fa-share click"/>
                    </div>
		);
	}
});

module.exports = PlayerTrackInfo;
