import type { Meta, StoryObj } from '@storybook/react';
import { Divider, List, ListItem } from '@seaglass/react';

const meta: Meta<typeof List> = {
  title: 'Data/List',
  component: List,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Basic: Story = {
  render: () => (
    <List>
      <ListItem meta="Primary">Seafoam</ListItem>
      <ListItem selected meta="Selected">
        Kelly
      </ListItem>
      <Divider />
      <ListItem asButton meta="Action">
        Citron
      </ListItem>
    </List>
  ),
};
