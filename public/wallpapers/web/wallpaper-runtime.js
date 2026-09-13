(function () {
    'use strict'

    const MESSAGE_TYPE = 'VKIFY_WE_APPLY_USER_PROPERTIES'
    const KEY = /^[A-Za-z0-9_]{1,128}$/
    const RESERVED_KEYS = new Set(['__proto__', 'prototype', 'constructor'])

    // The fetch runs inside the wallpaper origin, so discovery also works for
    // localhost and third-party hosts without extension host permissions/CORS.
    // The catalog preview intentionally has an opaque sandbox origin; skip the
    // fetch there to avoid a browser CORS error in the preview console.
    if (window.origin !== 'null') {
        fetch(new URL('project.json', document.baseURI))
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                return response.json()
            })
            .then(project => {
                const properties = project && project.general && project.general.properties
                if (properties && typeof properties === 'object') {
                    window.parent.postMessage({ type: 'VKIFY_WE_PROPERTY_SCHEMA', properties }, '*')
                }
            })
            .catch(() => {})
    }

    window.addEventListener('message', function (event) {
        if (event.source !== window.parent) return
        const data = event.data
        if (!data || data.type !== MESSAGE_TYPE || !data.properties || typeof data.properties !== 'object') return

        const properties = Object.create(null)
        for (const [key, item] of Object.entries(data.properties).slice(0, 200)) {
            if (!KEY.test(key) || RESERVED_KEYS.has(key) || !item || typeof item !== 'object') continue
            const value = item.value
            if (!['string', 'number', 'boolean'].includes(typeof value)) continue
            if (typeof value === 'number' && !Number.isFinite(value)) continue
            if (typeof value === 'string' && value.length > 4096) continue
            properties[key] = { value }
            if (typeof item.text === 'string' && item.text.length <= 256) properties[key].text = item.text
        }

        const listener = window.wallpaperPropertyListener
        if (listener && typeof listener.applyUserProperties === 'function' && Object.keys(properties).length > 0) {
            try {
                listener.applyUserProperties(properties)
            } catch (error) {
                console.warn('[VKify] Wallpaper property update failed', error)
            }
        }
    })
})()
