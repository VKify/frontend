const LATEST_RELEASE_URL = 'https://api.github.com/repos/VKify/vkify-extension/releases/latest'
const CACHE_KEY = 'vkify-latest-firefox-release'
const CACHE_TTL = 60 * 60 * 1000

let pendingRequest = null

function readCache() {
  if (typeof localStorage === 'undefined') return null

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (!cached || Date.now() - cached.savedAt > CACHE_TTL) return null
    return cached.release
  } catch {
    return null
  }
}

function writeCache(release) {
  if (typeof localStorage === 'undefined') return

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), release }))
  } catch {
    // The download still works when storage is disabled or full.
  }
}

export async function fetchLatestFirefoxRelease({ force = false, fetcher = fetch } = {}) {
  if (!force) {
    const cached = readCache()
    if (cached) return cached
    if (pendingRequest) return pendingRequest
  }

  const request = (async () => {
    const response = await fetcher(LATEST_RELEASE_URL, {
      headers: { Accept: 'application/vnd.github+json' },
    })

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`)
    }

    const release = await response.json()
    const asset = release.assets?.find(({ name }) => name?.toLowerCase().endsWith('.xpi'))
    const result = {
      version: release.tag_name || release.name || '',
      downloadUrl: asset?.browser_download_url || null,
      fileName: asset?.name || null,
    }

    writeCache(result)
    return result
  })()

  if (!force) pendingRequest = request

  try {
    return await request
  } finally {
    if (pendingRequest === request) pendingRequest = null
  }
}

export { LATEST_RELEASE_URL }
