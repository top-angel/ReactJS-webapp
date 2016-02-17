import React, {PropTypes} from 'react';
import Icon from './FaIcon';

const SocialMediaLinks = ({links}) => {
	// for(var l in links) {
	// 	if(typeof links[l].url == 'undefined') {
	// 		var hidden = 'hidden';
	// 	} else {
	// 		var hidden = '';
	// 	}
	// }
	return (
		<div id='SocialMediaLinks' className='flex-row'>
			{
				links.map((link, index) => (
					<a className='' href={link.url} key={index}>
						<Icon>{link.type}</Icon>
					</a>
				))
			}
		</div>
	)
}

SocialMediaLinks.propTypes = {
	links: PropTypes.array
};

export default SocialMediaLinks;