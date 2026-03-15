'use client';
import { TestCase } from "@/types";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import TestProgress from "./TestProcess";
import CircularProgress from "./CicularProgress";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import { FaCircle } from "react-icons/fa";
const ResultTCs = () => {
    const params = useParams();
    const locale = params.locale;
    let TCs: TestCase[] = [];
    const [lang, setLang] = useState<any>({});
    const TCsInLocal = localStorage.getItem("test_cases");
    if (TCsInLocal) {
        const parsedTCs = JSON.parse(TCsInLocal);
        if (Array.isArray(parsedTCs)) {
            TCs = [...parsedTCs];
        }
    };
    const total = TCs.length;
    const successCount = TCs.filter(
        tc => tc.result === "PASS"
    ).length;

    const failedCount = TCs.filter(
        tc => tc.result === "FAILED"
    ).length;

    useEffect(() => {
        // window.scrollTo({ top: 1330.4000244140625, behavior: 'smooth' });
        async function fetchLang() {
            4
            if (typeof locale === "string") {
                const dict = await getDictionary(locale);
                setLang(dict.QA.automation_section);
            }
        };

        fetchLang()
    }, []);

    return (
        <div className="mt-4">
            <div className="flex gap-3 items-center justify-center">
                <div className="dark:hidden"><IoCheckmarkDoneCircleSharp color="green" size={30} /></div>
                <div className="dark:block hidden"><IoCheckmarkDoneCircleSharp color="#d3e97a" size={30} /></div>
                <span className="text-xl text-black dark:text-white">{lang.test_completed}</span>
            </div>

            <TestProgress testcases={TCs} />

            <div className="border-b-2 border-b-(--color-paragraph) dark:border-b-(--border-color-in-dark) p-2 flex justify-center" />

            <div className="flex items-center flex-col gap-4 mt-6">
                <h2 className="text-black dark:text-white text-2xl font-bold">{lang.success_rate}</h2>
                <CircularProgress success={successCount} failed={failedCount} />
                <div className="mt-4 flex gap-5">
                    <div className="flex gap-4">
                        <FaCircle color="#6aa786" size={20} />
                        <span className="text-black dark:text-white">
                            <span className="font-bold mr-2">{successCount}</span>
                            <span>{lang.passed}</span>
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <FaCircle color="#e67a7a" size={20} />
                        <span className="text-black dark:text-white">
                            <span className="font-bold mr-2">{failedCount}</span>
                            <span>{lang.failed}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultTCs;