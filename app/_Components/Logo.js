import Image from "next/image";
import Link from "next/link";
import logo from "@/public/office-logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-[150]">
      <Image
        src={logo}
        height={80}
        width={80} // ✅ Set explicit width to avoid layout shift
        alt="Office Logo"
        priority // ✅ Load eagerly for better LCP
      />
    </Link>
  );
}

export default Logo;
