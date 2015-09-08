import React from 'react';

var AlphabetScroller = React.createClass({

	componentDidMount: function() {
		$('#AlphabetScroller div').on('click', function(event) {
			event.stopPropagation();
			var letter = event.target.innerText;
			console.log(letter);

			var artist = $('.artist-tile[firstLetter^=' + letter + ']');
			console.log(artist);
			console.log(artist.scrollTop());


			debugger;
			window.scrollTo(0, 400);
		});
	},
	createAlphabet: function(start, stop) {
		var alphabet = [];
		for (var i=start.charCodeAt(0),end=stop.charCodeAt(0); i <= end; ++i){
			alphabet.push(String.fromCharCode(i));
		}
		return alphabet;
	},
	render: function() {
		var alphabet = this.createAlphabet('A', 'Z');
		var letters = alphabet.map(function(letter, index) {
			return <div className='flex-fixed' key={index}>{letter}</div>
		})

		return (
			<div id='AlphabetScroller' className='flex-column click'>
				{letters}
			</div>
		);
	}

});

module.exports = AlphabetScroller;