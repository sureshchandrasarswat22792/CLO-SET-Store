export enum Pricing {
  Paid = '0',
  Free = '1',
  View_Only = '2'
}

export interface ContentItem {
  id: string
  title: string
  creator: string
  price?: number
  pricingOption: Pricing,
  imagePath: string
}
