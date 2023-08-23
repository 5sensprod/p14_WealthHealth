import { useEffect } from 'react'

function useOutsideClick(ref, buttonRef, callback) {
  useEffect(() => {
    const handleMouseUpOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!buttonRef ||
          (buttonRef.current && !buttonRef.current.contains(event.target)))
      ) {
        callback()
      }
    }

    document.addEventListener('mouseup', handleMouseUpOutside)
    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside)
    }
  }, [ref, buttonRef, callback])
}

export default useOutsideClick
