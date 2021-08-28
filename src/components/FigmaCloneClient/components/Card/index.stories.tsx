import { Story, Meta } from "@storybook/react/types-6-0";
import { Card } from "./";

const meta: Meta = { title: "FigmaCloneClient/Card", component: Card };
export default meta;

const Template: Story<React.ComponentProps<typeof Card>> = (args) => (
  <Card {...args} />
);

export const Default = Template.bind({});
Default.args = {};
