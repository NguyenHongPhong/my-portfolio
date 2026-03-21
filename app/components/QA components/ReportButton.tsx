'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";
import { FaExternalLinkAlt } from "react-icons/fa";
const ReportButton = () => {
    const params = useParams();
    const locale = params.locale;
    const [lang, setLang] = useState<any>({});
    const url = process.env.NEXT_PUBLIC_BASE_URL;
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
        <div className="my-4 md:flex md:justify-center">
            <a
                className="flex justify-center items-center gap-3 md:w-3/5 h-10 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white"
                href={url}
                target="_blank"
            >
                {lang.view_report}

                <FaExternalLinkAlt />
            </a>
        </div>)
};

export default ReportButton;