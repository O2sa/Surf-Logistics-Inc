import { useState } from "react";
import { Container, Group, Burger, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

export function Header() {
  return (
    <header style={{ zIndex: 100 }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}

        // className={classes.inner}
      >
        <Box
          sx={(theme) => ({
            [theme.fn.largerThan("md")]: {
              width: "100px",
            },
            [theme.fn.smallerThan("md")]: {
              width: "84px",
            },
          })}
        >
          <Logo header={true} />
        </Box>
        <HeaderMenu />
      </Box>
    </header>
  );
}

export default Header;
