import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import R from 'ramda';
import api from '../services/api';
import byteStream from '../services/byteStream';
import {DEFAULT_IMAGE} from '../constants/constants';
import ReactMarkdown from 'react-markdown';

import Base from './Base';
import DetailHeader from './DetailHeader';
// import SocialMediaLinks from './SocialMediaLinks';
import ShuffleButton from './ShuffleButton';
import Tabs from './Tabs';
import Tab from './Tab';

const tabStyle = {
	position: 'relative',
	top: 0
};

export default class BlogPost extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getPost');
		this.state = {
			loaded: false,
			post: '',
            markdownFile: null
		};
	}
	componentWillMount() {
		this.getPost();
		this.context.push({ currentPage: 'Blog Post' });
	}
	getPost() {
		var blogId = this.props.params.blog_id;
        console.log(blogId);
		var queryString = `{
            blog_post (id: ${blogId}) {
                id,
                title,
                author,
                s3_link
            }
        }`;
        console.log('==queryString==');
        console.log(queryString);


		api.graph({query: queryString}).then(response => {
            console.log('==response.payload.blog_post==');
            console.log(response.payload.blog_post);


            this.setState({
                post: response.payload.blog_post
            });
		}).then(() => {
            console.log('==fetching markdown file...==');
            return byteStream.download(this.state.post.s3_link);
        }).then(blob => {
            console.log('==blob==');
            console.log(blob);
            return byteStream.readBlob(blob);
        }).then((base64string) => {
            return byteStream.decode(base64string);
        }).then((decodedString) => {
            console.log('==decodedString==');
            console.log(decodedString);

            this.setState({
                markdownFile: decodedString
            });
        }).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<div className='detail-view'>
						<h3>{this.state.post.title}</h3>
						<h5>{this.state.post.author}</h5>
				</div>
                <ReactMarkdown className='markdown-post' source={this.state.markdownFile} />
			</Loader>
		);
	}
}

BlogPost.contextTypes = {
	push: PropTypes.func
};
