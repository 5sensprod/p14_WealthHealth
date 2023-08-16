import { useEffect, useState } from 'react'

function useOutsideClick(ref, buttonRef, callback) {
  const [clickedInside, setClickedInside] = useState(false)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !clickedInside &&
        ref.current &&
        !ref.current.contains(event.target) &&
        (!buttonRef.current || !buttonRef.current.contains(event.target))
      ) {
        callback()
      }
      setClickedInside(false) // Réinitialisez la valeur ici
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, buttonRef, callback, clickedInside])

  return setClickedInside // Retournez le setter ici
}

export default useOutsideClick
