export type SelectedTypeValues = string | number

export type SelectedType = {
    value: SelectedTypeValues
    label: string
}

export interface ISelectedStore {
    list: SelectedType[]
    addSelected: (selected: SelectedType) => void
    removeSelected: (id: SelectedTypeValues) => void
    resetSelected: () => void
    searchText: string
    setSearchText: (value: string) => void
    removeLastItem: () => void
}
