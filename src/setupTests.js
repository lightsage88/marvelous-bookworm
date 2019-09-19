import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});
import $ from "jquery";

import * as jQuery from 'jquery';
import 'jquery-ui/themes/base/resizable.css';
import("jquery-ui/ui/effects/effect-slide.js");


window.jQuery = $;
require('jquery-ui');
require('jquery-ui/ui/version');
// require('jquery-ui/ui/effects');
require('jquery-ui/ui/plugin');
require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/mouse');
require('jquery-ui/ui/widgets/resizable');
window.$ = window.jQuery = jQuery;
global.$ = global.jQuery = jQuery;
global.define = $;

