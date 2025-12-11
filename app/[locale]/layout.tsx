import { getDictionary } from "@/lib/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import { ThemeSync } from "../components/ThemeSync";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
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
        url: "https://drive.google.com/file/d/1afSK0L5dmJOHa-8sXpoh11zksWdCsIrq/view?usp=drive_link",
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;
  const {
    children
  } = props;

  const { locale } = params;

  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={`bg-white dark:bg-black`}>
      <head>
        {/* Other head elements */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem('theme');
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } catch (e) {
                    console.error('Error setting initial theme:', e);
                  }
                })();
              `,
          }}
        />
      </head>
      <body>
        <ThemeSync />
        <Header work={dictionary.home.work} about={dictionary.home.about} contact={dictionary.home.contact} lang={dictionary.home.language} />
        {children}
      </body>
    </html>
  );
}
