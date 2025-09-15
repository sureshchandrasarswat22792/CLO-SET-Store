import { useEffect } from 'react'

export default function useInfiniteScroll(
  loadMore: () => void,
  enabled = true,
  rootMargin = '200px'
) {
  useEffect(() => {
    if (!enabled) return
    let timmer: any= null
    const onScroll = () => {
      timmer =  setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight + 300 >= scrollHeight) {
          loadMore()
      }
      }, 1000);
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timmer)
    }
  }, [loadMore, enabled, rootMargin])
}
