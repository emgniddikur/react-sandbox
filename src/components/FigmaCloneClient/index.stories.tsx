import { Story, Meta } from "@storybook/react/types-6-0";
import { FigmaCloneClient } from "./";

const meta: Meta = { title: "FigmaCloneClient", component: FigmaCloneClient };
export default meta;

const Template: Story<React.ComponentProps<typeof FigmaCloneClient>> = (
  args,
) => <FigmaCloneClient {...args} />;

export const Default = Template.bind({});
Default.args = {};
