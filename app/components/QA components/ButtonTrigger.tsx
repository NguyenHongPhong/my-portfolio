'use client';
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TestCase } from "@/types/client.types";
import { ThreeDots } from 'react-loader-spinner';
import CountdownLeft from "./CountdownLeft";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";
import useBearStore from "@/app/store/useStore";

const ButtonTrigger = ({ lang }: { lang: any }) => {
    const owner = process.env.NEXT_PUBLIC_OWNER;
    const repo = process.env.NEXT_PUBLIC_REPO;
    const deployFileName = process.env.NEXT_PUBLIC_CICD_FILE_NAME;
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [endTime, setEndTime] = useState<number | null>(null);
    const setLoading = useBearStore((state) => state.setLoading);
    const loading = useBearStore((state) => state.loading);
    const setLogs = useBearStore((state) => state.setData);
    const logs = useBearStore((state) => state.TCs);


    const triggerCICD = async () => {
        setLoading(true);
        setLogs([]);
        const endTime = Date.now() + 4 * 60 * 1000; // timeout sau 4 phút
        localStorage.setItem("cicd_end_time", endTime.toString());
        setEndTime(endTime);
        const TCs = localStorage.getItem("test_cases");
        if (TCs) {
            localStorage.removeItem("test_cases");
        };

        const runAutomation = async () => {
            try {
                // =========================
                // 1. Trigger workflow
                // =========================
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
                            inputs: { run_deploy: "true" }
                        })
                    }
                );

                setLoading(true);
                setLogs([]);

                if (!dispatchResponse.ok) {
                    const errorText = await dispatchResponse.text();
                    throw new Error(`Dispatch failed: ${dispatchResponse.status} ${errorText}`);
                }

                // =========================
                // 2. Đợi tạo run
                // =========================
                await new Promise(r => setTimeout(r, 4000));

                // =========================
                // 3. Lấy run mới nhất
                // =========================
                const runsResponse = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/actions/runs?branch=main&event=workflow_dispatch`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const runsData = await runsResponse.json();
                const latestRun = runsData.workflow_runs?.[0];

                if (!latestRun) throw new Error("No workflow run found");

                const runId = latestRun.id;

                // =========================
                // 4. WAIT workflow completed
                // =========================
                let status = latestRun.status;

                while (status !== "completed") {
                    await new Promise(r => setTimeout(r, 5000));

                    const res = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    const data = await res.json();
                    status = data.status;

                    console.log("Workflow status:", status);
                }

                console.log("CI DONE");

                // =========================
                // 5. WAIT job generate-allure-report
                // =========================
                let isAllureJobDone = false;

                while (!isAllureJobDone) {
                    await new Promise(r => setTimeout(r, 5000));

                    const jobsResponse = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    );

                    const jobsData = await jobsResponse.json();

                    const allureJob = jobsData.jobs.find(
                        (j: any) => j.name === "generate-allure-report"
                    );

                    if (allureJob && allureJob.status === "completed") {
                        isAllureJobDone = true;
                        console.log("Allure job DONE");
                    } else {
                        console.log("Waiting Allure job...");
                    }
                }

                // =========================
                // 6. WAIT GitHub Pages deploy
                // =========================
                let isReportReady = false;
                let retry = 0;

                while (!isReportReady && retry < 20) {
                    try {
                        await new Promise(r => setTimeout(r, 5000));

                        const res = await fetch(
                            `${baseUrl}/widgets/summary.json?cache=${Date.now()}`
                        );

                        if (res.ok) {
                            isReportReady = true;
                            console.log("Allure report READY");
                            break;
                        }
                    } catch (e) { }

                    retry++;
                    console.log("Waiting GitHub Pages deploy...");
                }

                if (!isReportReady) {
                    throw new Error("Allure report not ready");
                }

                // =========================
                // 7. FETCH SUMMARY
                // =========================
                const summaryRes = await fetch(
                    `${baseUrl}/widgets/summary.json?cache=${Date.now()}`
                );

                const summary = await summaryRes.json();

                console.log("TOTAL:", summary.statistic.total);

                // =========================
                // 8. FETCH TEST CASES
                // =========================
                const suitesRes = await fetch(
                    `${baseUrl}/data/behaviors.json?cache=${Date.now()}`
                );

                if (!suitesRes.ok) {
                    throw new Error("Cannot fetch Allure behaviors.json");
                }


                const suitesData = await suitesRes.json();

                // =========================
                // 9. FLATTEN TREE
                // =========================
                const allTCs: TestCase[] = [];

                const extract = (items: any[]) => {
                    items.forEach((item: any) => {

                        // có children → đi tiếp
                        if (item.children && item.children.length > 0) {
                            extract(item.children);
                            return;
                        }

                        // ✅ đây là TEST CASE thật
                        if (item.status) {
                            allTCs.push({
                                name: item.name,
                                status: item.status,
                                duration: item.time?.duration || 0
                            });
                        }
                    });
                };

                extract(suitesData.children || []);

                // =========================
                // 10. SET RESULT
                // =========================
                setLogs(allTCs);
                setLoading(false);
                localStorage.setItem("test_cases", JSON.stringify(allTCs));
            } catch (error: any) {
                console.error(error);
                setLoading(false);
            }
        };

        runAutomation();
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
        const isExisted = localStorage.getItem("test_cases");
        if (!isExisted && logs.length > 0) {
            localStorage.setItem("test_cases", JSON.stringify(logs));
        };

    }, [logs])

    useEffect(() => {
        const isExisted = localStorage.getItem("test_cases");
        if (isExisted) {
            const data = JSON.parse(isExisted);
            setLogs(data)
        };
    }, [])

    return (
        <div className="w-full md:w-1/2 lg:w-full lg:flex-col lg:justify-center">
            {endTime && endTime > 0 ? (<CountdownLeft setDisableTriggerBtn={setEndTime} />) : (
                <div className="flex justify-center items-center gap-2 md:w-full  h-10 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white"
                    onClick={triggerCICD}>
                    <FaPlay />
                    <span>{lang.QA.automation_section.button_trigger}</span>
                </div>
            )}
            {loading && (
                <div className="flex items-center  flex-col">
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

                    <span className="text-black dark:text-white text-center text-xl">{lang.QA.take_minutes}</span>
                </div>
            )}
        </div>);
}

export default ButtonTrigger;