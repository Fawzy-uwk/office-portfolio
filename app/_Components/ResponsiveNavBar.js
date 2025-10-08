"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";


function ResponsiveNavBar() {
  const pathname = usePathname();
  const { locale,switchLocale } = useLanguage();

  // Animation variants for the mobile navigation menu
  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  // Navigation items with bilingual labels
  const navItems = [
    { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "/about", labelAr: "من نحن", labelEn: "About" },
    { href: "/services", labelAr: "الخدمات", labelEn: "Services" },
    { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact" },
  ];

  // This component is used for the mobile navigation menu
  return (
    <motion.nav
      variants={listVariants}
      initial="closed"
      animate="opened"
      className="z-[151] text-xl sm:hidden block h-screen bg-black text-white w-screen fixed top-0 right-0"
    >
      <motion.ul
        variants={listVariants}
        className="flex gap-10 items-center flex-col justify-center h-full"
      >
        {navItems.map(({ href, labelAr, labelEn }) => (
          <motion.li key={href} variants={itemVariants}>
            <Link
              href={href}
              className={`transition-colors relative ${pathname === href ? "active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              {locale === "ar" ? labelAr : labelEn}
            </Link>
          </motion.li>
        ))}
         <button className="cursor-pointer text-sky-100 mt-20 font-semibold text-xl " onClick={switchLocale}>{locale==="ar"?"AR":"EN"}</button>
      </motion.ul>
    </motion.nav>
  );
}

export default ResponsiveNavBar;