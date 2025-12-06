import { useState, useEffect, memo, useCallback } from 'react'

const ScrollToTop = memo(() => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    let lastScrollTime = 0
    const throttleDelay = 100

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < throttleDelay) return
      lastScrollTime = now

      if (window.scrollY > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!showButton) {
    return null
  }

  return (
    <div className="scroll-to-top-container w-full flex justify-center pb-6">
      <button
        onClick={handleClick}
        className="scroll-to-top-button bg-gradient-to-b from-[#3c96d6] to-[#1c5a8b] text-white border border-[#1c5a8b] rounded text-[0.9rem] font-cascadia cursor-pointer transition-all duration-300 hover:opacity-90 active:opacity-80 flex items-center justify-center w-10 h-10"
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.3)",
        }}
      >
        <span className="text-2xl">↑</span>
      </button>
    </div>
  )
})

ScrollToTop.displayName = 'ScrollToTop'

export default ScrollToTop

