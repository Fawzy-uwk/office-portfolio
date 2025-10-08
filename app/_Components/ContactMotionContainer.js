"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { FaPhoneVolume } from "react-icons/fa";
import Link from "next/link";
import { MdMail } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useLanguage } from "../context/LanguageContext";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-lg">
      <Spinner />
    </div>
  ),
});

const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false });

function ContactMotionContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div>
      <Toaster position="top-center" toastOptions={{ className: "text-sky-950" }} />
      <div className="xl:px-64 md:px-12 px-4 py-8 flex items-center justify-center mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 w-full h-full">
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={isMounted ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="col-span-3 flex flex-col gap-3"
          >
            <h2 className="text-3xl font-bold text-sky-950">
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </h2>
            <p className="text-lg text-sky-800">
              {locale === "ar"
                ? "للمزيد من الاستفسارات يمكنك ارسال رسالة لنا او التواصل معنا هاتفيا"
                : "For more inquiries, you can send us a message or contact us by phone"}
            </p>
            {isMounted && <ContactForm />}
            <div className="flex items-center gap-4 my-3 flex-wrap">
              <div className="flex items-center gap-2">
                <FaPhoneVolume className="text-sky-800 -rotate-45 text-xl md:text-4xl" />
                <p className="md:text-lg text-base font-semibold text-sky-950">
                  {locale === "ar" ? "الهاتف: " : "Phone: "}
                  <br />
                  +201006751652
                </p>
              </div>
              <div className="flex gap-2 px-1 items-center">
                <MdMail size={30} className="text-sky-800" />
                <Link
                  href="mailto:ahmed_shanwany@hotmail.com"
                  className="text-lg font-semibold cursor-pointer hover:text-sky-800 hover:underline transition-colors duration-100"
                  target="_blank"
                >
                  {locale === "ar" ? "البريد الالكترونى: " : "Email: "}
                  <br />
                  ahmed_shanwany@hotmail.com
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={isMounted ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            className="col-span-3 h-80 lg:h-full shadow mb-20 md:mb-0"
          >
            {isMounted && <Map />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactMotionContainer;