import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, Alert, Banner, Callout, Progress, Tabs } from '@sea-glass/react';

const meta: Meta = {
  title: 'Feedback/Overview',
};

export default meta;
type Story = StoryObj;

export const Alerts: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <Alert tone="info" title="Info">
        Rim light follows the pointer.
      </Alert>
      <Alert tone="success" title="Saved">
        Draft published.
      </Alert>
      <Banner tone="warning" title="Reduced transparency">
        Glass falls back to opaque surfaces.
      </Banner>
      <Callout title="Callout" highlight>
        Secondary emphasis on glass.
      </Callout>
      <Progress label="Upload" value={64} />
      <Tabs
        items={[
          { id: 'a', label: 'Material', panel: 'Frost, rim, tint.' },
          { id: 'b', label: 'Motion', panel: 'Spring tokens.' },
        ]}
      />
      <Accordion
        items={[
          { id: '1', title: 'What is frosted?', content: 'Backdrop blur on a scene.' },
          { id: '2', title: 'What is rim?', content: 'Edge highlight toward the light.' },
        ]}
      />
    </div>
  ),
};
