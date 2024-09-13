import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Logo = ({ header = false }) => {
  const nav = useNavigate();
  const source = header ? "/assets/light_logo.png" : "/assets/logo.svg";
  return (
    <Image
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      width={"100%"}
      onClick={() => nav("/")}
      src={source}
      alt="Site Logo"
    />
  );
};

export default Logo;
