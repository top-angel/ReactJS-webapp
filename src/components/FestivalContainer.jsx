import React, {PropTypes} from 'react';
import FestivalTile from './FestivalTile';

const FestivalContainer = ({festivals}) => (
	<div className='tile-container'>
		{
			festivals.map((festival, index) => {
				return React.createElement(FestivalTile, {
					key: index,
					id: festival.id,
					festival: festival.event,
					bannerImage: festival.banner_image.imageURL,
					setCount: festival.set_count,
					formattedDate: festival.formatted_date
				})
			})
		}
	</div>
);

FestivalContainer.propTypes = {
	festivals: PropTypes.array
};

export default FestivalContainer;