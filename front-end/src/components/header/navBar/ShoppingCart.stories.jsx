import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ShoppingCart from './ShoppingCart';

// Mock reducer để giả lập state
const mockReducer = (state = { user: { orders: [] } }, action) => {
  switch (action.type) {
    case 'user/removeOrder':
      return {
        ...state,
        user: {
          ...state.user,
          orders: state.user.orders.filter(order => order.course_id !== action.payload),
        },
      };
    default:
      return state;
  }
};

// Tạo store giả
const mockStore = configureStore({
  reducer: mockReducer,
  preloadedState: {
    user: {
      orders: [
        { course_id: 1, course_name: 'Introduction to Machine Learning', cost: 29.99, image: 'https://via.placeholder.com/70', lecturer_name: 'John Doe' },
        { course_id: 2, course_name: 'Advanced Python Programming', cost: 49.99, image: 'https://via.placeholder.com/70', lecturer_name: 'Jane Smith' },
      ],
    },
  },
});

export default {
  title: 'Components/Header/NavBar',
  component: ShoppingCart,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export const DefaultShoppingCart = () => <ShoppingCart />;
