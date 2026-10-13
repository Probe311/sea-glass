import type { Meta, StoryObj } from '@storybook/react';
import { Glass } from '@sea-glass/react';

const meta: Meta<typeof Glass> = {
  title: 'Surface/Glass',
  component: Glass,
  args: {
    children: 'Sea glass surface',
    style: { padding: '1.5rem 2rem', minWidth: 220 },
  },
};

export default meta;
type Story = StoryObj<typeof Glass>;

export const Default: Story = {};
export const Frosted: Story = { args: { frosted: true } };
export const TintKelly: Story = { args: { tint: 'kelly' } };
