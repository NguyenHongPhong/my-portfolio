import { Metadata } from "next";

export default function Head({ params }: { params: { locale: string } }) {
    const locale = params.locale;

    // 🔥 Bạn có thể chạy logic thoải mái
    const title =
        locale === "vn"
            ? "Kinh nghiệm và sản phẩm của Nguyễn Hồng Phong"
            : "Hong Phong's Portfolio";

    return (
        <>
            <title>{title}</title>

            <meta
                name="description"
                content="Hồ sơ thông tin về các dự án đã làm và kinh nghiệm làm việc của Nguyễn Hồng Phong"
            />

            {/* OpenGraph */}
            <meta property="og:title" content={title} />
            <meta
                property="og:description"
                content="Hồ sơ thông tin về các dự án đã làm và kinh nghiệm làm việc của Nguyễn Hồng Phong"
            />
            <meta
                property="og:image"
                content="https://res.cloudinary.com/dd3bsow8r/image/upload/v1765506165/Screenshot_2025-12-11_182714_vp8scf.png"
            />
            <meta property="og:type" content="website" />

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
        </>
    );
}
