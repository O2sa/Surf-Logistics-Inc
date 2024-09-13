import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FooterMenu({ title = "", links = [] }) {
  const {t}=useTranslation()

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
        {t(link.label)}
      </Text>
    </Link>
  ));

  return (
    <div   >
      <Text pl={'xs'} color="about.3" fz={"lg"} fw={"700"}>
        {t(title)}
      </Text>
      {items}
    </div>
  );
}

export default FooterMenu;
