import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import { GoArrowUpRight } from "react-icons/go";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import Image from "next/image";
import LinkPreview from "../components/LinkPreview";
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
            className="w-full h-72 object-cover object-bottom rounded-3xl"
            sizes="100vw"
          />
        </div>
      </div>
      <hr className="border-t dark:border-[#474747] border-amber-500 -mx-8 my-10" />
      <div className="grid grid-cols-1 gap-2 md:gap-10 md:grid-cols-2">

        <div>
          <h2 className="text-black dark:text-white font-bold text-2xl">{dict.home.portfolio_heading}</h2>
          <p className="text-black dark:text-white">{dict.home.portfolio_content}</p>
          <div className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5">
            <LinkPreview url="https://podcast-web-eight.vercel.app/" />
          </div>
        </div>

        <div className="text-black dark:text-white self-end">
          <h3 className="text-2xl mb-2">Podcast Landing Page</h3>
          <p className="dark:text-[#c7c7c7]">{dict.home.podcast_page_description}</p>
          <div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5">{dict.home.project_info}</div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5 flex justify-between">
              <span>{dict.home.project_year_info}</span>
              <span className="text-black dark:text-[#c7c7c7]">2025</span>
            </div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5 flex justify-between"> <span>
              {dict.home.project_role_info}</span>
              <span className="text-black dark:text-[#c7c7c7]">Front-end developer</span></div>
          </div>
          <Link href={'https://podcast-web-eight.vercel.app/'} className="flex py-5 gap-4">
            <div className="border-b-2 py-1 border-amber-500 dark:border-[#d3e97a] ">
              <div className="flex gap-4">
                <span className="text-amber-500 dark:text-[#d3e97a] font-bold">LIVE DEMO</span>
                <GoArrowUpRight className="text-amber-500 dark:text-[#d3e97a] font-black" size={20} />
              </div>
            </div>
          </Link>
        </div>

        <div>
          <div className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5">
            <LinkPreview url="https://portfolio-arif-personal-portfolio.vercel.app/" />
          </div>
        </div>

        <div className="text-black dark:text-white self-end">
          <h3 className="text-2xl mb-2">Personal portfolio</h3>
          <p className="dark:text-[#c7c7c7]">{dict.home.portfolio_page_description}</p>
          <div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5">{dict.home.project_info}</div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5 flex justify-between">
              <span>{dict.home.project_year_info}</span>
              <span className="text-black dark:text-[#c7c7c7]">2025</span>
            </div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5 flex justify-between"> <span>
              {dict.home.project_role_info}</span>
              <span className="text-black dark:text-[#c7c7c7]">Front-end developer</span></div>
          </div>
          <Link href={'https://portfolio-arif-personal-portfolio.vercel.app/'} className="flex py-5 gap-4">
            <div className="border-b-2 py-1 border-amber-500 dark:border-[#d3e97a] ">
              <div className="flex gap-4">
                <span className="text-amber-500 dark:text-[#d3e97a] font-bold">LIVE DEMO</span>
                <GoArrowUpRight className="text-amber-500 dark:text-[#d3e97a] font-black" size={20} />
              </div>
            </div>
          </Link>
        </div>

        <div>
          <div className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5">
            <LinkPreview url="https://banking-psi-umber.vercel.app/" />
          </div>
        </div>

        <div className="text-black dark:text-white self-end">
          <h3 className="text-2xl mb-2">App banking web</h3>
          <p className="dark:text-[#c7c7c7]">{dict.home.banking_page_description}</p>
          <div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5">{dict.home.project_info}</div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5 flex justify-between">
              <span>{dict.home.project_year_info}</span>
              <span className="text-black dark:text-[#c7c7c7]">2025</span>
            </div>
            <div className="text-xl border-b-2 dark:border-[#2f2f2f] border-amber-500 py-5 flex justify-between"> <span>
              {dict.home.project_role_info}</span>
              <span className="text-black dark:text-[#c7c7c7]">Front-end developer</span></div>
          </div>
          <Link href={'https://banking-psi-umber.vercel.app/'} className="flex py-5 gap-4">
            <div className="border-b-2 py-1 border-amber-500 dark:border-[#d3e97a] ">
              <div className="flex gap-4">
                <span className="text-amber-500 dark:text-[#d3e97a] font-bold">LIVE DEMO</span>
                <GoArrowUpRight className="text-amber-500 dark:text-[#d3e97a] font-black" size={20} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
