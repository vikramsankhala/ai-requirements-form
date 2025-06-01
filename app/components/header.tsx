"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"

interface HeaderProps {
  onServicesClick?: () => void
  onAboutClick?: () => void
  onAssessmentClick?: () => void
  onTestimonialsClick?: () => void
}

export function Header({ onServicesClick, onAboutClick, onAssessmentClick, onTestimonialsClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/10 py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            AI Enquiry
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { label: "Services", onClick: onServicesClick },
            { label: "About", onClick: onAboutClick },
            { label: "Assessment", onClick: onAssessmentClick },
            { label: "Testimonials", onClick: onTestimonialsClick },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={item.onClick}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 px-4 py-2 rounded-lg"
              >
                {item.label}
              </Button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              onClick={onAssessmentClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0 ml-2"
            >
              Start Assessment
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-2">
            {[
              { label: "Services", onClick: onServicesClick },
              { label: "About", onClick: onAboutClick },
              { label: "Assessment", onClick: onAssessmentClick },
              { label: "Testimonials", onClick: onTestimonialsClick },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => {
                  item.onClick?.()
                  setIsMobileMenuOpen(false)
                }}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 justify-start"
              >
                {item.label}
              </Button>
            ))}
            <Button
              onClick={() => {
                onAssessmentClick?.()
                setIsMobileMenuOpen(false)
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0 mt-2"
            >
              Start Assessment
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
