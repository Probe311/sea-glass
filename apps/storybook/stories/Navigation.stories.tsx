import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, Footer, Header, Pagination, Sidebar, Stepper, Toc } from '@seaglass/react';

const meta: Meta = {
  title: 'Navigation/Overview',
};

export default meta;
type Story = StoryObj;

export const Chrome: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 520 }}>
      <Header
        brand="Sea Glass."
        nav={[
          { href: '#', label: 'Docs', current: true },
          { href: '#', label: 'Tokens' },
        ]}
      />
      <Breadcrumbs
        items={[
          { href: '#', label: 'Docs' },
          { href: '#', label: 'Components' },
          { label: 'Header', current: true },
        ]}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16 }}>
        <Sidebar
          label="Guide"
          items={[
            { href: '#', label: 'Material', current: true },
            { href: '#', label: 'Forms' },
          ]}
        />
        <Toc
          items={[
            { href: '#a', label: 'Frost', current: true },
            { href: '#b', label: 'Rim' },
          ]}
        />
      </div>
      <Stepper
        steps={[
          { label: 'Tokens', state: 'done' },
          { label: 'CSS', state: 'current' },
          { label: 'React', state: 'todo' },
        ]}
      />
      <Pagination page={2} pageCount={5} />
      <Footer
        links={[
          { href: '#', label: 'MIT' },
          { href: '#', label: 'GitHub' },
        ]}
      >
        Sea Glass · alpha
      </Footer>
    </div>
  ),
};
