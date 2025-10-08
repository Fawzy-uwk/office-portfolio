"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";


export default function Navigation() {
  const pathname = usePathname();
  const { locale } = useLanguage();

  const navItems = [
    { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "/about", labelAr: "من نحن", labelEn: "About" },
    { href: "/services", labelAr: "الخدمات", labelEn: "Services" },
    { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact" },
  ];

  return (
    <nav className={`z-10 text-xl hidden sm:block ${pathname === "/" ? "text-sky-950" : ""} bg-transparent shadow-2xl`}>
      <ul className="flex gap-16 items-center">
        {navItems.map(({ href, labelAr, labelEn }) => (
          <li key={href}>
            <Link
              href={href}
              className={`transition-colors relative ${pathname === href ? "active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              {locale === "ar" ? labelAr : labelEn}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}