/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import App from './App';

//TODO
// All type of input
// Breadcrumb
// DatePicker
// ColorPicker
// Slider
// Tree
// Avatar
// Badge
// Collapse
// Popover
// Rate
// Segmented
// Tag
// Notification
// Modal
// Tabs
// Progress/Spin
// Popconfirm
// Context menu (but not wrapper other)

// add disabled to all component (plus pointer events none)
// change all click from border change to changing opacity ver slightly like on input with end button
// Smart Table

render(() => <App />, document.getElementById('root') as HTMLElement);
