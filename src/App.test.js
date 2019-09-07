import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';
import {mount, shallow} from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App/>)
});
