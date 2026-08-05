export const wcConfig = {
  storeUrl: process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://hustlershop.ir',
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || '',
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || '',
  apiBase: `${process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://hustlershop.ir'}/wp-json/wc/v3`,
  shopUrl: `${process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://hustlershop.ir'}/shop`,
  fetchTimeoutMs: Number(process.env.WC_FETCH_TIMEOUT_MS || '45000'),
  fetchRetries: Number(process.env.WC_FETCH_RETRIES || '3'),
} as const

export function hasWcCredentials(): boolean {
  return !!(wcConfig.consumerKey && wcConfig.consumerSecret)
}
