(function () {
  'use strict'

  const canvas = document.querySelector('#matrix')
  const context = canvas.getContext('2d')
  const defaults = 'アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}+-*/='
  const state = { schemecolor: '0 1 0', speed: 8, space: 5, fontsize: 18, fontfamily: 'monospace', rainbow: true, characters: '' }
  let width = 1
  let height = 1
  let columns = []
  let lastFrame = 0
  let hueOffset = 0

  function cssColor(value, alpha = 1) {
    const parts = String(value).trim().split(/\s+/).map(Number)
    const channel = (index) => Math.round(Math.max(0, Math.min(1, parts[index] || 0)) * 255)
    return `rgba(${channel(0)}, ${channel(1)}, ${channel(2)}, ${alpha})`
  }

  function resetColumns() {
    const stride = Math.max(8, Number(state.fontsize) + Number(state.space))
    columns = Array.from({ length: Math.ceil(width / stride) }, (_, index) => ({
      x: index * stride + stride / 2,
      y: Math.random() * -height,
      velocity: 0.75 + Math.random() * 1.6,
      length: 8 + Math.floor(Math.random() * 18),
      seed: Math.random() * 360,
    }))
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.fillStyle = '#020308'
    context.fillRect(0, 0, width, height)
    resetColumns()
  }

  function glyph(column, row) {
    const alphabet = defaults + String(state.characters || '')
    const value = Math.sin(column.seed * 12.9898 + row * 78.233 + column.y * 0.013) * 43758.5453
    return alphabet[Math.floor(Math.abs(value % 1) * alphabet.length)] || '0'
  }

  function draw(timestamp) {
    const speed = Math.max(1, Number(state.speed) || 1)
    const interval = Math.max(24, 118 - speed * 4.6)
    if (timestamp - lastFrame >= interval) {
      lastFrame = timestamp
      hueOffset = (hueOffset + speed * 0.35) % 360
      context.fillStyle = 'rgba(2, 3, 8, 0.16)'
      context.fillRect(0, 0, width, height)
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = `${Math.max(10, Number(state.fontsize) || 18)}px ${state.fontfamily || 'monospace'}`

      columns.forEach((column, columnIndex) => {
        for (let row = 0; row < column.length; row += 1) {
          const y = column.y - row * (Number(state.fontsize) + 2)
          if (y < -30 || y > height + 30) continue
          const alpha = Math.pow(1 - row / column.length, 1.35)
          if (row === 0) {
            context.fillStyle = `rgba(235, 255, 255, ${Math.min(1, alpha + 0.3)})`
            context.shadowBlur = 12
          } else if (state.rainbow) {
            context.fillStyle = `hsla(${(column.seed + hueOffset + columnIndex * 8) % 360}, 92%, 62%, ${alpha})`
            context.shadowBlur = 5
          } else {
            context.fillStyle = cssColor(state.schemecolor, alpha)
            context.shadowBlur = 5
          }
          context.shadowColor = context.fillStyle
          context.fillText(glyph(column, row), column.x, y)
        }
        column.y += (Number(state.fontsize) + 2) * column.velocity
        if (column.y - column.length * Number(state.fontsize) > height && Math.random() > 0.72) {
          column.y = -Math.random() * height * 0.7
          column.velocity = 0.75 + Math.random() * 1.6
          column.length = 8 + Math.floor(Math.random() * 18)
          column.seed = Math.random() * 360
        }
      })
      context.shadowBlur = 0
    }
    requestAnimationFrame(draw)
  }

  window.wallpaperPropertyListener = {
    applyUserProperties(properties) {
      let layoutChanged = false
      Object.keys(state).forEach((key) => {
        if (!properties[key] || !Object.prototype.hasOwnProperty.call(properties[key], 'value')) return
        state[key] = properties[key].value
        if (key === 'fontsize' || key === 'space') layoutChanged = true
      })
      if (layoutChanged) resetColumns()
    },
  }

  window.addEventListener('resize', resize)
  resize()
  requestAnimationFrame(draw)
})()
