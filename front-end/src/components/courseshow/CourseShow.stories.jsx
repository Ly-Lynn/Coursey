import CourseShow from './CourseShow';
import axios from 'axios';
import { withReduxProvider } from '../../../.storybook/preview'

const meta = {
  component: CourseShow,
  decorators: [withReduxProvider],
};

export default meta;

export const Default = () => <CourseShow />;