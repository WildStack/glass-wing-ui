/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import App from './App';

//TODO
//========== Easy
// DatePicker
// ColorPicker
// Slider
// Avatar
// Rate
// Progress/Spin
//===== Chalanging
// Popconfirm
// Context menu (but not wrapper other)
// Notification
// Modal

// add disabled to all component (plus pointer events none)
// autocomplete has some problems
// tab needs mode functionality (remove, color change)
// add scroll in listview

// Hard
// Smart Table

render(() => <App />, document.getElementById('root') as HTMLElement);
