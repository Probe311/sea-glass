import type { Preview } from '@storybook/react';
import '@sea-glass/css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'sea',
      values: [
        {
          name: 'sea',
          value: 'linear-gradient(160deg, #7ec8c0 0%, #3a8f9a 45%, #1e4d5c 100%)',
        },
        { name: 'sand', value: '#e8e2d6' },
        { name: 'ink', value: '#0c1a1f' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute(
          'data-sg-theme',
          context.globals.theme === 'dark' ? 'dark' : 'light',
        );
      }
      return Story();
    },
  ],
};

export default preview;
