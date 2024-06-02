import { useId } from 'react'
import { Character } from '~/service/character'
import {
    useMultiSelectActions,
    useSearchText,
} from '~/components/multi-select/store/selectors'

function highlightSearchTerm(fullString: string, searchTerm: string) {
    const index = fullString.toLowerCase().indexOf(searchTerm.toLowerCase())
    if (index === -1) {
        return [fullString]
    }

    const before = fullString.slice(0, index)
    const match = fullString.slice(index, index + searchTerm.length)
    const after = fullString.slice(index + searchTerm.length)

    return [before, match, after]
}

const ScrollItem = ({
    name,
    image,
    episode,
    id,
    isSelected,
}: Character & { isSelected: boolean }) => {
    const labelId = useId()
    const { removeSelected, addSelected } = useMultiSelectActions()
    const searchText = useSearchText()
    const [before, match, after] = highlightSearchTerm(name, searchText)

    return (
        <label
            htmlFor={`scroll-item$-${labelId}`}
            className="flex items-center gap-4 border-b border-slate-300 p-3"
        >
            <input
                id={`scroll-item$-${labelId}`}
                type="checkbox"
                checked={!!isSelected}
                onChange={(e) => {
                    const multiSelectorInput = document.querySelector(
                        '#multi-selector-input'
                    )
                    if (multiSelectorInput)
                        (multiSelectorInput as HTMLInputElement)?.focus()

                    if (e.target.checked)
                        return addSelected({ label: name, value: id })
                    removeSelected(id)
                }}
                value=""
                className="w-4 h-4 accent-slate-400 rounded-lg outline-offset-3 outline-0.5 outline-slate-800 target:outline"
            />
            <img src={image} alt={name} className="w-10 h-10 rounded-md" />
            <div className="flex flex-col text-color- justify-center text-slate-500">
                <p className="text-md">
                    {before}
                    {match && <span className="font-bold">{match}</span>}
                    {after && after}
                </p>

                <p className="text-sm font-semibold">
                    {episode.length} Episodes
                </p>
            </div>
        </label>
    )
}

export default ScrollItem
