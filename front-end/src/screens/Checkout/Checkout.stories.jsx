import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import store from '../../redux/stores/stores';
import mockStore from '../../redux/stores/mockStores';
import Checkout from './Checkout';
import { configureStore } from '@reduxjs/toolkit';

const meta = {
  title: 'Screens/Checkout',
  component: Checkout,
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
const Template = () => <Checkout />;
export const Default = Template.bind({});
