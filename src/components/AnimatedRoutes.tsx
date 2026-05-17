import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "@/pages/Home";

// Lazy-loaded routes (code splitting). Home stays static — it's the landing.
const MainLanding = lazy(() => import("@/pages/MainLanding"));
const HuellaRoja = lazy(() => import("@/pages/HuellaRoja"));
const HuellaVerde = lazy(() => import("@/pages/HuellaVerde"));
const NotFound = lazy(() => import("@/pages/NotFound"));

interface AnimatedRoutesProps {
  showDock: boolean;
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut" as const,
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ showDock }: AnimatedRoutesProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home showDock={showDock} /></PageWrapper>} />
          <Route path="/blueprint-lab" element={<PageWrapper><MainLanding showDock={showDock} /></PageWrapper>} />
          <Route path="/hackbar" element={<PageWrapper><HuellaRoja showDock={showDock} /></PageWrapper>} />
          <Route path="/reset" element={<PageWrapper><HuellaVerde showDock={showDock} /></PageWrapper>} />
          {/* Legacy slug redirects (preserve SEO / old links) */}
          <Route path="/lab" element={<Navigate to="/blueprint-lab" replace />} />
          <Route path="/huella-azul" element={<Navigate to="/blueprint-lab" replace />} />
          <Route path="/huella-roja" element={<Navigate to="/hackbar" replace />} />
          <Route path="/huella-verde" element={<Navigate to="/reset" replace />} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
