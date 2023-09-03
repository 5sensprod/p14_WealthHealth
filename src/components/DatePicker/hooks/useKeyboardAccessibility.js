import { useRef, useEffect } from 'react'

function useKeyboardAccessibility(onAction) {
  const ref = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onAction()
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'Space') {
        onAction()
      }
    }

    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('keydown', handleKeyDown)
      currentRef.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('keydown', handleKeyDown)
        currentRef.removeEventListener('keyup', handleKeyUp)
      }
    }
  }, [onAction])

  return ref
}

export default useKeyboardAccessibility
