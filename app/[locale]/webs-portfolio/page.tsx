import { getDictionary } from "@/lib/get-dictionary";
import LinkPreview from "@/app/components/LinkPreview";
import Image from "next/image";
import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";
import { emailContact, linkedInContact, twitterContact } from "@/constants";
interface paramProps {
    params: Promise<{ locale: string }>;
};

export default async function WebsPortfolio(props: paramProps) {
    const localeParam = await props.params;
    const { locale } = localeParam;
    const dict = await getDictionary(locale);

    return (
        <div className="@container">
            <div>
                <h1 className="text-black dark:text-white font-bold text-2xl mb-3">{dict.webs_portfolio.title}</h1>

                {/*INTRODUCTION*/}
                <div className="md:grid md:grid-cols-2 md:gap-5 md:my-5">
                    <div>
                        <div>
                            <Image
                                src="/portfolio-img-2.jpg"
                                alt="portfolio-img-2"
                                width={0}
                                height={0}
                                className="w-full xl:w-3/5 h-72 object-cover object-bottom rounded-3xl xl:object-[center_80%]
                                xl:translate-x-36
                                "
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* INTRODUCTION DESCRIPTION*/}
                    <div className="mt-5 md:mt-0">
                        <h2 className="text-black dark:text-white font-bold text-2xl">{dict.webs_portfolio.heading_greeting}</h2>
                        <p className="text-black dark:text-[#c7c7c7cf] font-bold text-base mt-3">{dict.webs_portfolio.short_description}</p>
                        <p className="text-black dark:text-[#c7c7c7cf] font-bold text-base mt-3">{dict.webs_portfolio.short_description_2}</p>

                        {/* TECH STACK USE WITH */}
                        <div className="flex flex-col gap-5 md:flex-row md:justify-center md:items-center mt-10">
                            <div>
                                <div className=" relative w-full rounded-xl border-2 border-amber-500 dark:border-[#d3e97a] h-fit p-3 grid grid-cols-5 gap-2">
                                    <span className="text-black dark:text-[#c7c7c7] text-lg absolute left-4 -top-6 bg-white dark:bg-black p-2"> {dict.webs_portfolio.tech_stack_use_with}</span>

                                    <div className="h-14 w-14 rounded-2xl p-2">
                                        <img src={'/React.png'} alt="react-tech-stack" />
                                    </div>

                                    <div className="h-14 w-14 rounded-2xl p-2 dark:hidden">
                                        <img src={'/Next.js.png'} alt="next-tach-stack" />
                                    </div>

                                    <div className="h-14 w-14 rounded-2xl p-2 hidden dark:block">
                                        <img src={'/Next.js.dark.png'} alt="next-tach-stack" />
                                    </div>


                                    <div className="h-14 w-14 rounded-2xl p-2">
                                        <img src={'/Git.png'} alt="git" />
                                    </div>

                                    <div className="h-14 w-14 rounded-2xl p-2">
                                        <img src={'/Tailwind CSS.png'} alt="figma" />
                                    </div>

                                    <div className="h-14 w-14 rounded-2xl p-2">
                                        <img src={'/Figma.png'} alt="figma" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*CONTACT*/}
                        <div className="flex mt-5 h-12 gap-10 justify-center">
                            <div className="bg-[#f1a10d] dark:bg-[#d3e97a] h-full rounded-3xl p-3 flex items-center gap-3">
                                <span className="font-bold text-white dark:text-black md:text-[12px]">{dict.home.contact_me}</span>
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
                </div>

                <hr className="border-t dark:border-[#474747] border-amber-500 -mx-8 my-10"></hr>

                <div>
                    <div className="flex gap-3 items-center mb-3">
                        <div>
                            <Image src={'/recent-ones.png'} height={50} width={50} alt="recent-ones" />
                        </div>
                        <h1 className="text-black dark:text-white text-xl font-bold">{dict.webs_portfolio.recent_ones}</h1>
                    </div>
                    <div className="border-2 border-(--bg-color-in-light) dark:border-(--border-color-in-dark) w-fit h-fit
                    grid grid-cols-1 p-2 rounded-2xl justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                    ">
                        <Link href={'https://podcast-web-eight.vercel.app/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://podcast-web-eight.vercel.app/" />
                        </Link>

                        <Link href={'https://pet-care-wuoi.vercel.app/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://pet-care-wuoi.vercel.app/" />
                        </Link>

                        <Link href={'https://banking-psi-umber.vercel.app/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://banking-psi-umber.vercel.app/" />
                        </Link>

                        <Link href={'https://dental-care-eight-sigma.vercel.app/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://dental-care-eight-sigma.vercel.app/" />
                        </Link>

                        <Link href={'https://grocery-e-commerce-mu.vercel.app/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://grocery-e-commerce-mu.vercel.app/" />
                        </Link>


                        <Link href={'https://portfolio-arif-personal-portfolio.vercel.app/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://portfolio-arif-personal-portfolio.vercel.app/" />
                        </Link>

                        <Link href={'https://nguyenhongphong.github.io/portfolio-education-dev/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://nguyenhongphong.github.io/portfolio-education-dev/" />
                        </Link>

                        <Link href={'https://nguyenhongphong.github.io/portfolio-landing-page/'} className="rounded-xl p-3 dark:bg-[#1a1a1a] my-5 w-11/12">
                            <LinkPreview url="https://nguyenhongphong.github.io/portfolio-landing-page/" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
