import { paramProps } from "@/types/client.types";
import { getDictionary } from "@/lib/get-dictionary";
import Image from "next/image";
import StackIcon from "tech-stack-icons";
import { IoMdCheckmark } from "react-icons/io";
export default async function QA(props: paramProps) {
    const localeParam = await props.params;
    const { locale } = localeParam;
    const dict = await getDictionary(locale);

    return (
        <div className="@container">
            <h1 className="text-black dark:text-white font-bold text-2xl mb-3 text-center">{dict.QA.heading}</h1>
            <h2 className="text-black dark:text-white font-bold text-xl mb-3 text-center">{dict.QA.subheading}</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div>
                    <Image
                        src="/portfolio-img-2.jpg"
                        alt="portfolio-img-2"
                        width={0}
                        height={0}
                        className="w-full xl:w-3/5 h-72 object-cover object-bottom rounded-3xl xl:object-[center_80%]
                                    xl:translate-x-36"
                        sizes="100vw"
                    />
                </div>
                <div>
                    <span className="text-black dark:text-white">{dict.QA.description}  <span className="font-bold text-(--text-color-primary-in-white) dark:text-(--text-color-in-dark)">{dict.QA.selenium}, {dict.QA.playwright}, {dict.QA.robot_framework}</span>.</span>

                    <div className="mt-5">
                        <div className=" relative w-full rounded-xl border border-amber-500 dark:border-[#d3e97a] h-fit p-3 grid grid-cols-5 gap-2">
                            <span className="text-black dark:text-[#c7c7c7] text-lg absolute left-4 -top-5 bg-white dark:bg-black p-2"> {dict.QA.tool}</span>

                            <div className="h-14 w-14 rounded-2xl p-2">
                                <StackIcon name="selenium" />
                            </div>

                            <div className="h-14 w-14 rounded-2xl p-2">
                                <StackIcon name="playwright" />
                            </div>

                            <div className="h-14 w-14 rounded-2xl p-2 flex items-center justify-center">
                                <img className="dark:hidden" src={'/Robotframework--Streamline-Simple-Icons.png'} alt="Robotframework--Streamline-Simple-Icons" />
                                <img className="hidden dark:block" src={'/Robotframework--Streamline-Simple-Icons-White.png'} alt="Robotframework--Streamline-Simple-Icons-White" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b-2 border-b-(--color-paragraph) dark:border-b-(--border-color-in-dark) p-2 flex justify-center" />

                <div className="dark:bg-[#171717] bg-[#f5f5f4] w-full p-2 text-black dark:text-white rounded-sm flex flex-col gap-2">
                    <div className="flex gap-2">
                        <IoMdCheckmark color="green" size={20} />
                        <p className=" truncate max-w-full">{dict.QA.list_checks.check_1}</p>
                    </div>
                    <div className="flex gap-2 truncate max-w-full">
                        <IoMdCheckmark color="green" size={30} />
                        <p className=" truncate max-w-full">{dict.QA.list_checks.check_2}</p>
                    </div>
                    <div className="flex gap-2 truncate max-w-full">
                        <IoMdCheckmark color="green" size={30} />
                        <p className=" truncate max-w-full">{dict.QA.list_checks.check_3}</p>
                    </div>
                    <div className="flex gap-2 truncate max-w-full">
                        <IoMdCheckmark color="green" size={20} />
                        <p className=" truncate max-w-full">{dict.QA.list_checks.check_4}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}