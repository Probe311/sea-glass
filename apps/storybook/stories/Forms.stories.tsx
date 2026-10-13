import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Checkbox,
  PasswordField,
  Radio,
  Search,
  Segmented,
  Select,
  Slider,
  Switch,
  TextField,
} from '@seaglass/react';

const meta: Meta = {
  title: 'Forms/Overview',
};

export default meta;
type Story = StoryObj;

export const Controls: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 360 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <TextField label="Email" placeholder="you@sea.glass" />
      <PasswordField label="Password" />
      <Select
        label="Pebble"
        options={[
          { value: 'seafoam', label: 'Seafoam' },
          { value: 'kelly', label: 'Kelly' },
        ]}
      />
      <Search placeholder="Search…" />
      <Checkbox label="Remember me" defaultChecked />
      <Radio name="tone" label="Aqua" defaultChecked />
      <Switch label="Alive" />
      <Segmented
        label="Density"
        options={[
          { value: 'comfy', label: 'Comfy' },
          { value: 'compact', label: 'Compact' },
        ]}
      />
      <Slider label="Blur" unit="px" defaultValue={24} min={0} max={48} />
    </div>
  ),
};
