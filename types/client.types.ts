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

type TestCase = {
    name: string;
    status: string;
    duration: number
};

type CountdownLeftProps = {
    setDisableTriggerBtn: React.Dispatch<React.SetStateAction<number | null>>;
};

type TestProgressProps = {
    testcases: TestCase[];
};

type CircularProps = {
    percentage: number;
    size?: number;
    strokeWidth?: number;
};

type BearState = {
    countSuccess: number;
    countFailed: number;
    setSuccessCount: (value: number) => void;
    setFailedCount: (value: number) => void;
    setLoading: (value: boolean) => void;
    setData: (value: TestCase[]) => void;
    TCs: TestCase[],
    loading: boolean
};

export type { HeaderProps, paramProps, TestCase, CountdownLeftProps, TestProgressProps, CircularProps, BearState };