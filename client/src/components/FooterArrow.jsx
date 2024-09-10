import { ActionIcon, Box } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function FooterArrow({ to = "/" }) {
  const nav = useNavigate();
  return (
    <Box
      style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        
        transform: "translateX(-50%)",
      }}
    >
      <ActionIcon
        // style={{ position: "absolute" }}
        color="brand"
        size={"lg"}
        onClick={() => nav(to)}
        variant="filled"
        aria-label="bottom arrow"
      >
        <IconArrowDown style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Box>
  );
}

export default FooterArrow;
