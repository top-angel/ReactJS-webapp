module.exports = {
	flexContainer: function(direction='row', oldDirection='horizontal', wrap='nowrap') {
		return {
			display: 'flex',
			flexDirection: direction,
			flexFlow: `${direction} ${wrap}`,
			flexWrap: wrap
		}
	},
	flex: function(grow=1, shrink=1, basis='auto') {
		return {
			WebkitBoxFlex: `${grow} ${shrink} ${basis}`,
			MozBoxFlex: `${grow} ${shrink} ${basis}`,
			WebkitFlex: `${grow} ${shrink} ${basis}`,
			msFlex: `${grow} ${shrink} ${basis}`,
			flex: `${grow} ${shrink} ${basis}`
		}
	},
	flexDisplay: {
		display: 'flex'
	}
}