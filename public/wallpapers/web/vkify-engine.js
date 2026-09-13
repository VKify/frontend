(function () {
    'use strict'

    const config = window.VKIFY_WALLPAPER_CONFIG || {}
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const state = {
        primarycolor: config.primary || '0.1 0.55 1',
        secondarycolor: config.secondary || '0.8 0.15 1',
        backgroundcolor: config.background || '0.01 0.02 0.07',
        speed: 5,
        density: 55,
        intensity: 60,
        glow: true,
        variation: 'smooth',
        caption: '',
    }
    let width = 1
    let height = 1
    let particles = []

    const color = (value, alpha = 1) => {
        const rgb = String(value).trim().split(/\s+/).map(Number)
        return `rgba(${Math.round((rgb[0] || 0) * 255)},${Math.round((rgb[1] || 0) * 255)},${Math.round((rgb[2] || 0) * 255)},${alpha})`
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        particles = []
    }

    function ensureParticles(multiplier = 1) {
        const target = Math.max(12, Math.round(state.density * multiplier))
        while (particles.length < target) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random(),
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                phase: Math.random() * Math.PI * 2,
                size: 0.5 + Math.random() * 2.5,
            })
        }
        if (particles.length > target) particles.length = target
    }

    function clear(alpha = 1) {
        ctx.fillStyle = color(state.backgroundcolor, alpha)
        ctx.fillRect(0, 0, width, height)
        ctx.shadowBlur = 0
    }

    function waves(time) {
        clear()
        const lines = Math.max(5, Math.round(state.density / 7))
        ctx.lineWidth = state.variation === 'sharp' ? 2.2 : 1.25
        for (let line = 0; line < lines; line++) {
            const mix = line / Math.max(1, lines - 1)
            ctx.strokeStyle = line % 2 ? color(state.secondarycolor, 0.28 + mix * 0.45) : color(state.primarycolor, 0.28 + mix * 0.45)
            ctx.shadowColor = ctx.strokeStyle
            ctx.shadowBlur = state.glow ? 16 : 0
            ctx.beginPath()
            for (let x = -10; x <= width + 10; x += 8) {
                const y = height * (0.18 + mix * 0.65) + Math.sin(x * 0.012 + time * 1.8 + line * 0.7) * (18 + state.intensity * 0.45)
                if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
            }
            ctx.stroke()
        }
    }

    function starfield(time) {
        clear(0.3)
        ensureParticles(2.4)
        const cx = width / 2
        const cy = height / 2
        particles.forEach((p, index) => {
            p.z += 0.0012 * state.speed
            if (p.z > 1) { p.z = 0.02; p.x = Math.random() * width; p.y = Math.random() * height }
            const scale = 0.35 + p.z * 1.8
            const x = cx + (p.x - cx) * scale
            const y = cy + (p.y - cy) * scale
            ctx.fillStyle = index % 3 ? color(state.primarycolor, p.z) : color(state.secondarycolor, p.z)
            ctx.shadowColor = ctx.fillStyle
            ctx.shadowBlur = state.glow ? 10 : 0
            ctx.beginPath(); ctx.arc(x, y, 0.7 + p.z * 2.2, 0, Math.PI * 2); ctx.fill()
        })
    }

    function aurora(time) {
        clear()
        const ribbons = Math.max(4, Math.round(state.density / 14))
        ctx.globalCompositeOperation = 'screen'
        for (let ribbon = 0; ribbon < ribbons; ribbon++) {
            const gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, color(state.primarycolor, 0.02))
            gradient.addColorStop(0.5, color(ribbon % 2 ? state.secondarycolor : state.primarycolor, 0.12 + state.intensity / 500))
            gradient.addColorStop(1, color(state.secondarycolor, 0.01))
            ctx.fillStyle = gradient
            ctx.beginPath(); ctx.moveTo(0, height)
            for (let x = 0; x <= width; x += 12) {
                const y = height * (0.25 + ribbon * 0.09) + Math.sin(x * 0.006 + time * (0.3 + state.speed * 0.035) + ribbon) * (55 + state.intensity)
                ctx.lineTo(x, y)
            }
            ctx.lineTo(width, height); ctx.closePath(); ctx.fill()
        }
        ctx.globalCompositeOperation = 'source-over'
    }

    function constellation(time) {
        clear()
        ensureParticles(1.35)
        particles.forEach((p) => {
            p.x = (p.x + p.vx * state.speed * 0.08 + width) % width
            p.y = (p.y + p.vy * state.speed * 0.08 + height) % height
        })
        const maxDistance = 70 + state.intensity * 0.8
        ctx.lineWidth = 0.7
        for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.hypot(dx, dy)
            if (distance < maxDistance) {
                ctx.strokeStyle = color(state.primarycolor, (1 - distance / maxDistance) * 0.35)
                ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke()
            }
        }
        particles.forEach((p, i) => {
            ctx.fillStyle = i % 4 ? color(state.primarycolor, 0.9) : color(state.secondarycolor, 0.9)
            ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = state.glow ? 9 : 0
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        })
    }

    function grid(time) {
        clear()
        const horizon = height * 0.38
        ctx.strokeStyle = color(state.primarycolor, 0.55)
        ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = state.glow ? 12 : 0
        ctx.lineWidth = 1
        const columns = Math.max(8, Math.round(state.density / 3))
        for (let i = -columns; i <= columns; i++) {
            ctx.beginPath(); ctx.moveTo(width / 2, horizon); ctx.lineTo(width / 2 + i * width / columns, height); ctx.stroke()
        }
        const offset = (time * state.speed * 0.22) % 1
        for (let row = 0; row < 24; row++) {
            const z = (row + offset) / 24
            const y = horizon + Math.pow(z, 2.15) * (height - horizon)
            ctx.globalAlpha = 0.15 + z * 0.8
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
        }
        ctx.globalAlpha = 1
        const glow = ctx.createLinearGradient(0, 0, 0, horizon)
        glow.addColorStop(0, color(state.secondarycolor, 0)); glow.addColorStop(1, color(state.secondarycolor, 0.24))
        ctx.fillStyle = glow; ctx.fillRect(0, 0, width, horizon)
    }

    function orbs(time) {
        clear()
        ensureParticles(0.32)
        ctx.globalCompositeOperation = 'screen'
        particles.forEach((p, i) => {
            const radius = 35 + p.size * (20 + state.intensity * 0.5)
            const x = (p.x + Math.sin(time * state.speed * 0.12 + p.phase) * width * 0.12 + width) % width
            const y = (p.y + Math.cos(time * state.speed * 0.09 + p.phase) * height * 0.15 + height) % height
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
            gradient.addColorStop(0, color(i % 2 ? state.secondarycolor : state.primarycolor, 0.42))
            gradient.addColorStop(1, color(i % 2 ? state.secondarycolor : state.primarycolor, 0))
            ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill()
        })
        ctx.globalCompositeOperation = 'source-over'
    }

    function fireflies(time) {
        clear(0.18)
        ensureParticles(1.5)
        particles.forEach((p, i) => {
            p.x = (p.x + Math.sin(time + p.phase) * state.speed * 0.05 + width) % width
            p.y = (p.y - (0.08 + p.size * 0.025) * state.speed + height) % height
            const alpha = 0.25 + (Math.sin(time * 2 + p.phase) + 1) * 0.35
            ctx.fillStyle = color(i % 5 ? state.primarycolor : state.secondarycolor, alpha)
            ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = state.glow ? 8 + state.intensity * 0.14 : 0
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        })
    }

    function rings(time) {
        clear(0.22)
        const count = Math.max(8, Math.round(state.density / 3))
        const maxRadius = Math.hypot(width, height) * 0.55
        ctx.lineWidth = state.variation === 'bold' ? 4 : 1.5
        for (let i = 0; i < count; i++) {
            const phase = (i / count + time * state.speed * 0.025) % 1
            ctx.strokeStyle = color(i % 2 ? state.secondarycolor : state.primarycolor, (1 - phase) * 0.75)
            ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = state.glow ? 12 : 0
            ctx.beginPath(); ctx.arc(width / 2, height / 2, 8 + phase * maxRadius, 0, Math.PI * 2); ctx.stroke()
        }
    }

    const renderers = { waves, starfield, aurora, constellation, grid, orbs, fireflies, rings }
    let previous = 0
    function frame(timestamp) {
        const time = timestamp / 1000
        if (timestamp - previous > 1000 / 60) {
            previous = timestamp
            ;(renderers[config.mode] || waves)(time)
        }
        requestAnimationFrame(frame)
    }

    window.wallpaperPropertyListener = {
        applyUserProperties(properties) {
            Object.keys(state).forEach((key) => {
                if (properties[key] && Object.prototype.hasOwnProperty.call(properties[key], 'value')) state[key] = properties[key].value
            })
        },
    }

    window.addEventListener('resize', resize)
    resize()
    requestAnimationFrame(frame)
})()
