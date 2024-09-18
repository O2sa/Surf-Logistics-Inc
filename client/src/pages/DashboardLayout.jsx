import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  Group,
  ActionIcon,
  Avatar,
} from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "../components/AuthProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function DashboardLayout() {
  const theme = useMantineTheme();
  const nav = useNavigate();
  const { logout } = useAuth();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Sidebar />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>{" "}
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Box w={48} my={"xs"}>
                  <Logo />
                </Box>
              </MediaQuery>
            </Group>

            <Group>
              <LanguageSwitcher color={'brand'}/>
              <ActionIcon onClick={() => logout()}>
                <IconLogout stroke={1.5} />
              </ActionIcon>{" "}
              <ActionIcon onClick={() => nav("profile")}>
                <Avatar />
              </ActionIcon>
            </Group>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
