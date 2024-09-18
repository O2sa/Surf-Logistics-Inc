import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Flex,
  Box,
  Grid,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";
import Logo from "./Logo";
import FooterMenu from "./FooterMenu";
const data = [
  {
    title: "Site Map",
    links: [
      { label: "About", link: "/pages/about" },
      { label: "Services", link: "/pages/services" },
      { label: "Reach Out", link: "/pages/reach" },
      { label: "Consultation & Quote", link: "/pages/consultation-quote" },
    ],
  },
  {
    title: "Reach Out",
    links: [
      { label: "+1 (514) 816 1182", link: "#" },
      { label: "info@surflogistics.ca", link: "#" },
    ],
  },
  {
    title: "Free Consultation & Quote",
    links: [
      { label: "Book Your Free Consultation", link: "/pages/consultation-quote/consultation" },
      { label: "Get Your Free Quote",  link: "/pages/consultation-quote/quote" },

    ],
  },
];

export default function Footer() {
  return (
    <Box py={"xl"} bg={"brand"}>
      {" "}
      <Container
        sx={(theme) => ({
          [theme.fn.smallerThan("lg")]: {
            display: "flex",
            justifyContent:'center',
            textAlign:'center',
            alignItems:'center'
          },
        })}
      >
        <Grid justify="space-between" gap={"xs"}>
          <Grid.Col
            span={12}
            xs={6}
            lg={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box w={100}>
              <Logo />
            </Box>{" "}
          </Grid.Col>

          {data.map((val, index) => (
            <Grid.Col span={12} xs={6} lg={3} key={index}>
              <FooterMenu title={val.title} links={val.links} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
