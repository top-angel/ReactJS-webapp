import React from 'react';

var hostname = 'setmine.tumblr.com',
	api_key = 'tSKIHQ8Gdp1PuZdh5fdTy2OgO1AabW2RTff1xMPTqnhrHv0vSt';


const BlogWrapper = React.createClass({

	componentWillMount() {
		this.getBlogInfo();
	},

	getBlogInfo() {
		$.ajax({
			type:'get',
			url: `https://api.tumblr.com/v2/blog/${hostname}/info`,
			dataType: 'jsonp',
			data: {
				api_key: api_key
			}
		})
		.done(res => {
			if(res.meta.msg === 'OK') {
				// do something with blog info
				console.log(res.response.blog);
			}
		})
		.fail(err => {
			console.error(err);
		});
	},

	render() {
		return (
			<div/>
		);
	}

});

export default BlogWrapper;