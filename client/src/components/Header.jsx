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
        size="md"
        py={"md"}
        className={classes.inner}
      >
        <Box w={48}>
        <Logo header={true} />

        </Box>
        <HeaderMenu />
      </Box>
    </header>
  );
}

export default Header;
