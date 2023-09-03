import { useEffect } from 'react'

function useOutsideInteractions(ref, buttonRef, callback) {
  useEffect(() => {
    let timeoutId
    let isClicking = false

    const handleMouseUpOutside = (event) => {
      if (
        ref.current &&
        event.target !== ref.current &&
        !ref.current.contains(event.target) &&
        (!buttonRef ||
          (buttonRef.current && !buttonRef.current.contains(event.target)))
      ) {
        callback()
      }
    }

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

    document.addEventListener('mouseup', handleMouseUpOutside)
    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('focusout', handleFocusOut)
      currentRef.addEventListener('focusin', handleFocusIn)
      currentRef.addEventListener('mousedown', handleClick)
      currentRef.addEventListener('mouseup', handleClick)
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside)
      if (currentRef) {
        currentRef.removeEventListener('focusout', handleFocusOut)
        currentRef.removeEventListener('focusin', handleFocusIn)
        currentRef.removeEventListener('mousedown', handleClick)
        currentRef.removeEventListener('mouseup', handleClick)
      }
    }
  }, [ref, buttonRef, callback])
}

export default useOutsideInteractions
