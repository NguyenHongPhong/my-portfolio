'use client'
import ButtonTrigger from "./ButtonTrigger";
import WrapperResultTC from "./WrapperResultTC";
import PieChart from "./PieChart";
import useBearStore from "@/app/store/useStore";
const AutomationSection = ({ dict }: { dict: any }) => {
    const loading = useBearStore(state => state.loading);

    return (<div className={`flex flex-col gap-3 mt-2 lg:gap-20 md:items-center justify-center lg:p-2 ${!loading && 'md:flex-row'}`}>
        <div className={`flex flex-col md:items-center bg-[#f5f5f4] dark:bg-black  p-4 rounded ${loading ? 'md:w-full' : 'md:w-[60%]'}`}>
            <ButtonTrigger lang={dict} />
            <WrapperResultTC />
        </div>
        <div>
            <PieChart />
        </div>
    </div>)
}

export default AutomationSection;