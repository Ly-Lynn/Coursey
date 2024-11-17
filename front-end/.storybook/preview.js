import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/redux/stores/rootReducers';
import { MemoryRouter } from 'react-router-dom';
import '../src/App.css'; 
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  devTools: true, 
});

export const decorators = [
  (Story) => (
    <Provider store={store}>
      {/* <MemoryRouter>  */}
        <Story />
      {/* </MemoryRouter> */}
    </Provider>
  ),
];
