import { Avatar, Group, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export default function UserProfile({ user }) {
  if (!user) return "";
  const {t}=useTranslation()

  return (
    <Stack spacing={'xs'}>
      <Group gap="sm" noWrap>
        <div>
          <Title order={4} >
            {`${user?.firstName} ${user?.lastName} `}
          </Title>
          <Text fz="xs" c="dimmed">
            {user?.email}
          </Text>
        </div>
      </Group>
      <Group spacing="xs" noWrap>
        <Text fz="sm" fw={500}>
        {`${t("Phone")}: `}
        </Text>
        <Text fz="xs" c="dimmed">
          {user?.phone}
        </Text>
      </Group>
      <Group>
        <Text fz="sm" fw={500}>
        {`${t("Company")}: `}
        </Text>
        <Text fz="xs" c="dimmed">
          {user?.company}
        </Text>
      </Group>
    </Stack>
  );
}
