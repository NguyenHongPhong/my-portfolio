import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import { GoArrowUpRight } from "react-icons/go";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import Image from "next/image";
import { emailContact, linkedInContact, twitterContact } from "@/constants";
interface paramProps {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage(props: paramProps) {
  const localeParam = await props.params;
  const { locale } = localeParam;
  const dict = await getDictionary(locale);

  return (
    <div className="@container">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-black dark:text-white font-bold text-2xl">{dict.home.heading}</h2>
          <h1 className="text-black dark:text-white font-bold text-2xl">{dict.home.headingName}</h1>
          <p className="text-black dark:text-white text-xl mt-4">{dict.home.introduction}</p>
          <a href="#" className="text-black dark:text-white text-xl mt-3 text-center w-full block">{dict.home.more}</a>

          <div className="flex mt-5 h-12 gap-10">
            <div className="bg-[#f1a10d] dark:bg-[#d3e97a] h-full rounded-3xl p-3 flex items-center gap-3">
              <span className="font-bold text-white dark:text-black">{dict.home.contact_me}</span>
              <div className="w-8 h-8 bg-white dark:bg-black rounded-full flex items-center justify-center">
                <GoArrowUpRight className="text-black dark:text-white" size={20} />
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailContact}.com&su=${dict.home.subject_in_mail}&body=${dict.home.content_in_mail}`}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#f1a10d] dark:bg-[#222222] flex justify-center items-center"
              >
                <BiLogoGmail className="text-white dark:text-[#d3e97a]" size={20} />
              </a>

              <a
                href={`https://www.linkedin.com/in/${linkedInContact}`}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#f1a10d] dark:bg-[#222222] flex justify-center items-center"
              >
                <FaLinkedinIn className="text-white dark:text-[#d3e97a]" size={20} />
              </a>


              <a
                href={`https://t.me/${twitterContact}?text=Hello%20I%20want%20to%20contact%20you`}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#f1a10d] dark:bg-[#222222] flex justify-center items-center"
              >
                <RiTelegram2Fill className="text-white dark:text-[#d3e97a]" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div>
          <Image
            src="/avt.jpg"
            alt="hong-phong-avt"
            width={0}
            height={0}
            className="w-full h-72 object-cover rounded-3xl"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
