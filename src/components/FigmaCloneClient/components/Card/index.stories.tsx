import { Story, Meta } from "@storybook/react/types-6-0";
import { Card } from "./";

const meta: Meta = { title: "FigmaCloneClient/Card", component: Card };
export default meta;

const Template: Story<React.ComponentProps<typeof Card>> = (args) => (
  <Card {...args} />
);

export const Default = Template.bind({});
Default.args = {
  thumbnail: "https://picsum.photos/300",
  title: "title",
  description: "description",
};

export const Demo: React.VFC = () => {
  return (
    <div style={{ width: 300, margin: 32 }}>
      <Card
        thumbnail="https://picsum.photos/300"
        title="title"
        description="description"
      />
    </div>
  );
};
