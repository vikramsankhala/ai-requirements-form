"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Mail, Phone, Linkedin, Send, CheckCircle } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after showing success message
    setTimeout(() => {
      setName("")
      setEmail("")
      setMessage("")
      setIsSubmitted(false)
      onClose()
    }, 3000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                      className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/70">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your Name"
                              required
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                            />
                          </div>
                          <div>
                            <Input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              placeholder="Your Email"
                              required
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Your Message"
                              required
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[120px] resize-none"
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Sending...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                              </div>
                            )}
                          </Button>
                        </form>
                      </div>

                      <div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                          <div className="flex items-center space-x-3 text-white/80">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <span>contact@aienquiry.com</span>
                          </div>
                          <div className="flex items-center space-x-3 text-white/80">
                            <Phone className="w-5 h-5 text-blue-400" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center space-x-3 text-white/80">
                            <Linkedin className="w-5 h-5 text-blue-400" />
                            <a href="#" className="hover:text-blue-400 transition-colors">
                              LinkedIn Profile
                            </a>
                          </div>

                          <div className="pt-4 mt-4 border-t border-white/10">
                            <p className="text-white/60 text-sm">
                              We'll respond to your inquiry within 24 hours. For urgent matters, please call us
                              directly.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
