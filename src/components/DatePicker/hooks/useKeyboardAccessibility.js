import { useEffect } from 'react'

function useKeyboardAccessibility(onAction, onEscape) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onAction()
      }
      if (e.key === 'Escape' && onEscape) {
        onEscape()
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'Space') {
        onAction()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [onAction, onEscape])
}

export default useKeyboardAccessibility
