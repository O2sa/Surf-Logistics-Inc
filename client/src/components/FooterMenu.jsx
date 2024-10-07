import { Anchor, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const LinkComp = ({ ext = false, link, label }) => {
  const { t } = useTranslation();

  return ext ? (
    <Anchor
      style={{
        display: "block",
        textDecoration: "none",
        textDecorationColor: "white",

        "&:hover": {
          textDecorationColor: "white !important",
          textDecoration: "underline !important",
        },
      }}
      href={link}
      target={'_blank'}
    >
      <Text
        px={"sm"}
        style={{ fontSize: "16px" }}
        c={"white"}
        // component="a"
        // onClick={(event) => event.preventDefault()}
      >
        {label}
      </Text>

      {/* <Anchor onClick={handleGoToRegister}>
      <Text color="brand">{t("Create an account")}</Text>
    </Anchor> */}
    </Anchor>
  ) : (
    <Link
      style={{
        display: "block",
        textDecoration: "none",
        textDecorationColor: "white",

        "&:hover": {
          textDecorationColor: "white !important",
          textDecoration: "underline !important",
        },
      }}
      to={link}
    >
      <Text
        px={"sm"}
        style={{ fontSize: "16px" }}
        c={"white"}
        // component="a"
        // onClick={(event) => event.preventDefault()}
      >
        {t(label)}
      </Text>

      {/* <Anchor onClick={handleGoToRegister}>
      <Text color="brand">{t("Create an account")}</Text>
    </Anchor> */}
    </Link>
  );
};
function FooterMenu({ title = "", links = [] }) {
  const { t } = useTranslation();

  const items = links.map((link, index) => (
    <LinkComp
      label={link.label}
      link={link.link}
      ext={link.ext || false}
      key={index}
    />
  ));

  return (
    <div>
      <Text
        pl={"xs"}
        color="about.3"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        {t(title)}
      </Text>
      {items}
    </div>
  );
}

export default FooterMenu;
