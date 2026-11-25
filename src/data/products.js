export const products = [
  { id: 'browser', status: 'ready', icon: 'Globe' },
  { id: 'android', status: 'development', icon: 'Smartphone' },
  { id: 'lampa', status: 'ready', icon: 'Puzzle' },
  { id: 'android-tv', status: 'planned', icon: 'Tv' },
  { id: 'desktop', status: 'longTerm', icon: 'Monitor' },
].map(product => ({
  ...product,
  name: product.id,
  href: '/' + product.id,
  labelKey: 'ecosystem.platforms.' + product.id + '.name',
  image: '/og/products/' + product.id + '.png',
}))

export const roadmapProducts = products.filter(product => product.id !== 'browser')
