import React, {PropTypes} from 'react';
import FestivalTile from './FestivalTile';

const FestivalContainer = ({festivals}) => (
	<div className='tile-container'>
		{
			festivals.map((festival, index) => {
				return React.createElement(FestivalTile, {
					key: index,
					id: festival.event.id,
					festival: festival.event.event,
					bannerImage: festival.event.banner_image.imageURL,
					setCount: festival.event.set_count,
					formattedDate: festival.event.formatted_date
				})
			})
		}
	</div>
);

FestivalContainer.propTypes = {
	festivals: PropTypes.array
};

export default FestivalContainer;