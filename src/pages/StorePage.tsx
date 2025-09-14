import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchContents } from '../features/contents/contentsSlice'
import ContentGrid from '../components/ContentGrid'
import FilterPanel from '../components/FilterPanel'
import SearchBar from '../components/SearchBar'
import SortDropdown from '../components/SortDropdown'
import SkeletonLoader from '../components/SkeletonLoader'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { readFiltersFromUrl, writeFiltersToUrl } from '../utils/persistence'
import PriceSlider from '../components/PriceSlider';

export default function StorePage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.contents.items)
  const status = useAppSelector((s) => s.contents.status)

  const persisted = readFiltersFromUrl();
  const [search, setSearch] = useState(persisted.search ?? '')
  const [pricing, setPricing] = useState<Set<string>>(() => new Set(persisted.pricing))
  const [sort, setSort] = useState<string>(persisted.sort ?? 'name')
  const [priceRange, setPriceRange] = useState<[number, number]>(persisted.priceRange ?? [0, 200])

  const [visibleCount, setVisibleCount] = useState(16)
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchContents())
  }, [dispatch, items.length]);

  useEffect(() => {
    let out = items
    if (search.trim() !== '') {
      const kw = search.toLowerCase()
      out = out.filter((it) => it.creator.toLowerCase().includes(kw) || it.title.toLowerCase().includes(kw))
    }
    if (pricing.size > 0) {
      out = out.filter((it) => pricing.has(it.pricingOption.toString()))
    };
    out = out.filter((it) => {
      const price = it.price ?? 0
      return price >= priceRange[0] && price <= priceRange[1]
    });
    if (sort === 'name') out = [...out].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'higher') out = [...out].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    if (sort === 'lower') out = [...out].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    setFiltered(out);
    writeFiltersToUrl({ search, pricing, sort, priceRange })
  }, [items, search, pricing, sort, priceRange])

  const loadMore = useCallback(() => {
    setVisibleCount((v) => Math.min(filtered.length, v + 12))
  }, [filtered.length])

  useInfiniteScroll(loadMore, true)

  useEffect(() => {
    setVisibleCount(16)
  }, [search, pricing, sort])

  const togglePricing = (p: string) => {
    setPricing(prev => {
      const newPricing = new Set(prev)
      if (newPricing.has(p)) newPricing.delete(p)
      else newPricing.add(p);
      writeFiltersToUrl({ search, pricing: newPricing, sort, priceRange })
      return newPricing
    })
  }

  const resetFilters = () => {
    setPricing(new Set())   // empty set
    setSearch('')
    setSort('name')
    writeFiltersToUrl({ search: '', pricing: new Set<string>(), sort: 'name', priceRange: [0, 1000] })
    setFiltered(items)
    setPriceRange([0, 200]);
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <header>
        <SearchBar value={search} onChange={setSearch} />
      </header>
      <div className="w-full flex justify-between flex-wrap lg:flex-nowrap md:flex-nowrap bg-[#121015] items-center px-4 py-1">
        <div className='flex gap-10 flex-wrap lg:flex-nowrap md:flex-nowrap w-full'>
          <FilterPanel pricing={pricing} toggle={togglePricing} />
          <PriceSlider items={items} value={priceRange} onChange={setPriceRange} />
        </div>
        <div>
          <button className="px-0 py-1 lg:px-3 md:px-3 mt-4 lg:mt-0 md:mt-0   text-slate-300 text-[14px] uppercase" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 px-4 w-full !mb-8">
        <label className='text-white text-[12px]'>Sort by</label>
        <SortDropdown value={sort} onChange={setSort} />
      </div>
      <main>
        {status === 'loading' && <SkeletonLoader />}
        {status === 'succeeded' && (
          <div className="space-y-6">
          {status === 'succeeded' &&  <ContentGrid items={filtered.slice(0, visibleCount)} />}
            {visibleCount < filtered.length && (
              <div className="text-center py-6">Loading more...</div>
            )}
            {filtered.length === 0 && <div className="text-center py-6">No items match your filters.</div>}
          </div>
        )}
        {status === 'failed' && <div className="text-red-500">Failed to load data</div>}
      </main>
    </div>
  )
}
