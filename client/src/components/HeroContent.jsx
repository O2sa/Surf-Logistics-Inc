import { Box, Text, Title } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
function HeroContent() {
  const { t } = useTranslation();
  const videoRef = useRef(null); // Create a reference to the video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video to 0.75x speed
    }
  }, []);
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
          aria-label="hero video"

          ref={videoRef}
          muted
        >
          <source  src={"/assets/videos/demo.mov"} type="video/mp4" />
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
        sx={(theme) => ({
          left: "50%",
          top: "41%",
          transform: "translateX(-50%)",
          [theme.fn.smallerThan("md")]: {
            top: "38%",
          },
          [theme.fn.largerThan("md")]: {
            top: "41%",
          },
        })}
      >
        <Title
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              fontSize: `40px`,
            },
            [theme.fn.largerThan("md")]: {
              fontSize: `55px`,
            },
          })}
          mb={"md"}
          c="quote"
        >
          {t("Where Freight Meets Finesse")}
        </Title>
        <Box
          ta={"center"}
          px={"xl"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Text
            c={"white"}
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                fontSize: `16px`,
              },
              [theme.fn.largerThan("md")]: {
                fontSize: `20px`,
              },
            })}
            maw={"900px"}
          >
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
