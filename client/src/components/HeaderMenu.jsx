import { Menu, Button, Text, rem, ActionIcon } from "@mantine/core";
import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconMenu2
} from "@tabler/icons-react";

function HeaderMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div>
          <ActionIcon color="brand" size={'lg'} variant="filled" aria-label="Settings">
            <IconMenu2
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Gallery
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default HeaderMenu;
