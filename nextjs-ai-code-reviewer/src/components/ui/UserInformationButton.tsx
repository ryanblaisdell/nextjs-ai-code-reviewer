import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { useSession } from 'next-auth/react';

export function UserInformationButton() {
    const { data: session } = useSession();

  return (
    <UnstyledButton className='mr-2 ml-2 mt-0 mb-2' style={{ borderTop: "1px solid #444c59" }}>
      <Group className="mt-2">
        <Avatar
            radius="xl"
            color="initials"
            name={session?.user.name!}
            allowedInitialsColors={['gray']}
            style={{ border: "1px solid grey" }}
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} c="white">
            {session?.user.name}
          </Text>

          <Text c="dimmed" size="xs">
            {session?.user.email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
