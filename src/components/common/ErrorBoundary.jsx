import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[VKify] Runtime error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
          <p className="text-5xl mb-4">⚠️</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Что-то пошло не так
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#0077ff] hover:bg-blue-500 text-white font-semibold rounded-2xl transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      )
    }
    return this.props.children
  }
}