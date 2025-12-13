"use client";

import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa";

interface props {
    lang: string
};
export default function LanguageSwitcher({ lang }: props) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const items = [
        { code: "en", label: "EN", icon: "/usa-flag.png" },
        { code: "vn", label: "VN", icon: "/viet-nam-flag.png" },
    ];

    function changeLang(locale: string) {
        Cookies.set("NEXT_LOCALE", locale, { path: "/" });

        // Replace first segment of path with new locale
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
    }

    return (
        <div className="relative w-fit">
            <button
                className="flex items-center gap-2 px-3 py-2 rounded text-white font-medium
                        bg-linear-to-r from-blue-500 via-purple-500 to-pink-500
                        shadow-md hover:opacity-90 transition"
                onClick={() => setOpen(!open)}>
                <GrLanguage />
                <span className="grow">{lang}</span>
                <FaAngleDown />
            </button>

            {open && (
                <div className="absolute z-20 w-full bg-white border rounded shadow dark:bg-black dark:text-white">
                    {items.map(item => (
                        <button
                            key={item.code}
                            onClick={() => {
                                changeLang(item.code);
                                setOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                        >
                            <img src={item.icon} className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
