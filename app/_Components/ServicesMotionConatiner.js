"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import data from "@/public/services.json";
import Services from "./Services";
import { useLanguage } from "../context/LanguageContext";

export default function ServicesMotionContainer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const [isMobile, setIsMobile] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.zIndex = "50";

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full" dir="rtl">
      <div
        ref={containerRef}
        className={`h-[100dvh] overflow-y-auto ${
          isMobile ? "" : "snap-y snap-mandatory"
        } relative`}
        style={{ scrollPaddingTop: "calc(2rem + 0.5rem)" }}
      >
        <motion.div className="sticky top-0 z-10 bg-white/10 backdrop-blur-sm py-2 sm:py-3">
          <motion.h1 className="text-center font-bold text-2xl sm:text-3xl lg:text-5xl text-blue-950">
            {locale === "ar" ? "خدماتنا" : "Our Services"}
          </motion.h1>
          <motion.div
            style={{ scaleX }}
            className="h-1 sm:h-2 bg-sky-950 w-full rounded-full sticky top-[calc(2rem+0.5rem)] left-0 z-50"
          ></motion.div>
        </motion.div>

        {data.services.map((service, idx) => (
          <Services
            key={service.id}
            service={service}
            scrollContainer={containerRef}
            isMobile={isMobile}
            priority={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}