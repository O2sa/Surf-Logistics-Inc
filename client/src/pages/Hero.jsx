import { ActionIcon, Container } from "@mantine/core";
import Header from "../components/Header";
import HeroContent from "../components/HeroContent";
import FooterArrow from "../components/FooterArrow";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

function Hero() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ position: "relative", height: "100vh" }}
    >
      {" "}
      <Container>
        <Header />
      </Container>
      <HeroContent />
      <FooterArrow to={"pages"} />
    </motion.div>
  );
}

export default Hero;
