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
			// console.log('distance scrolled', window.scrollY)
			// console.log('window inner height', window.innerHeight)
			// console.log('total page height', document.body.offsetHeight)
			if(this.props.onScroll) {
				if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
					this.props.onScroll()
				}
			}
		}
		render() {
			return <InnerComponent {...this.props} />
		}
	}

	return InfiniteScrollify
}