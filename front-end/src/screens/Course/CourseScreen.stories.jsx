import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/stores/stores';
import CourseScreen from './CourseScreen';

const meta = {
  component: CourseScreen,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
};

export default meta;

export const Default = () => <CourseScreen />;