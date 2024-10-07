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
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthProvider";
import { useMediaQuery } from "@mantine/hooks";



const links = [
  { label: "Home", link: "/" },
  { label: "About", link: "/pages/about" },
  { label: "Services", link: "/pages/services" },
  { label: "Reach Out", link: "/pages/reach" },
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
    <Group spacing={"2px"}>
      <ActionIcon
        size={"34px"}
        color="brand"
        // sx={(theme) => ({
        //   [theme.fn.largerThan("md")]: {
        //     width: "49px",
        //   },
        //   [theme.fn.smallerThan("md")]: {
        //     width: "34px",
        //   },
        // })}
        aria-label="dashboard"
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
    <Menu shadow="md" offset={0} o position="bottom-end" width={200}>
      <Menu.Target>
        <ActionIcon
          color="brand"
          size={isSmallScreen ? "34px" : "49px"}
          variant="filled"
          aria-label="Change Page"
          name="Burgr"
        >
          <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown
        bg={"transparent"}
        sx={{ border: "none", }}
      >
        {links.map((val, idx) => (
          <Menu.Item
            h={"38px"}
            color="white"
            mb={"1px"}
            style={{
              borderRadius: "0",
              backgroundColor:  "rgba(109, 122, 133, 0.5)",
              mixBlendMode: "multiply",
              // opacity: '0.5'
            }}
            onClick={() => nav(val.link)}
            key={idx}
          >
            {t(val.label)}
          </Menu.Item>
        ))}
        {/* </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}

export default HeaderMenu;
