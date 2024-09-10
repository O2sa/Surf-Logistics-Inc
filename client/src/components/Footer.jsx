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
      { label: "About", link: "#" },
      { label: "Services", link: "#" },
      { label: "Reach Out", link: "#" },
      { label: "Consultation & Quote", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      py={"xl"}
      bg={"brand"}
   
    >
      {" "}
      <Container ta={'center'}>
        <Grid
          justify="center"
          gap={"xs"}
        >
          <Grid.Col xs={12} md={8} lg={3}>
            <Box w={84} mx={'auto'} >
              <Logo />
            </Box>{" "}
          </Grid.Col>

          {data.map((val, index) => (
            <Grid.Col xs={12} md={8} lg={3} key={index}>
              <FooterMenu  title={val.title} links={val.links} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
