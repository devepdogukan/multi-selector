import { default as Scroller } from '~/components/infinite-scroll/infinite-scroll'
import ContextWrapper from '~/components/infinite-scroll/store/context'
import { InfiniteScrollProps } from '~/components/infinite-scroll/type'

const InfiniteScroll = ({ ...props }: InfiniteScrollProps) => {
    return (
        <ContextWrapper>
            <Scroller {...props} />
        </ContextWrapper>
    )
}

export default InfiniteScroll
