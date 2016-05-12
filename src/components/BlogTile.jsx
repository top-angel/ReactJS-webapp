import React, {PropTypes} from 'react';
import {S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE} from '../constants/constants';

const BlogTile = ({title, author, s3Link, dateCreated, blogId}, {router}) => {
	function openBlogPage() {
		router.push(`/blogs/${blogId}`);
	}

	return (
		<div className='col-xs-6 col-sm-4 col-md-3 col-lg-2'>
			<div className='artist-tile flex-column' onClick={openBlogPage}>
				<img src={S3_ROOT_FOR_IMAGES+DEFAULT_IMAGE} />
				<h5>{title}</h5>
				<p>{author}</p>
			</div>
		</div>
	);
}

const {object, string, number} = PropTypes;

BlogTile.contextTypes = {
	router: object
};

export default BlogTile;
