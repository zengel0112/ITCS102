import { useState, useEffect, memo, useCallback } from 'react'

interface PaginationProps {
  type: 'next' | 'prev'
  onNavigate: () => void
  currentPage: number
  showNext?: boolean
  onNext?: () => void
}

const Pagination = memo(({ type, onNavigate, currentPage, showNext, onNext }: PaginationProps) => {
  const isNext = type === 'next'
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    if (type === 'prev' && currentPage === 1) {
      let lastScrollTime = 0
      const throttleDelay = 100

      const handleScroll = () => {
        const now = Date.now()
        if (now - lastScrollTime < throttleDelay) return
        lastScrollTime = now

        if (window.scrollY > 300) {
          setShowScrollButton(true)
        } else {
          setShowScrollButton(false)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [type, currentPage])

  const handleClick = useCallback(() => {
    if (type === 'prev' && currentPage === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onNavigate()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [type, currentPage, onNavigate])

  if (type === 'prev' && currentPage === 1) {
    return null
  }

  const arrowIcon = isNext ? '→' : '←'
  const buttonText = isNext ? 'Дараагийн хуудас →' : '← Өмнөх хуудас'

  return (
    <>
      <button
        onClick={handleClick}
        className={`pagination-button fixed bottom-6 z-[10000] bg-gradient-to-b from-[#3c96d6] to-[#1c5a8b] text-white border border-[#1c5a8b] rounded text-[0.9rem] font-cascadia cursor-pointer transition-all duration-300 hover:opacity-90 active:opacity-80 flex items-center justify-center md:px-3 md:py-2 md:whitespace-nowrap w-10 h-10 md:w-auto md:h-auto ${
          isNext ? 'right-6' : 'left-6'
        }`}
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.3)",
        }}
      >
        <span className="text-2xl md:hidden">{arrowIcon}</span>
        <span className="hidden md:inline">{buttonText}</span>
      </button>
      {showNext && onNext && (
        <button
          onClick={() => {
            onNext()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="pagination-button fixed bottom-6 right-6 z-[10000] bg-gradient-to-b from-[#3c96d6] to-[#1c5a8b] text-white border border-[#1c5a8b] rounded text-[0.9rem] font-cascadia cursor-pointer transition-all duration-300 hover:opacity-90 active:opacity-80 flex items-center justify-center md:px-3 md:py-2 md:whitespace-nowrap w-10 h-10 md:w-auto md:h-auto"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.3)",
          }}
        >
          <span className="text-2xl md:hidden">→</span>
          <span className="hidden md:inline">Дараагийн хуудас →</span>
        </button>
      )}
    </>
  )
})

Pagination.displayName = 'Pagination'

export default Pagination


