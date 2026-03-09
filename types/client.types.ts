interface HeaderProps {
    work: string,
    about: string,
    home: string,
    lang: string,
    QA: string
}

interface paramProps {
    params: Promise<{ locale: string }>;
};

export type { HeaderProps, paramProps };