import { useContext } from 'react'
import { useStore } from 'zustand'
import { Context } from '~/components/infinite-scroll/store/context'
import useActions from '~/hooks/use-actions'
import { IStoreState } from '../type'

export const usePaginationActions = () => useActions<IStoreState>(Context!)

export const usePagination = () =>
    useStore(useContext(Context)!, (state) => ({
        data: state.data,
        isLoading: state.isLoading,
        errors: state.errors,
    }))
