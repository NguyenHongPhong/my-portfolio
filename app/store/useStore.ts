import { create } from 'zustand'
import { BearState } from '@/types';
import { TestCase } from '@/types';
const useBearStore = create<BearState>((set) => ({
    countSuccess: 0,
    countFailed: 0,
    TCs: [],
    loading: false,

    setSuccessCount: (value: number) =>
        set(() => ({ countSuccess: value })),

    setFailedCount: (value: number) =>
        set(() => ({ countFailed: value })),

    setData: (data: TestCase[]) => set(() => ({
        TCs: data
    })),

    setLoading: (state: boolean) => set(() => ({
        loading: state
    }))
}));

export default useBearStore;
