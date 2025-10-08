"use client";

import home1 from "@/public/home-1.jpeg";
import home2 from "@/public/home-2.jpg";
import home3 from "@/public/home-3.jpg";
import { AnimatePresence, motion, wrap } from "framer-motion";
import Image from "next/image";
import { forwardRef, useState } from "react";
import Spinner from "./Spinner";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function PortfolioCarousel() {
  const { locale } = useLanguage();
  const items = [
    {
      id: 1,
      titleAr: "هل تحتاج الي مكتب محاسبة محترف ومتخصص؟",
      titleEn: "Need a Professional and Specialized Accounting Office?",
      descriptionAr:
        "دع مكتب أحمد عبدالقوى للمحاسبة القانونية يساعدك في تجاوز الموسم الضريبي ويوفر كل احتياجات المحاسبية والضريبية والقانونية.",
      descriptionEn:
        "Let Ahmed Abdelkawy Legal Accounting Office help you navigate the tax season and provide all your accounting, tax, and legal needs.",
      image: home1,
      link: "/about",
    },
    {
      id: 2,
      titleAr: "خدمات متنوعة و بجودة عالية",
      titleEn: "Diverse and High-Quality Services",
      descriptionAr:
        "نوفر لكم مجموعة من الخدمات التي تتنوع بين الخدمات المالية والخدمات القانونية وغيرها.",
      descriptionEn:
        "We offer a range of services, including financial and legal services, and more.",
      image: home2,
      link: "/services",
    },
    {
      id: 3,
      titleAr: "التواصل فى اى وقت وبطرق متعددة",
      titleEn: "Connect Anytime Through Multiple Channels",
      descriptionAr:
        "يمكنكم التواصل معنا من خلال البريد الالكتروني او الهاتف او الرسائل القصيرة",
      descriptionEn:
        "You can reach us via email, phone, or text messages.",
      image: home3,
      link: "/contact",
    },
  ];
  const [selectedItem, setSelectedItem] = useState(0);
  const [direction, setDirection] = useState(1);

  function setSlide(newDirection) {
    const nextItem = wrap(0, items.length, selectedItem + newDirection);
    setSelectedItem(nextItem);
    setDirection(newDirection);
  }

  const colors = [
    "rgba(0, 85, 160, 0.4)",
    "rgba(0, 69, 131, 0.4)",
    "rgba(0, 101, 160, 0.4)",
  ];
  const color = colors[selectedItem % colors.length];

  return (
    <div className="home-section h-full w-full">
      <h2 className="font-amiri font-bold text-center mb-6 text-sky-100 text-xl md:text-4xl">
        {locale === "ar" ? "نقدم خدمات محاسبية متميزة لنجاح أعمالك" : "We Offer Outstanding Accounting Services for Your Business Success"}
      </h2>
      <div className="container">
        <motion.button
          initial={false}
          animate={{ backgroundColor: color }}
          aria-label="Previous"
          className="button"
          onClick={() => setSlide(-1)}
          whileFocus={{ outline: `2px solid ${color}` }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft />
        </motion.button>
        <AnimatePresence initial={false} mode="popLayout">
          <Slide
            key={selectedItem}
            color={color}
            direction={direction}
            item={items[selectedItem]}
            locale={locale} // Pass locale to Slide
          />
        </AnimatePresence>
        <motion.button
          initial={false}
          animate={{ backgroundColor: color }}
          aria-label="Next"
          className="button"
          onClick={() => setSlide(1)}
          whileFocus={{ outline: `2px solid ${color}` }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight />
        </motion.button>
      </div>
    </div>
  );
}

const Slide = forwardRef(function Slide({ color, direction, item, locale }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          duration: 0.3,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      style={{ backgroundColor: color }}
      className="box min-h-[400px] xl:min-h-[400px] lg:min-h-[500px] lg:gap-4"
    >
      {item ? (
        <div className={`flex items-center gap-5 ${locale==="ar"?"lg:flex-row-reverse":"lg:flex-row"} flex-col p-2 md:px-6 flex-wrap`}>
          <Image
            width={400}
            height={300}
            src={item.image}
            alt={locale === "ar" ? "صورة شريط التمرير الرئيسي" : "home slider image"}
            className="rounded-md flex-[1.3]"
          />
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-8 flex-1">
            <h3 className="sm:text-4xl text-sky-100 font-semibold mt-2 text-center sm:text-start">
              {locale === "ar" ? item.titleAr : item.titleEn}
            </h3>
            <p className="sm:text-xl lg:text-start text-center text-sky-100 w-[90%]">
              {locale === "ar" ? item.descriptionAr : item.descriptionEn}
            </p>
            <Link href={item.link} className="btn btn-border-reveal text-sky-100">
              {locale === "ar" ? "معرفة المزيد" : "Learn More"}
            </Link>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </motion.div>
  );
});

/**
 * ==============   Icons   ================
 */
const iconsProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  color: "#fff",
};

function ArrowLeft() {
  return (
    <svg {...iconsProps}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg {...iconsProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}