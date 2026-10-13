import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem } from '@sea-glass/react';

const meta: Meta<typeof Menu> = {
  title: 'Overlay/Menu',
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: () => (
    <Menu label="Actions">
      <MenuItem>Edit</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuItem disabled>Archive</MenuItem>
    </Menu>
  ),
};
