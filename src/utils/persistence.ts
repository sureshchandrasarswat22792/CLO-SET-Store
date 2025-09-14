import queryString from 'query-string'

export const readFiltersFromUrl = () => {
  const q = queryString.parse(window.location.search)
  const search = typeof q.search === 'string' ? q.search : ''
  const pricing = new Set<string>()
  if (q.paid === 'true') pricing.add('0')
  if (q.free === 'true') pricing.add('1')
  if (q.view === 'true') pricing.add('2')
  const sort = typeof q.sort === 'string' ? (q.sort as any) : 'name'
  let priceRange: [number, number] | null = null
  if (typeof q.priceRange === 'string') {
    const parts = q.priceRange.split(',').map(Number)
    if (parts.length === 2) {
      priceRange = [parts[0], parts[1]]
    }
  }

  return { search, pricing, sort, priceRange }
}

export const writeFiltersToUrl = (opts: { search?: string; pricing: Set<string>; sort?: string, priceRange:[number, number] }) => {
  const obj: any = {}
  if (opts.search) obj.search = opts.search
  if (opts.priceRange) obj.priceRange = opts.priceRange.join(',')
  obj.paid = opts.pricing.has('0')
  obj.free = opts.pricing.has('1')
  obj.view = opts.pricing.has('2')
  if (opts.sort) obj.sort = opts.sort
  const str = queryString.stringify(obj)
  const newUrl = window.location.pathname + (str ? `?${str}` : '')
  window.history.replaceState(null, '', newUrl)
}
