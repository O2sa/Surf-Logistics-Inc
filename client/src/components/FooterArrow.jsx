import { ActionIcon, Box, useMantineTheme } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

function FooterArrow({ to = "/", color = "white" }) {
  const theme = useMantineTheme();
  const nav = useNavigate();
  return (
    <Box
      style={{
        position: "absolute",
        bottom: "60px",
        left: "50%",

        transform: "translateX(-50%)",
      }}

    >
      <ActionIcon
        // style={{ position: "absolute" }}
        // size={"xl"}
        color="brand"
        onClick={() => nav(to)}
        variant="transparent"
        aria-label="bottom arrow"
        w={'100px'}
        h={'50px'}
      >
        <SlArrowDown
          style={{
            // width: '85px',
            // height: '42px',
            width: "100%",
            height: "100%",
            color: theme.colors[color] ? theme.colors[color][5] : color,
          }}
          stroke={1.5}
        />
      </ActionIcon>
    </Box>
  );
}

export default FooterArrow;
