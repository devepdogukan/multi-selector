import { createStore } from 'zustand'
import { ISelectedStore } from '~/components/multi-select/type'

export const multiSelectStore = () =>
    createStore<ISelectedStore>((set, get) => ({
        list: [],
        searchText: '',
        removeSelected: (id) => {
            const selectedItemIndex = get().list.findIndex(
                ({ value }) => value === id
            )

            if (selectedItemIndex > -1) {
                get().list.splice(selectedItemIndex, 1)
                set({ list: [...get().list] })
            }
        },

        resetSelected: () => set({ list: [] }),
        setSearchText: (searchText) => set({ searchText }),
        addSelected: (selected) => {
            set({ list: [...get().list, selected] })
        },
        removeLastItem: () => {
            const newList = [...get().list]
            newList.pop()

            set({ list: newList })
        },
    }))

export type multiSelectStoreType = ReturnType<typeof multiSelectStore> | null
