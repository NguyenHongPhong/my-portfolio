import { getDictionary } from "../../lib/get-dictionary";
import { i18n, Locale } from "../../i18n-config";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params; // ✅ no await

  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        {/* you can pass dictionary via context/provider */}
        {children}
      </body>
    </html>
  );
}
