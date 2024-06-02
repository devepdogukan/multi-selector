import { useRef } from 'react'
import {
    useMultiSelectActions,
    useMultiSelectedList,
    useSearchText,
} from '~/components/multi-select/store/selectors'
import SelectedItem from '~/components/multi-select/components/selected-item'

const Header = () => {
    const selectedWrapperRef = useRef<HTMLDivElement | null>(null)
    const selectedList = useMultiSelectedList()
    const { setSearchText, removeLastItem } = useMultiSelectActions()
    const searchText = useSearchText()

    return (
        <div
            ref={selectedWrapperRef}
            onClick={() =>
                selectedWrapperRef.current?.querySelector('input')?.focus()
            }
            className="w-full rounded-xl overflow-hidden border border-slate-300 p-1.5 gap-0.5 flex items-center"
        >
            <div className="w-full flex gap-1 flex-wrap items-center">
                {selectedList.map((selected) => (
                    <SelectedItem
                        key={selected.value}
                        value={selected.value}
                        label={selected.label}
                    />
                ))}
                <input
                    value={searchText}
                    onKeyDown={(e) => {
                        if (
                            (searchText === '' ||
                                (e.target as HTMLInputElement).value === '') &&
                            e.key === 'Backspace' &&
                            selectedList.length > 0
                        ) {
                            removeLastItem()
                        }
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    id="multi-selector-input"
                    placeholder={
                        selectedList.length === 0 ? 'Give me a name' : ''
                    }
                    className="visible placeholder:font-normal outline-none max-w-40 font-medium flex-auto text-[rgb(51,51,51)] box-border m-0.5 py-0.5"
                    required
                />
            </div>
        </div>
    )
}

export default Header
