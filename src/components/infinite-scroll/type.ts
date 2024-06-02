import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type InfiniteScrollProps = {
    fetchDataCallback: fetchCallbackType
    children: (item: never) => JSX.Element
    fetchDataIsInvalid?: boolean
}

type dataType = unknown[][]

export type fetchCallbackType = (
    op?: AxiosRequestConfig
) => Promise<AxiosResponse>

type fetchType = (cb: fetchCallbackType) => void

export interface IStoreState {
    isLoading: boolean
    errors: string[]
    data: dataType
    currentPage: number
    totalCount: number
    totalPages: number

    resetFields: () => void
    setIsLoading: (isLoading: boolean) => void
    setErrors: (errors: string[]) => void
    setData: (data: dataType) => void
    setTotalPages: (totalPages: number) => void
    setCurrentPage: (page: number) => void
    fetchData: fetchType
    getNext: fetchType
}
