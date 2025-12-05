"use client";

import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    function changeLang(locale: string) {
        Cookies.set("NEXT_LOCALE", locale, { path: "/" });

        // Replace first segment of path with new locale
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
    }

    return (
        <div>
            <button onClick={() => changeLang("en")}>English</button>
            <button onClick={() => changeLang("vn")}>Việt Nam</button>
        </div>
    );
}
