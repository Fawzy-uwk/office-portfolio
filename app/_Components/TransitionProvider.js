"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";


function TransitionProvider({ children, amiri }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setShowOverlay(window.innerWidth >= 640); // sm breakpoint
    }
  }, []);

  const pageTitleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const overlayVariants = {
    initial: { scaleY: 1 },
    animate: { scaleY: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathname}
        className={`${amiri.className} relative ${
          pathname === "/about" ? "lg:h-screen" : "lg:min-h-screen"
        } min-h-[100dvh] w-screen flex flex-col bg-gradient-to-b from-gray-100 to-sky-100`}
      >
        {isMounted && !shouldReduceMotion && (
          <motion.div
            className="fixed m-auto top-0 bottom-0 left-0 right-0 hidden sm:block text-white text-4xl sm:text-6xl cursor-default  xl:z-[450] w-fit h-fit"
            initial="visible"
            animate="hidden"
            variants={pageTitleVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "opacity" }}
          >
            {locale === "ar"
              ? pathname === "/"
                ? "الرئيسية"
                : pathname === "/about"
                ? "من نحن"
                : pathname === "/services"
                ? "الخدمات"
                : pathname === "/contact"
                ? "تواصل معنا"
                : ""
              : pathname === "/"
              ? "Home"
              : pathname === "/about"
              ? "About"
              : pathname === "/services"
              ? "Services"
              : pathname === "/contact"
              ? "Contact"
              : ""}
          </motion.div>
        )}

        {isMounted && !shouldReduceMotion && showOverlay && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[399] bg-sky-950 rounded-t-[100px] border-t-[100px] pointer-events-none origin-bottom"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: 0.1,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              height: "2000px",
              transformOrigin: "bottom",
              willChange: "transform",
            }}
          />
        )}

        <Navbar />
        <main className="flex-1 min-h-[60vh] overflow-y-auto h-full">{children}</main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default TransitionProvider;