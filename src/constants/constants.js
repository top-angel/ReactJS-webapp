//TODO change to version 8 and make sure all requests work
var API_VERSION = 10;

var API_BASE_URL = 'https://api.setmine.com';
var API_ROOT = `${API_BASE_URL}/v/${API_VERSION}/`;

var S3_ROOT = 'https://s3.amazonaws.com/stredm/namecheap/';
var S3_ROOT_FOR_IMAGES = 'https://d1wbxby8dwa4u.cloudfront.net/namecheap/';
var DEFAULT_IMAGE = 'ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png';
var IMAGE_ROOT = '/images/';
var ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.setmine.android';
var IOS_URL = 'https://itunes.apple.com/us/app/setmine/id921325688?mt=8';
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var colors = {
	purple: '#9b59b6',
	blue: '#22a7f0',
	white: '#f7f7f7',
	lightGray: '#dadfe1',
	darkGray: '#313542',
	orange: '#f78e57',
	red: '#ff4e4e',
	salmon: '#ff8181',
	green: '#36d7b7',
	yellow: '#f5d76e',
	fb: '#3b5998',
	twitter_: '#55acee',
	instagram: '#3f729b',
	soundcloud: '#ff8800',
	youtube: '#cd201f'
}

module.exports =  {
	S3_ROOT: S3_ROOT,
	S3_ROOT_FOR_IMAGES: S3_ROOT_FOR_IMAGES,
	API_ROOT: API_ROOT,
	months: months,
	colors: colors
};
