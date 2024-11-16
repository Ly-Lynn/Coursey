import NavBarAuth from './navBarAuth_';

import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 

export default {
  title: 'Components/Header/NavBarAuth',
  component: NavBarAuth,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const DefaultHeader = () => <NavBarAuth />;
