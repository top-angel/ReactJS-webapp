import React from 'react';
import tumblr from 'tumblr.js';

var client = tumblr.createClient({
  consumer_key: 'tSKIHQ8Gdp1PuZdh5fdTy2OgO1AabW2RTff1xMPTqnhrHv0vSt',
  consumer_secret: '9iTtxEOpICfZU8KxSDLAOQ2R18jtqw5WuYhPj651lMskIcbPPn',
  token: '53CUNecIf9VGnjGlvh71u1RcUwtafKAW0Nq4X2JOS6uP3pXCfu',
  token_secret: '9YHN2pAbYpsAMdVAVIN7BQDtsmQOwdo8EsdpY89Dv8Gij2CBwh'
});

var hostname = 'setmine.tumblr.com';
var api_key = 'tSKIHQ8Gdp1PuZdh5fdTy2OgO1AabW2RTff1xMPTqnhrHv0vSt';

const BlogWrapper = React.createClass({

	componentWillMount() {
		this.getBlogInfo();
	},

	getBlogInfo() {
		client.blogInfo('setmine.tumblr.com', (err, res) => {
			console.log(res);
		});
	},

	render() {
		return (
			<div />
		);
	}

});

export default BlogWrapper;