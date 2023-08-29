import { useEffect } from 'react'

function useFocusAndClickOutside(ref, callback) {
  useEffect(() => {
    let timeoutId
    let isClicking = false

    const handleFocusOut = () => {
      timeoutId = setTimeout(() => {
        if (
          !isClicking &&
          ref.current &&
          !ref.current.contains(document.activeElement)
        ) {
          callback()
        }
      }, 0)
    }

    const handleFocusIn = () => {
      clearTimeout(timeoutId)
    }

    const handleClick = (event) => {
      if (event.type === 'mousedown') {
        isClicking = true
      } else if (event.type === 'mouseup') {
        isClicking = false
      }
    }

    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('focusout', handleFocusOut)
      currentRef.addEventListener('focusin', handleFocusIn)
      currentRef.addEventListener('mousedown', handleClick)
      currentRef.addEventListener('mouseup', handleClick)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('focusout', handleFocusOut)
        currentRef.removeEventListener('focusin', handleFocusIn)
        currentRef.removeEventListener('mousedown', handleClick)
        currentRef.removeEventListener('mouseup', handleClick)
      }
    }
  }, [ref, callback])
}

export default useFocusAndClickOutside
