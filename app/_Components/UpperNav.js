import Link from "next/link";
import { FaClock, FaPhoneVolume } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

function UpperNav() {
  const { locale } = useLanguage();

  return (
    <div className="w-full md:px-22 px-4 xl:px-60 py-4">
      <div className="flex items-center justify-center lg:justify-between w-full flex-wrap sm:flex-nowrap lg:gap-10 gap-3">
        <div className="flex items-center lg:gap-10 gap-4 sm:flex-nowrap flex-wrap justify-center w-full">
          <div className="flex items-center gap-1">
            <FaPhoneVolume className="text-sky-100 -rotate-45 text-xl md:text-4xl" />
            <p className="md:text-lg text-base font-semibold">{locale==="ar"?"4614 164 103 20+":"+20 103 164 2614"}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-sky-100 md:text-4xl" />
            <p className="md:text-lg text-base font-semibold">
              {locale === "ar" ? "السبت - الخميس 10 ص : 11 م" : "Saturday - Thursday 10 AM : 11 PM"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 px-1 hover:text-sky-600">
          <MdMail size={30} className=" hover:text-sky-600" />
          <Link
            href="mailto:ahmed_shanwany@hotmail.com"
            className="text-lg font-semibold cursor-pointer  hover:underline transition-colors duration-300"
            target="_blank"
          >
            ahmed_shanwany@hotmail.com
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpperNav;