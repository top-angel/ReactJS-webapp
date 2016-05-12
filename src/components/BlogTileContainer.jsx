import React, {PropTypes} from 'react';
import BlogTile from './BlogTile';

const BlogTileContainer = ({blogs}) => (
	<div className='artist-tile-container'>
		{
			blogs.map((blog, index) => {
				return React.createElement(BlogTile, {
					author: blog.author,
					key: index,
					title: blog.title,
					blogId: blog.id,
                    s3Link: blog.s3_link,
                    dateCreated: blog.date_created
				})
			})
		}
	</div>
);

BlogTileContainer.propTypes = {
	blogs: PropTypes.array.isRequired
};

export default BlogTileContainer;
