"use client";

import { useLayoutEffect } from "react";

export function ThemeSync() {
    useLayoutEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return null;
}
