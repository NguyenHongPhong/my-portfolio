'use client'
import { useEffect, useState } from "react";
import ReportButton from "@/app/components/QA components/ReportButton";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";
import useBearStore from "@/app/store/useStore";
const ReportSection = () => {
    const params = useParams();
    const locale = params.locale;
    const [lang, setLang] = useState<any>({});
    const loading = useBearStore((state) => state.loading);
    const data = useBearStore((state) => state.TCs);

    useEffect(() => {
        async function fetchLang() {
            if (typeof locale === "string") {
                const dict = await getDictionary(locale);
                setLang(dict.QA.test_report);
            }
        };

        fetchLang()
    }, []);

    return (
        <div>
            {!loading && data.length > 0 && (<>
                <h2 className="text-black dark:text-white font-bold text-2xl mb-3 text-center mt-3">{lang.heading}</h2>
                <p className="text-black dark:text-white text-xl text-center">{lang.description}</p>
                <ReportButton />
            </>)}
        </div>
    )
};

export default ReportSection;