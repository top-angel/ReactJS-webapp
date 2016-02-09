import React, {PropTypes} from 'react';
import Icon from './FaIcon';

const LinkButtonContainer = ({links}) => {
	for(var l in links) {
		if(typeof links[l].url == 'undefined') {
			var hidden = 'hidden';
		} else {
			var hidden = '';
		}
	}
	return (
		<div className={`links-container flex-row ${hidden}`}>
			{
				links.map((link, index) => {
					let className = `fa fa-fw fa-2x center click fa-${link.type}`;
					if(!!link.url) {
						return (
							<a className='flex set-flex' href={link.url} key={index}>
								<i className={className}/>
							</a>
						);
					}
				})
			}
		</div>
	)
}

LinkButtonContainer.propTypes = {
	links: PropTypes.array
};

export default LinkButtonContainer;