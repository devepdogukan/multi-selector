import { createStore } from 'zustand'
import { IStoreState } from '~/components/infinite-scroll/type'
import axios from 'axios'

const generateError = (error: unknown) => [
    axios.isAxiosError(error)
        ? error.response?.data?.error ?? error.message
        : 'An unknown error occurred',
]

const initStore = {
    isLoading: true,
    errors: [],
    data: [[]],
    currentPage: 2,
    totalCount: 0,
    totalPages: 0,
}

export const paginationStore = () =>
    createStore<IStoreState>((set, get) => ({
        ...initStore,
        fetchData: async (cb) => {
            set({ isLoading: true, errors: [], data: [] })

            try {
                const { data } = await cb()
                set({
                    data: [data.results],
                    isLoading: false,
                    totalCount: data.info.count,
                    totalPages: data.info.pages,
                })
            } catch (error) {
                set({
                    errors: generateError(error),
                    isLoading: false,
                })
            }
        },
        getNext: async (cb) => {
            const currentPage = get().currentPage
            const totalPages = get().totalPages

            if (currentPage > totalPages) return

            set({ isLoading: true, errors: [], currentPage: currentPage + 1 })

            try {
                const { data } = await cb({
                    params: {
                        page: currentPage,
                    },
                })
                set({
                    data: [...get().data, data.results],
                    isLoading: false,
                    totalCount: data.info.count,
                    totalPages: data.info.pages,
                })
            } catch (error) {
                set({
                    errors: generateError(error),
                    isLoading: false,
                    currentPage: currentPage - 1,
                })
            }
        },
        resetFields: () => {
            set({ ...initStore })
        },
        setIsLoading: (isLoading) => set(() => ({ isLoading })),
        setErrors: (errors) => set(() => ({ errors })),
        setData: (data) => set(() => ({ data })),
        setTotalPages: (totalPages) => set(() => ({ totalPages })),
        setCurrentPage: (currentPage) => set(() => ({ currentPage })),
    }))
