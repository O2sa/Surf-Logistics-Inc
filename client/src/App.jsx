import { MantineProvider } from "@mantine/core";
import React, { createContext, Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Hero from "./pages/Hero";
import Hero from "./pages/Hero";
import Cards from "./pages/Cards";
import Pages from "./pages/Pages";
import Page from "./pages/Page";
import AboutContent from "./components/AboutContent";
import Services from "./components/Services";
import ConsultationAndQuote from "./components/ConsultationAndQuote";
import QuotePage from "./components/QuoteForm";
import ReachPage from "./components/Reach";
import Dash from "./pages/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from './pages/Profile'
import Quotes from './pages/Quotes'
import Consultations from "./pages/Consultations";
import Messages from "./pages/Messages";

const ConsultationPage = React.lazy(() =>
  import("./components/ConsultationForm")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const AppContext = createContext();

import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Loader";
import { AuthProvider } from "./components/AuthProvider";
import { Notifications } from "@mantine/notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import SEO from "./components/SEO";
export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Montserrat, sans-serif",
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
            "#662A76",
            "#51215E",
            "#7F3493", //main

            "#411B4B",
            "#34153C",
            "#2A1130",
            "#210E27",
          ],
          about: [
            "#76DCFF",
            "#43CFFF",
            "#16C4FF",
            "#0096C9",

            "#007EA9",
            "#00B2EF", //main

            "#006A8E",
            "#005977",
            "#004A64",
            "#003F54",
          ],
          reach: [
            "#E4F1D2",
            "#C2E098",
            "#A5D267",
            "#71A130",
            "#5B8126",
            "#8DC63F", //main
            "#48671F",
            "#3A5218",
            "#2E4214",
            "#253510",
          ],
          quote: [
            "#FEF0DF",
            "#FBCB92",
            "#F9AC52",
            "#D57708",
            "#AB5F06",
            "#F7931D", //main

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
      <Notifications position="top-center" />
      <AnimatePresence mode="wait">
        {" "}
        <QueryClientProvider client={queryClient}>
          <AppContext.Provider
            value={{
              queryClient,
            }}
          >
            <Router>
              {" "}
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />{" "}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <AuthProvider>
                          <Dash />
                        </AuthProvider>
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Quotes />} />
                    <Route path="consultations" element={<Consultations />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                  <Route path="/pages" element={<Pages />}>
                    <Route index element={<Cards />} />
                    <Route
                      path="about"
                      element={
                        <Page color="about" title="About">
                          <AboutContent />
                        </Page>
                      }
                    />
                    <Route
                      path="services"
                      element={
                        <Page color="services" title="Services">
                          <Services />
                        </Page>
                      }
                    />
                    <Route
                      path="reach"
                      element={
                        <Page
                          color="#AFD778"
                          contentColor="reach"
                          title="Reach Out"
                        >
                          <ReachPage />
                        </Page>
                      }
                    />
                    <Route
                      path="consultation-quote"
                      element={
                        <Page color="quote" title="Consultation & Quote">
                          <ConsultationAndQuote />
                        </Page>
                      }
                    />
                    <Route
                      path="consultation-quote/quote"
                      element={
                        <ProtectedRoute>
                          <Page
                            color="#F9B360"
                            contentColor="quote"
                            title="Free Quote Form"
                          >
                            <QuotePage />
                          </Page>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="consultation-quote/consultation"
                      element={
                        <ProtectedRoute>
                          <Page
                            color="#F9B360"
                            contentColor="quote"
                            title="Free Consultation Form"
                          >
                            <ConsultationPage />
                          </Page>
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                </Routes>
              </Suspense>{" "}
            </Router>
          </AppContext.Provider>
        </QueryClientProvider>
      </AnimatePresence>


    </MantineProvider>
  );
}

export const useAppContext = () => useContext(AppContext);
