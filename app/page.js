"use client";

import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";

import bg from "@/public/paperwork.jpg";
import Spinner from "./_Components/Spinner";
import { useLanguage } from "./context/LanguageContext";

// Lazy-load HomeSlider to reduce JS blocking
const HomeSlider = dynamic(() => import("./_Components/HomeSlider"), {
  ssr: false,
  loading: () => <div><Spinner /></div>,
});

export default function Home() {
  const { locale } = useLanguage();

  return (
    <>
      {/* Preload Background Image for better LCP */}
      <Head>
        <link
          rel="preload"
          href={bg.src}
          as="image"
          fetchPriority="high"
          imagesrcset={`${bg.src} 100w`}
          importance="high"
        />
      </Head>

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden xl:px-70 md:px-16 px-4">
        {/* Background Image */}
        <Image
          src={bg}
          alt={locale === "ar" ? "الرئيسية" : "office hero section"}
          fill
          priority
          loading="eager"
          className="object-cover z-0"
          sizes="100vw"
        />

        {/* Blurred overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center flex-col gap-4 h-full my-10 mt-20 xl:mt-10">
          <HomeSlider />
        </div>
      </div>
    </>
  );
}