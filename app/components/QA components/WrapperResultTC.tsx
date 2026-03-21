'use client'
import ResultTCs from "@/app/components/QA components/ResultTCs";
import useBearStore from "@/app/store/useStore";
const WrapperResultTC = () => {
    const loading = useBearStore((state) => state.loading);
    const logs = useBearStore((state) => state.TCs);

    return (
        <div className="lg:w-9/12">
            {!loading && logs.length > 0 && <ResultTCs />}
        </div>
    )
};

export default WrapperResultTC;