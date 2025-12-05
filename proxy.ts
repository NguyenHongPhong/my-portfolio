import { NextRequest, NextResponse } from "next/server";

const locales = ['en-US', 'fr', 'nl-NL'];

function getLocale(request: NextRequest) {
    // 1. Check cookie
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

    // 2. Check Accept-Language header
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang) {
        const preferred = acceptLang.split(',').map(l => l.split(';')[0].trim());
        const match = preferred.find(l => locales.includes(l));
        if (match) return match;
    }

    // 3. Fallback
    return 'en-US';
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/') ||
        pathname.match(/\.(.*)$/)
    ) return;

    // Already has locale?
    const hasLocale = locales.some(
        l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
    );
    if (hasLocale) return;

    // Redirect
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next).*)'] };
