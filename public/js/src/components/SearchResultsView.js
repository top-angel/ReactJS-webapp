var React = require('react');
var Rx = require('rx');
var Ramda = require('ramda')

var SearchResultsView = React.createClass({
	componentDidMount: function() {
		this._attachStream();
	},
	_attachStream: function() {
		var _this = this;

		//may delete and receive from props
		function updateCurrentValue(val) {
			_this.setState({
				currentValue: val 
			});
		}

		function updateSearchResults(results) {
			_this.setState({
				results: results 
			});
		}

		var dataSet = {};
		var fixedDataSet = Ramda.map(function(str) {
			return {
				source: str
			};
		}, dataSet);

		function resetSearchResults() {
			_this.setState({
				results: fixedDataSet
			})
		}

		resetSearchResults();

		// _this.props.inputValueStream
		// 	.onValue(updateCurrentValue);
		// _this.props.inputValueStream
		// 	.filter(Ramda.compose(Ramda.not, Ramda.isEmpty))
		// 	.map(getSearchResults)
		// 	.onvalue(updateSearchResults)
		// _this.props.inputValuestream
		// 	.filter(Ramda.isEmpty)
		// 	.onValue(resetSearchResults)
	},
	render: function() {
		var results;
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
				<div className="search-results">
					{results}
				</div>
          </div>
		);
	}
});

module.exports = SearchResultsView;