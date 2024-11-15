// MyComponent.stories.jsx
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CourseInfoPage from './CourseInfo';

export default {
  title: 'course/CourseInfo',
  component: CourseInfoPage,
};

const Template = (args) => (
  <MemoryRouter initialEntries={['/courseinfo?courseID=1']}>
    <Routes>
      <Route path="/courseinfo" element={<CourseInfoPage {...args} />} />
    </Routes>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  // các props của MyComponent
};
