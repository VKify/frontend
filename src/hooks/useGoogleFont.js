import { useEffect } from 'react'

export function useGoogleFont(fontFamily) {
    useEffect(() => {
        if (!fontFamily) return
        if (!/^[A-Za-z0-9 ]+$/.test(fontFamily)) return
        const id = `gf-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`
        if (document.getElementById(id)) return
        const link = document.createElement('link')
        link.id = id; link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`
        document.head.appendChild(link)
    }, [fontFamily])
}