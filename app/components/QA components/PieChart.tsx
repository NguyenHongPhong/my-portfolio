'use client'
import { FaCircle } from "react-icons/fa";
import DonutChart from "./CicularProgress";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import useBearStore from "@/app/store/useStore";

const PieChart = () => {
    const params = useParams();
    const locale = params.locale;
    const [lang, setLang] = useState<any>({});
    const countSuccess = useBearStore((state) => state.countSuccess);
    const countFailed = useBearStore((state) => state.countFailed);
    const setCountSuccess = useBearStore((state) => state.setSuccessCount);
    const setCountFailed = useBearStore((state) => state.setFailedCount);
    const loading = useBearStore(state => state.loading);
    const data = useBearStore(state => state.TCs);

    useEffect(() => {
        async function fetchLang() {
            if (typeof locale === "string") {
                const dict = await getDictionary(locale);
                setLang(dict.QA.automation_section);
            }
        };

        fetchLang()
    }, []);

    useEffect(() => {
        const TCsInLocal = localStorage.getItem("test_cases");
        if (TCsInLocal) {
            const parsedTCs = JSON.parse(TCsInLocal);
            if (Array.isArray(parsedTCs)) {
                const successCount = parsedTCs.filter(
                    tc => tc.status === "passed"
                ).length;

                const failedCount = parsedTCs.filter(
                    tc => tc.status === "failed"
                ).length;

                const brokenCount = parsedTCs.filter(
                    tc => tc.status === "broken"
                ).length;
                setCountSuccess(successCount);
                setCountFailed(failedCount + brokenCount);
            }

        };
    }, []);

    useEffect(() => {
        const successCount = data.filter(
            tc => tc.status === "passed"
        ).length;

        const failedCount = data.filter(
            tc => tc.status === "failed"
        ).length;

        const brokenCount = data.filter(
            tc => tc.status === "broken"
        ).length;

        setCountSuccess(successCount);
        setCountFailed(failedCount + brokenCount);
    }, [data]);

    return (
        <div className="flex items-center flex-col gap-4 mt-6">
            {data.length > 0 && !loading &&
                (<>
                    <h2 className="text-black dark:text-white text-2xl font-bold">{lang.success_rate}</h2>
                    <DonutChart success={countSuccess} failed={countFailed} />
                    <div className="mt-4 flex gap-5">
                        <div className="flex gap-4">
                            <FaCircle color="#6aa786" size={20} />
                            <span className="text-black dark:text-white">
                                <span className="font-bold mr-2">{countSuccess}</span>
                                <span>{lang.passed}</span>
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <FaCircle color="#e67a7a" size={20} />
                            <span className="text-black dark:text-white">
                                <span className="font-bold mr-2">{countFailed}</span>
                                <span>{lang.failed}</span>
                            </span>
                        </div>
                    </div></>)}
        </div>
    );
}

export default PieChart;