import { useContext } from 'react'
import { useStore } from 'zustand'
import { Context } from '~/components/multi-select/store/context'
import useActions from '~/hooks/use-actions'
import { ISelectedStore } from '../type'

export const useMultiSelectActions = () => useActions<ISelectedStore>(Context!)
export const useMultiSelectedList = () =>
    useStore(useContext(Context)!, (state) => state.list)

export const useSearchText = () =>
    useStore(useContext(Context)!, (state) => state.searchText)
