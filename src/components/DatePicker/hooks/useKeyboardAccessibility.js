import { useRef, useEffect } from 'react'

function useKeyboardAccessibility(onAction) {
  const ref = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault() // Empêche le comportement par défaut pour "Enter"
        onAction()
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'Space') {
        onAction() // "Space" déclenche l'action sur keyUp pour éviter le défilement par défaut
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
