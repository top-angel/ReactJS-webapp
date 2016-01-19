import React from 'react';
import $ from 'jquery';

var AlphabetScroller = React.createClass({

	// componentDidMount() {
	// 	$('#AlphabetScroller div').on('click', function(event) {
	// 		event.stopPropagation();
	// 		var letter = event.target.innerText;
	// 		console.log(letter);

	// 		var artist = $('.artist-tile').attr('firstLetter');
	// 		var target = $(".artist-tile[attribute^='"+letter+"']");

	// 		console.log(target.scrollTop());

	// 		window.scrollTo(0, target.scrollTop());
	// 	});
	// },

	createAlphabet(start, stop) {
		var alphabet = [];
		for (var i=start.charCodeAt(0),end=stop.charCodeAt(0); i <= end; ++i){
			alphabet.push(String.fromCharCode(i));
		}
		return alphabet;
	},

	render() {
		var alphabet = this.createAlphabet('A', 'Z');
		var letters = alphabet.map((letter, index) => {
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