import { Box, Container, Title } from "@mantine/core";
import PageHeader from "../components/PageHeader";
import { layoutStyle, mainSectionHeight } from "../utils/constants";
import LiveChat from "../components/LiveChat";
import { useTranslation } from "react-i18next";

function Page({
  color = "brand",
  title = "",
  children,
  contentColor = "white",
}) {

  const {t}=useTranslation()
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0",
        padding: "0",
        // justifyContent: "space-between",
        // minHeight: `calc(${mainSectionHeight} + 100vh)`,
      }}
      bg={contentColor}
      sx={(theme) => ({
        // position: "relative",
        // ...layoutStyle(theme),
        height:'100%'
      })}
    >
      {/* <PageHeader color={color} title={title} /> */}
      <Box
      bg={color}
      sx={(theme) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",

        // [theme.fn.smallerThan("md")]: {
        //   height: "400px",
        // },
        // [theme.fn.largerThan("sm")]: {
        //   height: "500px",
        // },

  
      })}
    >
      <Title
        ta={"center"}
        c={"white"}
        sx={(theme) => ({
   
          [theme.fn.smallerThan("md")]: {
            fontSize: "28px",
            margin:'0 16px'
          },
          [theme.fn.largerThan("md")]: {
            fontSize: "40px",
          },
        })}        style={{ borderBottom: "4px solid white" }}
      >
        {t(title)}
      </Title>
    </Box>
      <Box
        bg={contentColor}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          height: `calc(-300px + 100%)`
        })}
        // h={"30vh"}
        my={"xl"}
      >
        <Container
          style={
            {
              // display:'flex',
              // alignContent:"center",
              // justifyContent: "space-around",
              // alignItems: "center",
              // overflow:'scroll'
            }
          }
          w={"80rem"}
          fluid
          // mb={"lg"}
        >
          {children}
        </Container>
      </Box>


    </Box>
  );
}

export default Page;
