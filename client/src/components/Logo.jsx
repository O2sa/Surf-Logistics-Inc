import { Image } from "@mantine/core";
import logo from "../assets/logo.svg";
import whiteLogo from "../assets/light_logo.png";

const Logo = ({ header = false }) => {
  const source = header ? whiteLogo : logo;
  return <Image width={"100%"} src={source} alt="Site Logo" />;
};

export default Logo;
