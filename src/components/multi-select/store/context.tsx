import { createContext, useRef } from 'react'
import { multiSelectStore } from '~/components/multi-select/store'

export const Context = createContext<ReturnType<
    typeof multiSelectStore
> | null>(null)

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const store = useRef(multiSelectStore())

    return <Context.Provider value={store.current}>{children}</Context.Provider>
}

export default ContextWrapper
