import {
  Menu,
  Button,
  Text,
  rem,
  ActionIcon,
  Group,
  useMantineTheme,
} from "@mantine/core";
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
import { useMediaQuery } from "@mantine/hooks";

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
    <Group spacing={"xs"}>
      <ActionIcon
      size={'34px'}
        color="brand"
        // sx={(theme) => ({
        //   [theme.fn.largerThan("md")]: {
        //     width: "49px",
        //   },
        //   [theme.fn.smallerThan("md")]: {
        //     width: "34px",
        //   },
        // })}
        onClick={() => nav("/dashboard")}
      >
        <IconUserSquare size={"49px"} color="white" />
      </ActionIcon>
      <LanguageSwitcher />

      <Links />
    </Group>
  );
}

function Links() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div>
          <ActionIcon
            color="brand"
            size={isSmallScreen ? "34px" : "49px"}
            variant="filled"
            aria-label="Settings"
          >
            <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </div>
      </Menu.Target>

      <Menu.Dropdown sx={{ position: "absolute" }}>
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
