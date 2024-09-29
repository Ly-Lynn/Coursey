import Header from './header_';

import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const DefaultHeader = () => <Header />;
