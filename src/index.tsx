/* @refresh reload */
import { render } from 'solid-js/web';

import '@simonwep/pickr/dist/themes/nano.min.css';
import './index.scss';
import App from './App';

//TODO
//========== Easy
// DatePicker https://flatpickr.js.org/examples/
// Avatar
// Rate
// Progress/Spin
//===== Chalanging
// Popconfirm
// Context menu (but not wrapper other)
// Notification
// Modal

// add disabled to all component (plus pointer events none)
// autocomplete has some problems (when delted or selected something)
// tab needs mode functionality (remove, color change)
// add scroll in listview

// Hard
// Smart Table

render(() => <App />, document.getElementById('root') as HTMLElement);

// very cool library has style like figma https://react-spectrum.adobe.com/react-spectrum/index.html
