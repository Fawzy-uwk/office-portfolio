"use client";

import dynamic from "next/dynamic";
import { FaCopyright } from "react-icons/fa";
import { usePathname } from "next/navigation";
import UpperNav from "./UpperNav";
import { useLanguage } from "../context/LanguageContext";

// Lazy load framer-motion only on pages that render Footer
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div), { ssr: false }
);

function Footer() {
  const pathname = usePathname();
  const { locale } = useLanguage();

  // Hide footer on /about
  if (pathname === "/about") return null;

  return (
    <footer className="w-full flex flex-col items-center justify-center p-4 z-20 bg-sky-950">
      <div className="w-full max-w-[1366px] flex items-center justify-between">
        <MotionDiv
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-sky-100 font-bold"
        >
          <UpperNav />
        </MotionDiv>
      </div>

      <MotionDiv
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.6 }}
        className="mt-4 flex items-center gap-2 text-base md:text-xl text-sky-100"
      >
        <FaCopyright size={20} />
        <span className="font-semibold">{new Date().getFullYear()}</span>
        <span className="whitespace-nowrap">
          {locale === "ar" ? "مكتب أحمد عبدالقوي للمحاسبة ©" : " © Ahmed Abdelqawy Accounting Office"}
        </span>
      </MotionDiv>
    </footer>
  );
}

export default Footer;