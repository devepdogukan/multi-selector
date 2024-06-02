import { Fragment, useEffect, useRef } from 'react'
import Loading from '~/components/loading'
import {
    usePagination,
    usePaginationActions,
} from '~/components/infinite-scroll/store/selectors'
import { InfiniteScrollProps } from '~/components/infinite-scroll/type'
import clsx from 'clsx'
const InfiniteScroll = ({
    fetchDataCallback,
    children,
    fetchDataIsInvalid = false,
}: InfiniteScrollProps) => {
    const { data, isLoading, errors } = usePagination()
    const { fetchData, getNext, resetFields } = usePaginationActions()
    const listRef = useRef<HTMLDivElement | null>(null)

    const results = (data?.flat() as never[]) ?? []

    useEffect(() => {
        if (fetchDataIsInvalid) return resetFields()
        fetchData(fetchDataCallback)
        listRef.current?.scrollTo({ top: 0 })
    }, [fetchDataIsInvalid])

    useEffect(() => {
        if (!listRef.current || results.length === 0 || isLoading) return

        const intersectionCallback = (
            entries: { isIntersecting: boolean; target: Element }[]
        ) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    getNext(fetchDataCallback)
                }
            })
        }

        const observer = new IntersectionObserver(intersectionCallback, {
            root: listRef.current,
            rootMargin: '5px',
        })
        const target = listRef.current.querySelector('#infinite-seperator')

        observer.observe(target as Element)

        return () => observer.disconnect()
    }, [listRef.current, results, isLoading])

    return (
        <div className="border rounded-xl shadow-lg border-slate-300 ring-opacity-5 focus:outline-none">
            <div
                className="relative h-full max-h-80 overflow-y-auto"
                ref={listRef}
            >
                <div>
                    {results &&
                        Array.isArray(results) &&
                        results.map((item, index) => (
                            <Fragment key={index}>{children(item)}</Fragment>
                        ))}
                </div>
                {isLoading && (
                    <div
                        className={clsx(
                            ' sticky bottom-1/2 flex items-center justify-center',
                            {
                                'min-h-80': results.length === 0,
                            }
                        )}
                    >
                        <Loading />
                    </div>
                )}

                {errors.length > 0 && (
                    <div className="flex flex-col justify-center p-2 gap-4">
                        {errors.map((error, i) => (
                            <div
                                key={i}
                                className="p-4 text-sm  rounded-lg bg-red-100 border border-red-400 text-red-700"
                                role="alert"
                            >
                                {error}
                            </div>
                        ))}
                    </div>
                )}
                <div id="infinite-seperator"></div>
            </div>
        </div>
    )
}

export default InfiniteScroll
