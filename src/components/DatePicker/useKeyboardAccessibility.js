import { useRef, useEffect } from 'react'

function useKeyboardAccessibility(onAction) {
  const ref = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'Space') {
        e.preventDefault()
        onAction()
      }
    }

    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [onAction])

  return ref
}

export default useKeyboardAccessibility
