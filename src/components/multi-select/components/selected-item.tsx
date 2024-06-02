import CloseIcon from '~/assets/icons/close.svg?react'
import { SelectedType } from '~/components/multi-select/type'
import { useMultiSelectActions } from '~/components/multi-select/store/selectors'

const SelectedItem = ({ value, label }: SelectedType) => {
    const { removeSelected } = useMultiSelectActions()
    return (
        <div className="rounded-lg flex items-center text-sm gap-2 bg-slate-300 text-slate-700 p-1.5">
            {label}
            <button
                onClick={() => removeSelected(value)}
                className="block w-5 h-5 text-white bg-slate-400 rounded p-1 hover:text-slate-400 transition-colors cursor-pointer hover:bg-white"
            >
                <CloseIcon />
            </button>
        </div>
    )
}

export default SelectedItem
