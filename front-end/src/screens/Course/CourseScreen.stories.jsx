import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import store from '../../redux/stores/stores';
import mockStore from '../../redux/stores/mockStores';
import CourseScreen from './CourseScreen';
import { configureStore } from '@reduxjs/toolkit';

const meta = {
  title: 'Screens/CourseScreen',
  component: CourseScreen,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
};

export default meta;
const Template = () => <CourseScreen />;
export const Default = Template.bind({});
