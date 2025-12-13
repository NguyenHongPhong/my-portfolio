'use client';
import { HeaderProps } from "@/types";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { RiInformation2Fill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeSync } from "./ThemeSync";

const Header = ({ about, home, work, lang }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();

    useLayoutEffect(() => {
        setOpen(false);
    }, [pathName]);

    useEffect(() => {
        const doc = document.body;
        if (open) {
            doc.style.overflow = "hidden";
        } else {
            doc.style.overflow = "auto";
        };
    }, [open]);

    return (
        <header className="@container">
            <div className="flex justify-between my-4 items-center ">
                <Link href={'/'} className="hidden md:block">
                    <h3 className="text-black dark:text-white font-black">HONG PHONG</h3>
                </Link>
                <div className="md:hidden">
                    <ThemeSwitcher />
                </div>
                <div className="md:hidden">
                    <LanguageSwitcher lang={lang} />
                </div>
                <div className="hidden md:block text-black dark:text-white">
                    <ul className="md:flex gap-5">
                        <li><Link href={'/'}>{home}</Link></li>
                        <li><Link href={'/about'}>{about}</Link></li>
                        <li><Link href={'/webs-portfolio'}>{work}</Link></li>
                    </ul>
                </div>
                <div className="hidden md:block">
                    <div className="flex gap-5 items-center">
                        <ThemeSwitcher />
                        <LanguageSwitcher lang={lang} />
                    </div>
                </div>
                <div className="md:hidden">
                    <FaBars className="text-black dark:text-white" onClick={() => setOpen(!open)} />
                </div>
                <div className={`fixed right-0 top-0 bg-white dark:bg-black text-black dark:text-white h-full w-full
                z-10 @container transition-all duration-500 ease-in-out ${open ? `opacity-100 pointer-events-auto translate-x-0`
                        : `opacity-0 pointer-events-none translate-x-full`}`}>
                    <div className="py-5 flex justify-end">
                        <FaArrowRight onClick={() => setOpen(!open)} />
                    </div>

                    <div className="border-b-2 border-b-(--color-paragraph) dark:border-b-(--border-color-in-dark) p-5 flex justify-center">
                        <div className="flex gap-2 items-center">
                            <IoHome size={20} />
                            <Link id="home" href={'/'}>{home}</Link>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-(--color-paragraph) dark:border-b-(--border-color-in-dark) p-5 flex justify-center">
                        <div className="flex gap-2 items-center">
                            <RiInformation2Fill size={20} />
                            <Link id="about" href={'/about'}>{about}</Link>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-(--color-paragraph) dark:border-b-(--border-color-in-dark) p-5 flex justify-center">
                        <div className="flex gap-2 items-center">
                            <BiTask size={20} />
                            <Link id="webs-portfolio" href={'/webs-portfolio'}>{work}</Link>
                        </div>
                    </div>
                </div>

            </div>
        </header>)
};

export default Header;