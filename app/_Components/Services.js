"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const Services = ({ service, scrollContainer, isMobile, priority }) => {
  const ref = useRef(null);
  const { locale } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    container: scrollContainer,
  });

  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["-30%", "30%"]
  );

  const opacityParallax = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [1, 1, 1] : [1, 0.9, 0.7]
  );

  const title = locale === "ar" ? service.titleAr : service.titleEn;
  const description = locale === "ar" ? service.descriptionAr : service.descriptionEn;

  return (
    <motion.section
      ref={ref}
      className="lg:min-h-[100dvh] h-[100dvh] flex items-center justify-center snap-start relative"
      style={{ opacity: opacityParallax }}
    >
      <motion.div
        className="flex flex-col xl:flex-row gap-10 items-center px-4 sm:px-6 lg:px-0 justify-center sm:gap-8 mt-10 sm:mt-28 lg:mt-70 xl:mt-0 w-full max-w-6xl mx-auto"
      >
        <motion.div className="w-full h-full sm:w-3/4 xl:w-1/2 rounded-md overflow-hidden">
          <Image
            src={service.image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-auto object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </motion.div>

        <motion.div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 justify-center w-full sm:w-3/4 mr-5 xl:w-[30rem]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-950 text-center lg:text-right">
            {title}
          </h2>
          <div className="text-base sm:text-lg text-center lg:text-right font-normal text-sky-950">
            {description ? (
              <ul className="w-full space-y-4">
                {Object.entries(description).map(([subService, desc]) => (
                  <li className="text-base list-disc" key={subService}>
                    <h4 className="font-semibold mb-1 underline text-xl sm:text-2xl">
                      {subService}
                    </h4>
                    <p className="text-sky-800 text-base sm:text-lg">{desc}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sky-800 text-base sm:text-lg">No description available.</p>
            )}
          </div>
          <Link
            href="/contact"
            className="btn-services btn-border-reveal text-lg sm:text-xl px-6 py-3 bg-sky-950 text-white rounded-md hover:bg-sky-800 transition-colors"
          >
            {locale === "ar" ? "تواصل معنا" : "Contact Us"}
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Services;