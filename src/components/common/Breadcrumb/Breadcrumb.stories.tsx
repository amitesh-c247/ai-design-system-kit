import type { Meta, StoryFn } from '@storybook/react';

import Breadcrumb from '.';

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/UPYLw23K7IgW1JH6RY7i6m/Leanspace-Design-System-(beta)?type=design&node-id=990-29387&mode=design&t=qe4OI2HIsD5tcv2r-0',
    },
  },
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = (args) => (
  <Breadcrumb
    {...args}
    crumbs={[
      {
        link: '/current-service',
        title: 'Current Service',
      },
      {
        link: '/current-service/sub-service',
        title: 'Sub Service',
      },
    ]}
  />
);

export const Basic = Template.bind({});
