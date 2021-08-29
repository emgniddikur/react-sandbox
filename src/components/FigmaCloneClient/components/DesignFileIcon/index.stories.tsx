import { Story, Meta } from "@storybook/react/types-6-0";
import { DesignFileIcon } from "./";

const meta: Meta = {
  title: "FigmaCloneClient/DesignFileIcon",
  component: DesignFileIcon,
};
export default meta;

const Template: Story<React.ComponentProps<typeof DesignFileIcon>> = (args) => (
  <DesignFileIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
