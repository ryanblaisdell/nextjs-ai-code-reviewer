import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Burger } from '@mantine/core';

export function NewConversationButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="AI Code Reviewer"
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
        <p>This is the content of the new conversation drawer.</p>
      </Drawer>

      <Burger color='white' onClick={open} opened={opened} />
    </div>
  );
}