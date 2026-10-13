import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '@sea-glass/react';

const meta: Meta<typeof Dialog> = {
  title: 'Overlay/Dialog',
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Open: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button type="button" className="sg-button sg-glass" onClick={() => setOpen(true)}>
          Open dialog
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Discard draft?"
          footer={
            <>
              <button
                type="button"
                className="sg-button sg-glass sg-button--ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sg-button sg-glass sg-button--primary"
                onClick={() => setOpen(false)}
              >
                Discard
              </button>
            </>
          }
        >
          Unsaved changes will be lost. This cannot be undone.
        </Dialog>
      </>
    );
  },
};
