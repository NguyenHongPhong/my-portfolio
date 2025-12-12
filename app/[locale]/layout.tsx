import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import { ThemeSync } from "../components/ThemeSync";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vn" }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Hong Phong's portfolio",
  description: "Hồ sơ thông tin về các dự án đã làm và kinh nghiệm làm việc của Nguyễn Hồng Phong",
  openGraph: {
    title: "Kinh nghiệm và sản phẩm của Nguyễn Hồng Phong",
    description: "Hồ sơ thông tin về các dự án đã làm và kinh nghiệm làm việc của Nguyễn Hồng Phong",
    siteName: "Portfolio của Nguyễn Hồng Phong",
    images: [
      {
        url: "https://res.cloudinary.com/dd3bsow8r/image/upload/v1765506165/Screenshot_2025-12-11_182714_vp8scf.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {

  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={`bg-white dark:bg-black`}>
      <body>
        <ThemeSync />
        <Header work={dictionary.home.work} about={dictionary.home.about} contact={dictionary.home.contact} lang={dictionary.home.language} />
        {children}
      </body>
    </html>
  );
}
