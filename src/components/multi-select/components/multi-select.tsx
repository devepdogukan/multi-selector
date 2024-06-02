import { AxiosRequestConfig } from 'axios'
import InfiniteScrollWrapper from '~/components/infinite-scroll'
import { characterService } from '~/service'
import { Character } from '~/service/character'
import {
    useMultiSelectedList,
    useSearchText,
} from '~/components/multi-select/store/selectors'
import { useCallback, useEffect, useState } from 'react'
import ScrollItem from './scroll-item'
import { debounce } from 'lodash'
import Header from './header'

const DEBOUNCE_MS = 1000

const MultiSelect = () => {
    const selectedList = useMultiSelectedList()
    const searchText = useSearchText()
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText)
    useEffect(() => {
        const handler = debounce((nextValue) => {
            setDebouncedSearchText(nextValue)
        }, DEBOUNCE_MS)

        handler(searchText)

        return () => {
            handler.cancel()
        }
    }, [searchText])

    const fetchData = useCallback(
        async (options?: AxiosRequestConfig) => {
            if (searchText.trim() !== debouncedSearchText.trim())
                throw new Error('Invalid search text')

            if (debouncedSearchText.trim().length === 0)
                return await characterService.getAll(options)

            return await characterService.getFiltered(
                { name: debouncedSearchText },
                options
            )
        },
        [searchText, debouncedSearchText]
    )

    return (
        <div className="w-[400px] flex flex-col gap-3">
            <Header />
            <InfiniteScrollWrapper
                fetchDataIsInvalid={searchText !== debouncedSearchText}
                fetchDataCallback={fetchData}
            >
                {(item: Character) => (
                    <ScrollItem
                        isSelected={
                            !!selectedList.find(
                                ({ value }) => value === item.id
                            )?.label
                        }
                        {...item}
                    />
                )}
            </InfiniteScrollWrapper>
        </div>
    )
}

export default MultiSelect
