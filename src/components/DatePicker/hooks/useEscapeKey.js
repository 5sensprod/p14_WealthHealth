import { useEffect } from 'react'

function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [callback])
}

export default useEscapeKey
