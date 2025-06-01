"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface ContactButtonProps {
  onClick: () => void
}

export function ContactButton({ onClick }: ContactButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        onClick={onClick}
        className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0 rounded-full p-4"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </Button>
    </motion.div>
  )
}
