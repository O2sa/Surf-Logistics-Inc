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
        textDecorationColor: 'white',

        "&:hover": {
          textDecorationColor: 'white !important',
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

      {/* <Anchor onClick={handleGoToRegister}>
          <Text color="brand">{t("Create an account")}</Text>
        </Anchor> */}
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
