import { useContext } from 'react'
import { StoreApi, useStore } from 'zustand'

type FunctionKeys<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

type StoreFunctions<T> = Pick<T, FunctionKeys<T>>

const useActions = <T>(
    context: React.Context<StoreApi<T> | null>
): StoreFunctions<T> => {
    const store = useContext(context)
    if (!store) {
        throw new Error('useActions must be used within a Provider')
    }

    return useStore(store, (state) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...Object.entries(state as { [key: string]: any }).reduce(
            (acc, [key, value]) => {
                if (typeof value === 'function') {
                    acc[key as keyof StoreFunctions<T>] = value
                }
                return acc
            },
            {} as StoreFunctions<T>
        ),
    }))
}

export default useActions
