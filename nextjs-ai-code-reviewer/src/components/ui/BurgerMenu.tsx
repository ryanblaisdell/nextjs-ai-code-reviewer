'use client'

import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Burger, Divider } from '@mantine/core';

export function NewConversationButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="AI CODE REVIEWER"
        position='left'
        offset={8}
        radius="md"
        size="xs"
        className='text-white'
        styles={{
          content: {
            backgroundColor: '#364153',
          },
          header: {
            backgroundColor: '#364153',
            color: '#919191ff',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          title: {
            flexGrow: 1,
            textAlign: 'center'
          }
        }}
        closeButtonProps={{
          style: {
            color: 'white',
          },
          className: "drawer-close-button"
        }}
      >
        <Button 
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          New Conversation
        </Button>
        <Divider my="md"/>
      </Drawer>

      <Burger color='white' onClick={open} opened={opened} />
    </div>
  );
}