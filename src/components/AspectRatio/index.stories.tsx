import { Meta, Story } from '@storybook/react/types-6-0';

import { AspectRatio, AspectRatioProps } from './';

const meta: Meta = {
  title: 'AspectRatio',
  component: AspectRatio,
  excludeStories: ['defaultProps'],
};
export default meta;

const Template: Story<React.ComponentProps<typeof AspectRatio>> = (args) => (
  <AspectRatio {...args} />
);

export const defaultProps: AspectRatioProps = {
  ratio: 3 / 4,
  children: (
    <img
      src="https://picsum.photos/200"
      alt="random"
      style={{ objectFit: 'cover' }}
    />
  ),
};

export const Default = Template.bind({});
Default.args = defaultProps;
