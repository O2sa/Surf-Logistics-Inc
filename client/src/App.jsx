import { MantineProvider } from "@mantine/core";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Hero from "./pages/Hero";
const Hero = React.lazy(() => import("./pages/Hero"));
const Cards = React.lazy(() => import("./pages/Cards"));
const Pages = React.lazy(() => import("./pages/Pages"));
const About = React.lazy(() => import("./pages/About"));
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: {
          brand: [
            "#6699C0",
            "#4A86B3",
            "#40749B",
            "#376485",
            "#305673",
            "#294A63", //main
            "#223E53",
            "#1D3446",
            "#182C3B",
            "#142531",
          ],
          services: [
            "#C384D4",
            "#AE5AC5",
            "#983EB0",
            "#7F3493", //main
            "#662A76",
            "#51215E",
            "#411B4B",
            "#34153C",
            "#2A1130",
            "#210E27",
          ],
          about: [
            "#76DCFF",
            "#43CFFF",
            "#16C4FF",
            "#00B2EF", //main
            "#0096C9",
            "#007EA9",
            "#006A8E",
            "#005977",
            "#004A64",
            "#003F54",
          ],
          reach: [
            "#E4F1D2",
            "#C2E098",
            "#A5D267",
            "#8DC63F", //main
            "#71A130",
            "#5B8126",
            "#48671F",
            "#3A5218",
            "#2E4214",
            "#253510",
          ],
          quote: [
            "#FEF0DF",
            "#FBCB92",
            "#F9AC52",
            "#F7931D", //main
            "#D57708",
            "#AB5F06",
            "#884C05",
            "#6D3D04",
            "#573103",
            "#462702",
          ],
        },
        primaryColor: "brand",
        primaryShade: 5,
      }}
    >
      <AnimatePresence mode="wait">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/pages" element={<Pages />}>
                <Route index element={<Cards />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AnimatePresence>
    </MantineProvider>
  );
}

export default App;
