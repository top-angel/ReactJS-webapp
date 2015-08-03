var React = require('react');

var SearchResultsView = React.createClass({
	getInitialState: function() {
			return {
				type: 'sets' 
			};
		},
	render: function() {
		return (
			<div id="search-results" className="view overlay-container hidden">
                <div className="flex-row view-title-container sets">
                    <div className="view-title sets results-filter flex set-flex">
                        <div className="center">Sets</div>
                    </div>
                    <div className="view-title events results-filter flex set-flex">
                        <div className="center">Events</div>
                    </div>
                    <div className="view-title tracks results-filter flex set-flex">
                        <div className="center">Tracks</div>
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="search-results"></div>
            </div>
		);
	}
});

module.exports = SearchResultsView;