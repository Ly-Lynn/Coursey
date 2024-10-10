// .storybook/preview.js or in a separate file
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/stores/stores';

export const withReduxProvider = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export const decorators = [withReduxProvider];