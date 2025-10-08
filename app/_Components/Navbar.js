"use client";

import LowerNav from "./LowerNav";
import { useState } from "react";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname(); // Fixed typo: added missing import and corrected variable name
  const { locale } = useLanguage();

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "#fff",
    },
  };

  const middleVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
      backgroundColor: "#fff",
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "#fff",
    },
  };

  return (
    <header className={`${pathname === "/" ? "bg-white" : "bg-white"} shadow-lg w-full flex flex-col items-center justify-around pb-2 sticky top-0 z-[200]`}>
      <LowerNav locale={locale} />
      <motion.div
        size={30}
        onClick={() => setShowNav(!showNav)}
        className={`${showNav ? "fixed" : "absolute"} top-5 right-1.5 sm:hidden flex flex-col gap-2 z-[155]`}
      >
        <button
          className="w-10 h-8 flex flex-col justify-between z-[155] relative"
          onClick={() => setShowNav((prev) => !prev)}
          aria-label="burger"
        >
          <motion.div
            variants={topVariants}
            animate={showNav ? "opened" : "closed"}
            className="w-10 h-1 bg-sky-950 rounded origin-left"
          />
          <motion.div
            variants={middleVariants}
            animate={showNav ? "opened" : "closed"}
            className="w-10 h-1 bg-sky-950 rounded"
          />
          <motion.div
            variants={bottomVariants}
            animate={showNav ? "opened" : "closed"}
            className="w-10 h-1 bg-sky-950 rounded origin-left"
          />
        </button>
       
      </motion.div>
      {showNav && <ResponsiveNavBar locale={locale} />}
    </header>
  );
}

export default Navbar;