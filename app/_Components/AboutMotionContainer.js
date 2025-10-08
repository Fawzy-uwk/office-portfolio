"use client";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef, useState, useEffect, lazy, Suspense } from "react";

// Lazy-load CountUp and Brain to reduce initial JS load
const LazyCountUp = lazy(() => import("react-countup"));
const LazyBrain = lazy(() => import("./Brain"));

import {
  MdAccountBalance,
  MdBarChart,
  MdContacts,
  MdHighQuality,
  MdSpeed,
  MdStar,
  MdWorkOutline,
} from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

const AboutPage = () => {
  const containerRef = useRef();
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  const [isBrainLoaded, setIsBrainLoaded] = useState(false);
  const { locale } = useLanguage();

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: (latest) => {
      if (latest > 0.1 && !isBrainLoaded && window.matchMedia("(max-width: 1023px)").matches) {
        setIsBrainLoaded(true); // Defer for mobile (sm and below)
      }
    },
  });

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "50px", once: true });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "50px", once: true });

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialAnimationComplete(true), 100);
    // Load Brain immediately on large screens (lg and up)
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setIsBrainLoaded(true);
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="h-full"
      initial={{ y: 0 }}
      animate={isInitialAnimationComplete ? { y: "0%" } : { y: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
    >
      {/* CONTAINER */}
      <div className="h-full overflow-y-scroll xl:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 lg:w-3/3 xl:pr-10 xl:w-1/2">
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-12 justify-center">
            <h1 className="font-bold text-3xl text-sky-950">
              {locale === "ar" ? "من نحن" : "About Us"}
            </h1>
            <p className="text-lg text-sky-950/80">
              {locale === "ar"
                ? "مكتب أحمد عبدالقوي للمحاسبة هو مكتب محاسبة قانونية يقدم خدمات المحاسبة والتدقيق المالي والاستشارات الضريبية. يهدف المكتب إلى تقديم حلول مالية متكاملة تلبي احتياجات عملائه. فريق كامل من أكفأ المحاسبين والمحامين فى خدمتكم"
                : "Ahmed Abdelqawy Accounting Office is a legal accounting firm offering accounting, financial auditing, and tax consulting services. Our goal is to provide comprehensive financial solutions that meet our clients' needs, supported by a team of top accountants and lawyers."}
            </p>
            <span className="italic text-lg text-sky-950/70">
              {locale === "ar" ? "احترافية, سرعة, كفاءة" : "Professionalism, Speed, Efficiency"}
            </span>
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#052f4a"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#052f4a" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#052f4a"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            <motion.h1
              initial={locale==="ar"?{ x: "300px" }:{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-bold text-2xl text-sky-950"
            >
              {locale === "ar" ? "المزيد عنا" : "More About Us"}
            </motion.h1>
            <motion.div
              initial={locale==="ar"?{ x: "300px" }:{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div className="rounded flex gap-4 items-center flex-col p-2 cursor-pointer justify-center bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdContacts size={20} />
                <h2 className="text-2xl">
                  <Suspense fallback={<span>0</span>}>
                    {isSkillRefInView && <LazyCountUp start={1} end={6} duration={2} delay={0.2} />}
                  </Suspense>{" "}
                  {locale === "ar" ? "أعوام من الخبرة" : "Years of Experience"}
                </h2>
              </div>
              <div className="rounded flex gap-4 items-center flex-col p-2 text-sm justify-center cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdContacts size={20} />
                <h2 className="text-2xl">
                  <Suspense fallback={<span>0</span>}>
                    {isSkillRefInView && <LazyCountUp start={1} end={500} duration={2} delay={0.2} />}
                  </Suspense>{" "}
                  {locale === "ar" ? "عميل" : "Clients"}
                </h2>
              </div>
              <div className="rounded flex gap-4 min-h-24 items-center flex-col p-2 text-sm justify-center cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdAccountBalance size={20} />
                <h2 className="text-2xl">
                  <Suspense fallback={<span>0</span>}>
                    {isSkillRefInView && <LazyCountUp start={1} end={8} duration={2} delay={0.2} />}
                  </Suspense>{" "}
                  {locale === "ar" ? "خدمات" : "Services"}
                </h2>
              </div>
              <div className="rounded flex gap-4 items-center flex-col p-2 text-2xl justify-center cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdSpeed />
                <h2>{locale === "ar" ? "سرعة" : "Speed"}</h2>
              </div>
              <div className="rounded flex gap-4 items-center flex-col p-2 justify-center text-2xl cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdWorkOutline />
                <h2>{locale === "ar" ? "احترافية" : "Professionalism"}</h2>
              </div>
              <div className="rounded flex gap-4 min-h-24 items-center justify-center flex-col p-2 text-2xl cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdBarChart />
                <h2>{locale === "ar" ? "تطور" : "Growth"}</h2>
              </div>
              <div className="rounded flex gap-4 items-center flex-col justify-center p-2 text-2xl cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdHighQuality />
                <h2>{locale === "ar" ? "جودة" : "Quality"}</h2>
              </div>
              <div className="rounded min-h-24 flex gap-4 items-center justify-center flex-col p-2 text-2xl cursor-pointer bg-sky-950 text-sky-100 text-center hover:bg-white shadow-sm hover:text-sky-950">
                <MdStar />
                <h2>{locale === "ar" ? "تميز" : "Excellence"}</h2>
              </div>
            </motion.div>
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#052f4a"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#052f4a" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#052f4a"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-48"
            ref={experienceRef}
          >
            <motion.h1
              initial={locale==="ar"?{ x: "300px" }:{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: 0 } : locale==="ar"?{ x: "300px" }:{ x: "-300px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="font-bold text-3xl text-sky-950"
            >
              {locale === "ar" ? "الرؤية, الرسالة والأهداف" : "Vision, Mission, and Goals"}
            </motion.h1>
            <motion.div
              initial={locale==="ar"?{ x: "300px" }:{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className=""
            >
              <div className="flex justify-between h-60">
                <div className="w-1/3">
                  <div className="bg-sky-950 p-3 font-semibold text-2xl rounded-b-lg rounded-l-lg text-gray-100">
                    {locale === "ar" ? "الرؤية" : "Vision"}
                  </div>
                  <div className="p-3 text-base italic text-sky-950/90">
                    {locale === "ar"
                      ? "نسعى لأن نكون الخيار الأول في مجال المحاسبة القانونية من خلال تقديم خدمات مالية متكاملة وموثوقة."
                      : "We strive to be the top choice in legal accounting by providing comprehensive and reliable financial services."}
                  </div>
                </div>
                <div className="w-1/6 flex justify-center">
                  <div className="w-1 h-full bg-sky-950 rounded relative">
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-950 bg-white -left-2"></div>
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>
              <div className="flex justify-between h-60">
                <div className="w-1/3"></div>
                <div className="w-1/6 flex justify-center">
                  <div className="w-1 h-full bg-sky-950 rounded relative">
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-950 bg-white -left-2"></div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="bg-sky-950 p-3 font-semibold text-2xl rounded-b-lg rounded-l-lg text-sky-50">
                    {locale === "ar" ? "الرسالة" : "Mission"}
                  </div>
                  <div className="p-3 text-base text-sky-950/90 italic">
                    {locale === "ar"
                      ? "تقديم خدمات محاسبية قانونية متكاملة تلبي احتياجات عملائنا من خلال الاحترافية والسرعة والكفاءة."
                      : "Providing comprehensive legal accounting services that meet our clients' needs through professionalism, speed, and efficiency."}
                  </div>
                </div>
              </div>
              <div className="flex justify-between h-60">
                <div className="w-1/3">
                  <div className="bg-sky-950 p-3 font-semibold text-2xl rounded-b-lg rounded-l-lg text-sky-50">
                    {locale === "ar" ? "الأهداف" : "Goals"}
                  </div>
                  <div className="p-3 text-base text-sky-950/90 italic">
                    {locale === "ar"
                      ? "تحقيق التميز في تقديم الخدمات المالية، وبناء علاقات طويلة الأمد مع عملائنا، وتطوير فريق عمل محترف ومؤهل."
                      : "Achieving excellence in financial services, building long-term client relationships, and developing a professional and qualified team."}
                  </div>
                </div>
                <div className="w-1/6 flex justify-center">
                  <div className="w-1 h-full bg-sky-950 rounded relative">
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-950 bg-white -left-2"></div>
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* SVG CONTAINER */}
        <div className="hidden xl:block w-1/3 sticky top-0 z-30 xl:w-1/2 min-h-screen">
          <Suspense fallback={<div className="h-full w-full"></div>}>
            {isBrainLoaded && <LazyBrain scrollYProgress={scrollYProgress} />}
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;