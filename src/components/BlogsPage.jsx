import _ from 'underscore';
import React, {PropTypes} from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';
import {filterWithoutSets} from '../services/utilities';

import Base from './Base';
import BlogTileContainer from './BlogTileContainer';
import Footer from './Footer';
import Spinner from './Spinner';

export default class BlogsPage extends Base {
	constructor(props) {
		super(props);
		this.autoBind('fetchBlogs');
		this.state = {
			loaded: false,
			blogs: []
		};
		this.fetchBlogs();
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Blog Posts' });
	}
	fetchBlogs() {
        var queryString = `{
            blog_posts {
                id,
                title,
                author,
                s3_link,
                date_created
            }
        }`;

		api.graph({query: queryString}).then(response => {
            console.log(response);
			this.setState({
                blogs: response.payload.blog_posts,
				loaded: true
			});
		});
	}
	render() {
		return (
			<div className='artists'>
				<Loader loaded={this.state.loaded}>
					<BlogTileContainer blogs={this.state.blogs}/>
				</Loader>
				<Footer />
			</div>
		);
	}
}

BlogsPage.contextTypes = {
	push: PropTypes.func
};
