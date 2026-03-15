'use client'
import { CountdownLeftProps } from "@/types/client.types";
import { useEffect, useState } from "react";
const CountdownLeft = ({ setDisableTriggerBtn }: CountdownLeftProps) => {
    const getRemainingTime = localStorage.getItem("cicd_end_time");
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const remainingTime = getRemainingTime ? parseInt(getRemainingTime) - Date.now() : 0
            setMinutes(remainingTime);
            if (remainingTime <= 0) {
                clearInterval(timer);
                setMinutes(0);
                setDisableTriggerBtn(0);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    // Tính phút và giây
    const minute = Math.floor(minutes / 60000);
    const seconds = Math.floor((minutes % 60000) / 1000);

    // Format: thêm số 0 phía trước nếu giây < 10
    const formatted = `${minute}:${seconds.toString().padStart(2, "0")}`;


    return (
        <div className="flex justify-center items-center gap-2 md:w-3/5 h-10 rounded-md bg-blue-400  hover:cursor-not-allowed text-white"
        >
            <span>{formatted}</span>
        </div>
    )
}


export default CountdownLeft;