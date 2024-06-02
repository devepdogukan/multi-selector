import ContextWrapper from './store/context'
import MultiSelect from './components/multi-select'

const MultiSelectWrapper = () => {
    return (
        <ContextWrapper>
            <MultiSelect />
        </ContextWrapper>
    )
}

export default MultiSelectWrapper
