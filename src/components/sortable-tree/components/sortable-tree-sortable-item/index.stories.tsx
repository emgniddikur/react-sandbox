import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SortableTreeSortableItem, SortableTreeSortableItemProps } from './';

export default {
  title: 'SortableTree/SortableTreeSortableItem',
  component: SortableTreeSortableItem,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof SortableTreeSortableItem>;

const Template: ComponentStory<typeof SortableTreeSortableItem> = (args) => (
  <SortableTreeSortableItem {...args} />
);

export const defaultProps: SortableTreeSortableItemProps = {};

export const Default = Template.bind({});
Default.args = defaultProps;
