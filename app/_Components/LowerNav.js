import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";
import Navigation from "./Navigation";

function LowerNav() {
  const { locale,switchLocale} = useLanguage();
  return (
    <div className={`flex w-full items-center px-4 xl:px-64 justify-between pt-2 ${locale==="ar"?"flex-row-reverse":""} gap-10`}>
      <Logo />
      <Navigation />
       <button className="cursor-pointer text-sky-950 font-semibold text-xl hidden md:block" onClick={switchLocale}>{locale==="ar"?"AR":"EN"}</button>
    </div>
  );
}

export default LowerNav;
