'use client';
import { TestCase } from "@/types";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import TestProgress from "./TestProcess";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import useBearStore from "@/app/store/useStore";
const ResultTCs = () => {
    const data = useBearStore((state) => state.TCs);
    const params = useParams();
    const locale = params.locale;
    const [lang, setLang] = useState<any>({});

    useEffect(() => {
        // window.scrollTo({ top: 1330.4000244140625, behavior: 'smooth' });
        async function fetchLang() {
            if (typeof locale === "string") {
                const dict = await getDictionary(locale);
                setLang(dict.QA.automation_section);
            }
        };

        fetchLang()
    }, []);

    return (
        <div className="mt-4 p-3">
            <div className="flex gap-3 items-center justify-center">
                <div className="dark:hidden"><IoCheckmarkDoneCircleSharp color="green" size={30} /></div>
                <div className="dark:block hidden"><IoCheckmarkDoneCircleSharp color="#d3e97a" size={30} /></div>
                <span className="text-xl text-black dark:text-white">{lang.test_completed}</span>
            </div>

            <TestProgress testcases={data} />

            <div className="border-b-2 border-b-(--color-paragraph) dark:border-b-(--border-color-in-dark) p-2 flex justify-center md:hidden" />
        </div>
    )
}

export default ResultTCs;