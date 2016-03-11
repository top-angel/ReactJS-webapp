import {render} from 'react-dom';
import routes from './routes';

// styling
import './styles/index.less';

const bodyMount = document.getElementById('body-mount-point');

render(
	routes	
, bodyMount);

mixpanel.track("Page Load");