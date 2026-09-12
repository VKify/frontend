import { useCallback, useEffect, useState } from 'react'
import { fetchLatestFirefoxRelease } from '../services/githubReleases'

export function useLatestFirefoxRelease() {
  const [state, setState] = useState({ status: 'loading', release: null })

  const load = useCallback(async (force = false) => {
    setState({ status: 'loading', release: null })

    try {
      const release = await fetchLatestFirefoxRelease({ force })
      setState({ status: release.downloadUrl ? 'ready' : 'missing', release })
    } catch (error) {
      setState({ status: 'error', release: null, error })
    }
  }, [])

  useEffect(() => {
    // Keep prerendered HTML in the same loading state as the first client render.
    // The browser resolves the current release immediately after hydration.
    if (window.__PRERENDER_INJECTED?.isPrerender) return
    load()
  }, [load])

  return { ...state, retry: () => load(true) }
}
