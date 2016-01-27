import React, {PropTypes} from 'react'
import BaseComponent from './BaseComponent'

export default function(InnerComponent) {
	class InfiniteScrollify extends BaseComponent {
		constructor(props) {
			super(props)
			this.autoBind('onScroll')
		}
		componentDidMount() {
			window.addEventListener('scroll', this.onScroll, false)
		}
		componentWillUnmount() {
			window.removeEventListener('scroll', this.onScroll, false)
		}
		onScroll() {
			// may need to change to set container height
			if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
				this.props.onScroll()
			}
		}
		render() {
			return <InnerComponent {...this.props} />
		}
	}

	InfiniteScrollify.propTypes = {
		onScroll: PropTypes.func.isRequired
	}

	return InfiniteScrollify
}