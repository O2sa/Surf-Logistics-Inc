import { useState } from "react";
import {
  Group,
  Code,
  Image,
  UnstyledButton,
  Box,
  rem,
  Footer,
  Text,
} from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconCalendarStats,
  IconAddressBook,
} from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";

import styled from "@emotion/styled";
import { useMantineTheme } from "@mantine/core";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";
const StyledComponent = styled.nav`
  ${({ theme }) => `





    .link {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.gray[7]};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      border-radius: ${theme.radius.sm};
      font-weight: 500;

      &:hover {
        background-color: ${theme.colors.gray[0]};
        color: black;

        .linkIcon {
          color:  black;
        }
      }

      &[data-active] {
        &,
        &:hover {
          background-color: ${theme.colors.brand[0]};
          color: ${theme.colors.brand[6]};

          .linkIcon {
            color: ${theme.colors.brand[6]};
          }
        }
      }
    }

    .linkIcon {
      color: ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6]
      };
      margin-right: ${theme.spacing.sm};
      width: ${rem(25)};
      height: ${rem(25)};
    }
  `}
`;

const data = [
  { name: "Quotes", to: "/dashboard", icon: IconReceipt2 },
  { name: "Consultations", to: "consultations", icon: IconCalendarStats },
  { name: "Messages", to: "messages", icon: IconAddressBook },
];

export default function Sidebar({ close = () => null }) {
  const [active, setActive] = useState(data[0].to);
  const theme = useMantineTheme();
  const {t}=useTranslation()
  const links = data.map((item) => (
    <NavLink
      className={"link"}
      data-active={item.to === active || undefined}
      to={item.to}
      key={item.to}
      onClick={(event) => {
        setActive(item.to);
        close();
      }}
    >
      <item.icon className={"linkIcon"} stroke={1.5} />
      <Text>{t(item.name)}</Text>
    </NavLink>
  ));

  return (
    <StyledComponent theme={theme} className="navbar">
      {links}
    </StyledComponent>
  );
}
