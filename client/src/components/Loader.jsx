import React from "react";
import { Loader as MantineLoader } from "@mantine/core";
const Loader = () => {
  return (
    <MantineLoader
      size={"xl"}
      style={{
        left: "50%",
        top: "40%",
        position: "absolute",
        transform: "translateX(-50%)",
      }}
      variant="bars"
    />
  );
};

export default Loader;
