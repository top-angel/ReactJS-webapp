import React from 'react'

export default class BaseComponent extends React.Component {
	autoBind(...methods) {
		methods.forEach(method => this[method] = this[method].bind(this))
	}
}