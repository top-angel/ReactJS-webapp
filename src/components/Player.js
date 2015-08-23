import React from 'react';

var PlayerControl = require('./PlayerControl');
var PlayerSeek = require('./PlayerSeek');
var PlayerSetInfo = require('./PlayerSetInfo');
var PlayerTrackInfo = require('./PlayerTrackInfo');


var Player = React.createClass({

  displayName: 'Player',

	render: function() {
	  console.log('player props', this.props);

    return (
      <div className='player flex-row'>
          <PlayerControl />
          <div className='flex-column flex'>
              <PlayerSeek />
              <div className='flex-row flex'>
                  <PlayerSetInfo set={this.props.set}/>
                  <PlayerTrackInfo track={this.props.set}/>
              </div>
          </div>
      </div>
    );
	}
});

var PlayerWrapper = React.createClass({
  displayName: 'PlayerWrapper',

  render: function() {

    var push = this.props.pushFn;
    var appState = this.props.appState; // <- IMMUTABLE MAP
    var Rh = this.props.routeHandler;

    var currentSet = appState.get('currentSet'); // <- NOT IMMUTABLE MAP

    return (
      <div>
        <Rh />
        <Player set={currentSet} pushFn={push} />
      </div>
    );
  }
});

module.exports = PlayerWrapper;
