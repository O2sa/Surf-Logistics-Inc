import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

function FooterMenu({ title = "", links = [] }) {
  const items = links.map((link, index) => (
    <Link
      style={{
        display: "block",
        textDecoration: "none",

        "&:hover": {
          textDecoration: "underline !important",
        },
      }}
      to={link.link}
      key={index}
    >
      <Text
        px={"sm"}
        fz={"sm"}
        c={"white"}
        // component="a"
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <div   >
      <Text pl={'xs'} color="about.3" fz={"lg"} fw={"700"}>
        {title}
      </Text>
      {items}
    </div>
  );
}

export default FooterMenu;
