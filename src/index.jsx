import {render} from 'react-dom';
import routes from './routes';

// styling
import './styles/index.less';

const bodyMount = document.getElementById('body-mount-point');
console.log('bodyMount')
console.log(bodyMount)

render(
	routes	
, bodyMount);

mixpanel.track("Page Load");