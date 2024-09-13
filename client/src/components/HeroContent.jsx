import { Box, Container, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
function HeroContent() {
  const { t } = useTranslation();
  return (
    <Box
      w={"100%"}
      h={"100%"}
      pos={"absolute"}
      top={0}
      style={{
        zIndex: -1,
      }}
    >
      <Box pos={"relative"} h={"100%"} style={{ overflow: "hidden" }}>
        <video
          style={{ objectFit: "cover" }}
          height={"100%"}
          width={"100%"}
          autoPlay
          loop
          muted
        >
          <source src={"/assets/videos/demo.mov"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          // bg={"brand"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        />
      </Box>
      <Box
        pos={"absolute"}
        color="quote"
        w={"100%"}
        px={"md"}
        ta={"center"}
        style={{ left: "50%", top: "40%", transform: "translateX(-50%)" }}
      >
        <Title mb={"md"} c="quote">
          {t("Where Freight Meets Finesse")}
        </Title>
        <Box ta={"center"} px={'xl'} style={{display:'flex',justifyContent:'center',}} >
          <Text c={"white"} maw={'900px'} >
            {t(
              `Our mission is to deliver top notch, hassle free logistics solutions that keep your business moving seamlessly. No commitments, no contracts—just straight-up reliable service.`
            )}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroContent;
