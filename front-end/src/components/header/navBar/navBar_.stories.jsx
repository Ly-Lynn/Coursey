import NavBar from './navBar_';

import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 

export default {
  title: 'Components/Header/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const DefaultHeader = () => <NavBar />;
