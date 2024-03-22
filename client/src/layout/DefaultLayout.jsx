import React, { useState } from "react";
import { Container, ThemeProvider } from "react-bootstrap";
import {
  AppContent,
  AppHeader,
  AppSidebar,
  AppFooter,
} from "../components/Index";

const DefaultLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <AppFooter isExpanded={isExpanded} />
      <AppSidebar setSidebarExpanded={setIsExpanded} />
      <AppHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main
        className={`d-flex flex-column min-vh-100 ${
          isExpanded ? "content-expanded" : "content-collapsed"
        }`}
      >
        <ThemeProvider
          breakpoints={["xxxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        >
          <Container fluid className="app-default-margin">
            <div className="">
              <AppContent isExpanded={isExpanded} />
            </div>
          </Container>
        </ThemeProvider>
      </main>
    </div>
  );
};

export default DefaultLayout;
