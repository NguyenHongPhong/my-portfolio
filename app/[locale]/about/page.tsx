import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import { GoArrowUpRight } from "react-icons/go";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import Image from "next/image";
import LinkPreview from "@/app/components/LinkPreview";
import { emailContact, linkedInContact, twitterContact } from "@/constants";
import Link from "next/link";
interface paramProps {
    params: Promise<{ locale: Locale }>;
};

export default async function HomePage(props: paramProps) {
    const localeParam = await props.params;
    const { locale } = localeParam;
    const dict = await getDictionary(locale);

    return (
        <div className="@container">

        </div>
    );
}
