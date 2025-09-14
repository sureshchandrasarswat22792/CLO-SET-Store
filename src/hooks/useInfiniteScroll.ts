import { useEffect } from 'react'

export default function useInfiniteScroll(
  loadMore: () => void,
  enabled = true,
  rootMargin = '200px'
) {
  useEffect(() => {
    if (!enabled) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight + 300 >= scrollHeight) {
        loadMore()
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [loadMore, enabled, rootMargin])
}
