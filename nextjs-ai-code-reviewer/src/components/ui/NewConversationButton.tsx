import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

export function NewConversationButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer className='absolute' opened={opened} onClose={close} title="New Conversation">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        New Conversation
      </Button>
    </>
  );
}