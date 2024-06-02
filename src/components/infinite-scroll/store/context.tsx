import { createContext, useRef } from 'react'
import { paginationStore } from '~/components/infinite-scroll/store'

export const Context = createContext<ReturnType<typeof paginationStore> | null>(
    null
)

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const store = useRef(paginationStore())

    return <Context.Provider value={store.current}>{children}</Context.Provider>
}

export default ContextWrapper
