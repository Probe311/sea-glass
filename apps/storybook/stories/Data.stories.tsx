import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Card, FileUpload, Hero, Quote, Table, Tag, Tile } from '@sea-glass/react';

const meta: Meta = {
  title: 'Data/Overview',
};

export default meta;
type Story = StoryObj;

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 480 }}>
      <Hero title="Sea Glass." subtitle="Frosted material for interfaces." />
      <Card tint="seafoam" style={{ padding: 16 }}>
        <Badge>alpha</Badge> <Tag>glass</Tag>
      </Card>
      <Tile href="#" title="Tokens" tint="aqua">
        Twelve pebbles.
      </Tile>
      <Quote cite="Sea Glass docs">Translucency before decoration.</Quote>
      <Table
        caption="Pebbles"
        columns={[
          { key: 'name', header: 'Name', sortable: true, cell: (r) => r.name },
          { key: 'hex', header: 'Role', cell: (r) => r.role },
        ]}
        rows={[
          { name: 'Seafoam', role: 'primary' },
          { name: 'Amber', role: 'warning' },
        ]}
      />
      <FileUpload label="Drop logos or browse" accept="image/*" />
    </div>
  ),
};
