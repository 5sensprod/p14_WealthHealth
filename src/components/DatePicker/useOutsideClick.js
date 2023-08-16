import { useEffect, useState } from 'react'

function useOutsideClick(ref, buttonRef, callback) {
  const [isNextClickInside, setIsNextClickInside] = useState(false)

  useEffect(() => {
    function handleMouseDown(event) {
      if (
        (ref.current && ref.current.contains(event.target)) ||
        (buttonRef &&
          buttonRef.current &&
          buttonRef.current.contains(event.target))
      ) {
        setIsNextClickInside(true)
      } else {
        setIsNextClickInside(false)
      }
    }

    function handleClickOutside(event) {
      if (
        !isNextClickInside &&
        ref.current &&
        !ref.current.contains(event.target) &&
        (!buttonRef ||
          (buttonRef.current && !buttonRef.current.contains(event.target)))
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, buttonRef, callback, isNextClickInside])

  return setIsNextClickInside // Retournez le setter ici
}

export default useOutsideClick
