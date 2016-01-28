import React from 'react';
import NavMenu from './NavMenu';
import CssModules from 'react-css-modules'
import styles from '../../public/css/sets.css'

const navItems = [
	{
		text: 'Recent',
		link: '/sets',
		icon: 'fa fa-fw fa-clock-o',
		onlyActiveOnIndex: true
	},
	{
		text: 'Popular',
		link: '/sets/popular',
		icon: 'fa fa-fw fa-heart',
		onlyActiveOnIndex: false
	},
	{
		text: 'Festivals',
		link: '/sets/festivals',
		icon: 'fa fa-fw fa-flag',
		onlyActiveOnIndex: false
	},
	{
		text: 'Mixes',
		link: '/sets/mixes',
		icon: 'fa fa-fw fa-headphones',
		onlyActiveOnIndex: false
	}
]

const Sets = (props) => (
	<div styleName='sets'>
		<NavMenu navItems={navItems}/>
		{
			React.cloneElement(props.children, {
				appState: props.appState
			})
		}
	</div>
)

export default CssModules(Sets, styles);