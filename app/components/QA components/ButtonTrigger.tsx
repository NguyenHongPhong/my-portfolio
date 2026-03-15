'use client';
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TestCase } from "@/types/client.types";
import ResultTCs from "./ResultTCs";
import { ThreeDots } from 'react-loader-spinner';
import CountdownLeft from "./CountdownLeft";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";

const ButtonTrigger = () => {
    const owner = "NguyenHongPhong"; // replace with your GitHub username
    const repo = "QA-automation-robot"; // replace with your GitHub repository name
    const deployFileName = "robot.yml"; // replace with your workflow file name or ID
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const [logs, setLogs] = useState<TestCase[]>([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const locale = params.locale;
    const [contentTriggerBtn, setContentTriggerBtn] = useState<string>("");

    const parseTestCasesFromLog = (logText: string) => {
        const lines = logText.split("\n");
        const testCases: { name: string; result: string }[] = [];

        for (const line of lines) {
            // Loại bỏ timestamp nếu có
            const cleanedLine = line.replace(/^\d{4}-\d{2}-\d{2}T[^\s]+Z\s+/, "");

            // Robot Framework thường có dạng: "Tên test | PASS |" hoặc "Tên test | FAIL |"
            const match = cleanedLine.match(/(.+)\s+\|\s+(PASS|FAIL)\s+\|/);
            if (match) {
                testCases.push({
                    name: match[1].trim(),
                    result: match[2]
                });
            }
        }

        return testCases;
    };
    const [endTime, setEndTime] = useState<number | null>(null);

    const triggerCICD = async () => {
        setLoading(true);
        setLogs([]);
        const endTime = Date.now() + 3 * 60 * 1000; // timeout sau 3 phút
        localStorage.setItem("cicd_end_time", endTime.toString());
        setEndTime(endTime);
        const TCs = localStorage.getItem("test_cases");
        if (TCs) {
            localStorage.removeItem("test_cases");
        };

        try {
            // 1. Trigger workflow
            const dispatchResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${deployFileName}/dispatches`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/vnd.github+json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ref: "main",
                        inputs: {
                            run_deploy: "true" // phải khớp với inputs trong YAML
                        }
                    })
                }
            );

            if (!dispatchResponse.ok) {
                const errorText = await dispatchResponse.text();
                throw new Error(`Dispatch failed: ${dispatchResponse.status} ${errorText}`);
            }

            // 2. Lấy run mới nhất
            const runsResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/actions/runs?branch=main&event=workflow_dispatch`,
                {
                    headers: {
                        "Accept": "application/vnd.github+json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            const runsData = await runsResponse.json();

            const latestRun = runsData.workflow_runs[0];
            if (!latestRun) {
                throw new Error("No workflow run found");
            }
            // console.log("Latest run:", latestRun.id, latestRun.status, latestRun.conclusion);

            // 3. Lấy danh sách jobs trong run
            const jobsResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/actions/runs/${latestRun.id}/jobs`,
                {
                    headers: {
                        "Accept": "application/vnd.github+json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            const jobsData = await jobsResponse.json();
            // console.log("Jobs:", jobsData.jobs.map((j: any) => ({
            //     id: j.id,
            //     name: j.name,
            //     status: j.status,
            //     conclusion: j.conclusion
            // })));

            // // 4. (Tuỳ chọn) Lấy log của từng job
            for (const job of jobsData.jobs) {
                // console.log(`Job ${job.name} (${job.id}) status: ${job.status} / ${job.conclusion}`);
                // Nếu muốn tải log:
                const logResponse = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/actions/jobs/${job.id}/logs`,
                    { headers: { "Authorization": `Bearer ${token}` } }
                );
                const logText = await logResponse.text();
                const TCs = parseTestCasesFromLog(logText);
                setLogs(pre => [...pre, ...TCs]);
                setLoading(false);
            }


        } catch (error) {
            console.error("Error triggering CI/CD workflow:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getRemainingTime = localStorage.getItem("cicd_end_time");
        if (getRemainingTime) {
            setEndTime(parseInt(getRemainingTime));
        }
    }, []);

    useEffect(() => {
        const scrollPosition = 988;
        if (window.scrollY < scrollPosition && loading) {
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
    }, [loading]);

    useEffect(() => {
        async function fetchLocale() {
            if (locale && typeof locale === "string") {
                const dict = await getDictionary(locale);
                const contentBtn = dict.QA.automation_section.button_trigger;
                setContentTriggerBtn(contentBtn);
            }
        }
        fetchLocale();
    }, [locale]);

    useEffect(() => {
        const isExisted = localStorage.getItem("test_cases");
        if (!isExisted && logs.length > 0) {
            localStorage.setItem("test_cases", JSON.stringify(logs));
        };

    }, [logs])

    useEffect(() => {
        const isExisted = localStorage.getItem("test_cases");
        if (isExisted) {
            const data = JSON.parse(isExisted);
            setLogs(pre => [...pre, data])
        };
    }, [])

    return (
        <div className="w-full">
            {endTime && endTime > 0 ? (<CountdownLeft setDisableTriggerBtn={setEndTime} />) : (
                <div className="flex justify-center items-center gap-2 md:w-3/5 h-10 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white"
                    onClick={triggerCICD}>
                    <FaPlay /> <span>{contentTriggerBtn}</span>
                </div>
            )}
            {loading && (
                <div className="flex justify-center">
                    <ThreeDots
                        height="50"
                        width="50"
                        radius="9"
                        color="#49cdf6"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ margin: '20px' }}
                        wrapperClass="custom-loader"
                        visible={loading}
                    />
                </div>
            )}
            {!loading && logs.length > 0 && <ResultTCs />}
        </div>);
}

export default ButtonTrigger;