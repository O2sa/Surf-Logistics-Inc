import { Menu, Button, Text, rem, ActionIcon, Group } from "@mantine/core";
import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconMenu2,
  IconUser,
  IconUserSquare,
} from "@tabler/icons-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthProvider";

const links = [
  { label: "Home", link: "/" },
  { label: "About", link: "/pages/about" },
  { label: "Services", link: "/pages/services" },
  { label: "Reach Out", link: "#" },
  {
    label: "Consultation",
    link: "pages/consultation-quote/consultation",
  },
  { label: "Quote", link: "pages/consultation-quote/quote" },
];

function HeaderMenu() {
  const nav = useNavigate();
  // const { isAuthenticated } = useAuth();
  return (
    <Group>
 

      <ActionIcon color="brand" onClick={() => nav("/dashboard")}>
        <IconUserSquare color="white"/>
      </ActionIcon>
      <LanguageSwitcher />

      <Links />
    </Group>
  );
}

function Links() {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div>
          <ActionIcon
            color="brand"
            size={"lg"}
            variant="filled"
            aria-label="Settings"
          >
            <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </div>
      </Menu.Target>

      <Menu.Dropdown sx={{ position: "absolute", }}>
        {links.map((val, idx) => (
          <Menu.Item onClick={() => nav(val.link)} key={idx}>
            {t(val.label)}
          </Menu.Item>
        ))}
        {/* </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}

export default HeaderMenu;
