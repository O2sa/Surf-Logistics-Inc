import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";


const logos={
  about:"/assets/logo_about.svg",
  footer:"/assets/logo.svg",
  header:"/assets/light_logo.png",
}
const Logo = ({ type = 'header' }) => {
  const nav = useNavigate();
  return (
    <Image
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      width={"100%"}
      onClick={() => nav("/")}
      src={logos[type]}
      alt="Site Logo"
    />
  );
};

export default Logo;
