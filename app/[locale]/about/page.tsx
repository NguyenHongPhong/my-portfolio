import { getDictionary } from "@/lib/get-dictionary";
import { RiTelegram2Fill } from "react-icons/ri";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { emailContact, linkedInContact, twitterContact } from "@/constants";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
interface paramProps {
    params: Promise<{ locale: string }>;
};

export default async function HomePage(props: paramProps) {
    const localeParam = await props.params;
    const { locale } = localeParam;
    const dict = await getDictionary(locale);

    return (
        <div className="@container">
            <div>

                <h1 className="text-black dark:text-white font-bold text-2xl">{dict.home.about_me}</h1>

                {/*INTRODUCTION*/}
                <div className="md:grid md:grid-cols-2 md:gap-5 md:my-5">
                    {/* ABOUT ME HEADDING */}
                    <div>
                        <div>
                            <Image
                                src="/portfolio-img.jpg"
                                alt="portfolio-img.jpg"
                                width={0}
                                height={0}
                                className="w-full xl:w-3/5 h-72 object-cover object-bottom rounded-3xl xl:object-[center_80%]
                                xl:translate-x-36
                                "
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* INTRODUCTION */}
                    <div className="mt-5 md:mt-0">
                        <h1 className="text-black dark:text-white font-bold text-xl">{dict.home.introduction}</h1>
                        <p className="text-black dark:text-[#c7c7c7] text-lg mt-4">{dict.home.introduction_2}</p>

                        {/* CONTACT */}
                        <div className="flex mt-5 h-12 gap-10">
                            <div className="bg-[#f1a10d] dark:bg-[#d3e97a] h-full rounded-3xl p-3 flex items-center gap-3 ">
                                <a href="/files/Nguyen-Hong-Phong-resume.pdf"
                                    download="Nguyen-Hong-Phong-resume.pdf"
                                    className={`font-bold text-white dark:text-black ${locale && locale === "en" ? `text-[12px]` : `text-lg`}`}>
                                    {dict.about.download_resume}</a>
                                <div className="w-8 h-8 bg-white dark:bg-black rounded-full flex items-center justify-center">
                                    <MdOutlineFileDownload className="text-black dark:text-white" size={20} />
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

                                {locale && locale === 'en' ? '' : (<a
                                    href={`https://t.me/${twitterContact}?text=Hello%20I%20want%20to%20contact%20you`}
                                    target="_blank"
                                    className="h-10 w-10 rounded-full bg-[#f1a10d] dark:bg-[#222222] flex justify-center items-center"
                                >
                                    <RiTelegram2Fill className="text-white dark:text-[#d3e97a]" size={20} />
                                </a>)}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-t dark:border-[#474747] border-amber-500 -mx-8 my-10"></hr>

                {/*CAPABILITIES*/}
                <div>
                    <h2 className="text-black dark:text-white font-bold text-2xl">{dict.about.skills}</h2>
                    <div className="my-3">
                        <p className="text-black dark:text-(--color-paragraph) text-lg mb-5">{dict.about.short_description}</p>
                        <div className="grid grid-cols-3 text-white gap-3 md:grid-cols-6">
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                HTML
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                CSS
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                JAVASCRIPT
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                FIGMA
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                TAILWIND
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                SQL
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                MYSQL
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                REACTJS
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                NODEJS
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                TYPESCRIPT
                            </div>
                            <div className=" border bg-(--bg-color-in-light) dark:bg-black dark:border-(--border-color-in-dark) rounded-2xl p-2 flex justify-center items-center">
                                GIT
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-t dark:border-[#474747] border-amber-500 -mx-8 my-10"></hr>

                {/*EXPERIENCES */}
                <div className="my-10">
                    <div>
                        {/* EXPERIENCES HEADDING */}
                        <h2 className="text-black dark:text-white font-bold text-2xl">{dict.about.experiences}</h2>
                    </div>

                    {/*EXPERIENCES IN DETAIL*/}
                    <div>

                        {/*GOFIBER */}
                        <div className="mt-5">
                            <h2 className="text-(--bg-color-in-light) dark:text-(--bg-color-in-dark) font-bold text-2xl my-5">{dict.about.company} GOFIBER</h2>
                            <div className="md:flex md:gap-3">
                                <h2 className="text-black dark:text-white font-bold text-xl">Front-end developer</h2>
                                <p className="text-black dark:text-[#c7c7c7] text-lg my-4 md:my-0">02/2025 - 12/2025</p>
                            </div>

                            <span className="text-black dark:text-white font-bold text-xl">{dict.about.responsibilities}</span>
                            <ul className="text-black dark:text-[#c7c7c7] list-disc list-inside">
                                <li>{dict.about.go_fiber.responsibility_1}</li>
                                <li>{dict.about.go_fiber.responsibility_2}</li>
                            </ul>
                        </div>

                        {/*TRI THUC */}
                        <div>
                            {/* EXPERIENCES IN DETAIL */}
                            <div className="mt-5">
                                <h2 className="text-(--bg-color-in-light) dark:text-(--bg-color-in-dark) font-bold text-2xl my-5">{dict.about.company} TRI THUC</h2>
                                <div className="md:flex md:gap-3">
                                    <h2 className="text-black dark:text-white font-bold text-xl">Fullstack developer</h2>
                                    <p className="text-black dark:text-[#c7c7c7] text-lg my-4 md:my-0">02/2024 - 12/2024</p>
                                </div>

                                <span className="text-black dark:text-white font-bold text-xl">{dict.about.responsibilities}</span>
                                <ul className="text-black dark:text-[#c7c7c7] list-disc list-inside">
                                    <li>{dict.about.tri_thuc.responsibility_1}</li>
                                    <li>{dict.about.tri_thuc.responsibility_2}</li>
                                    <li>{dict.about.tri_thuc.responsibility_3}</li>
                                </ul>
                            </div>
                        </div>

                        {/*TMA SOLUTIONS*/}
                        <div>
                            {/* EXPERIENCES IN DETAIL */}
                            <div className="mt-5">
                                <h2 className="text-(--bg-color-in-light) dark:text-(--bg-color-in-dark) font-bold text-2xl my-5">{dict.about.company} TMA SOLUTIONS</h2>
                                <div className="md:flex md:gap-3">
                                    <h2 className="text-black dark:text-white font-bold text-xl">Data Engineer</h2>
                                    <p className="text-black dark:text-[#c7c7c7] text-lg my-4 md:my-0">09/2022 - 12/2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
