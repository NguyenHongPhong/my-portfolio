'use client'
import { useEffect, useState } from "react";
import { TestProgressProps } from "@/types";
import { IoMdCheckmark } from "react-icons/io";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";

export default function TestProgress({ testcases }: TestProgressProps) {
    const params = useParams();
    const locale = params.locale;
    const total = testcases.length;
    const [lang, setLang] = useState<any>({});
    const [countSuccess, setCountSuccess] = useState<number>(0);
    const [countFailed, setCountFailed] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        async function fetchLang() {
            if (typeof locale === 'string') {
                const dict = await getDictionary(locale);
                setLang(dict.QA.automation_section);
            }
        }

        fetchLang()
    }, [locale])

    useEffect(() => {
        const successCount = testcases.filter(
            tc => tc.status === "passed"
        ).length;

        const failedCount = testcases.filter(
            tc => tc.status === "failed"
        ).length;

        const brokenCount = testcases.filter(
            tc => tc.status === "broken"
        ).length;

        const process = (successCount / total) * 100;

        setCountSuccess(successCount);
        setCountFailed(failedCount + brokenCount);
        setProgress(process);
    }, [testcases]);


    return (
        <div className="w-full mt-5">
            <div style={{
                width: "100%",
                height: "20px",
                background: "#74777573",
                borderRadius: "10px",
                overflow: "hidden"
            }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "green",
                        transition: "width 0.5s"
                    }}

                /></div>

            <div className="flex justify-center">
                <span className="text-white -translate-y-[22px]">
                    {Math.round(progress)}%
                </span>
            </div>

            <div className="flex flex-col gap-5 items-center">
                <div className="flex gap-3 items-center">
                    <IoMdCheckmark color="green" size={30} />
                    <p className="dark:text-white text-black text-xl">{lang.total_test}: {total}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <IoMdCheckmark color="green" size={30} />
                    <p className="dark:text-white text-black text-xl">{lang.passed}: {countSuccess}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <IoMdCheckmark color="green" size={30} />
                    <p className="dark:text-white text-black text-xl">{lang.failed}: <span className="text-red-600 dark:text-red-500">
                        {countFailed}
                    </span></p>
                </div>

            </div>
        </div>
    );
}