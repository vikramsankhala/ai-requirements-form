"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 border-t border-white/10 backdrop-blur-md bg-slate-900/80"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
              AI Enquiry
            </h3>
            <p className="text-white/70 mb-6 max-w-md">
              Helping enterprises assess their AI needs and implement tailored solutions that drive business growth and
              operational efficiency.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services", "About", "Assessment", "Testimonials", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Button variant="link" className="text-white/70 hover:text-white p-0 h-auto">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-white/70">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contact@aienquiry.com</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Linkedin className="w-5 h-5 text-blue-400" />
                <a href="#" className="hover:text-blue-400 transition-colors">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">© {currentYear} AI Enquiry. All rights reserved.</p>
          <div className="flex space-x-6">
            <Button variant="link" className="text-white/50 hover:text-white text-sm p-0 h-auto">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-white/50 hover:text-white text-sm p-0 h-auto">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
