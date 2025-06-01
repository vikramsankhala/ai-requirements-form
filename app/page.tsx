"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Mail, Phone, Linkedin, CheckCircle, Download, Loader2 } from "lucide-react"
import { OrganizationStep } from "./components/organization-step"
import { ChallengesStep } from "./components/challenges-step"
import { RequirementsStep } from "./components/requirements-step"
import { TechnicalStep } from "./components/technical-step"
import { BudgetStep } from "./components/budget-step"
import { AnimatedBackground } from "./components/animated-background"
import { FloatingElements } from "./components/floating-elements"

const steps = [
  { id: "organization", title: "Organization Overview", description: "Tell us about your company" },
  { id: "challenges", title: "Current Challenges", description: "What problems are you facing?" },
  { id: "requirements", title: "AI Requirements", description: "What do you need from AI?" },
  { id: "technical", title: "Technical Environment", description: "Your current tech stack" },
  { id: "budget", title: "Budget & Timeline", description: "Investment and timeline expectations" },
]

export default function AIRequirementsForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (stepData: any) => {
    if (stepData) {
      setFormData((prev) => ({ ...prev, ...stepData }))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const downloadCSV = () => {
    const csvData = []
    const headers = ["Section", "Field", "Value"]
    csvData.push(headers.join(","))

    // Process form data into CSV format
    Object.entries(formData).forEach(([section, data]) => {
      if (typeof data === "object" && data !== null) {
        Object.entries(data).forEach(([field, value]) => {
          if (Array.isArray(value)) {
            csvData.push(`"${section}","${field}","${value.join("; ")}"`)
          } else {
            csvData.push(`"${section}","${field}","${String(value).replace(/"/g, '""')}"`)
          }
        })
      }
    })

    const csvContent = csvData.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `ai-assessment-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    console.log("Form submitted:", formData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OrganizationStep onUpdate={updateFormData} />
      case 1:
        return <ChallengesStep onUpdate={updateFormData} />
      case 2:
        return <RequirementsStep onUpdate={updateFormData} />
      case 3:
        return <TechnicalStep onUpdate={updateFormData} />
      case 4:
        return <BudgetStep onUpdate={updateFormData} />
      default:
        return <OrganizationStep onUpdate={updateFormData} />
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <FloatingElements />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto drop-shadow-lg" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">Assessment Submitted Successfully!</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Thank you for completing the AI requirements assessment. Our team will review your submission and
                    contact you within 24 hours to discuss your AI implementation strategy.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="bg-white/5 rounded-lg p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                  <div className="space-y-3 text-white/80">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <a href="mailto:vikramsankhala@gmail.com" className="hover:text-blue-400 transition-colors">
                        vikramsankhala@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5 text-green-400" />
                      <a href="tel:+919819543261" className="hover:text-green-400 transition-colors">
                        +91 98195 43261
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Linkedin className="w-5 h-5 text-blue-500" />
                      <span>Vikram Singh Sankhala - AI Solutions Architect</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    onClick={downloadCSV}
                    className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Download Assessment Data
                  </Button>

                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setCurrentStep(0)
                      setFormData({})
                    }}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                  >
                    Start New Assessment
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Solutions Assessment</h1>
              <p className="text-white/70">Comprehensive evaluation for enterprise AI implementation</p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white font-bold text-sm">VSS</span>
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">Vikram Singh Sankhala</h3>
                      <p className="text-sm text-white/70">AI Solutions Architect</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-white/60">
                        <motion.div
                          className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Mail className="w-3 h-3" />
                          <span>vikramsankhala@gmail.com</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center space-x-1 hover:text-green-400 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Phone className="w-3 h-3" />
                          <span>+919819543261</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                          <Linkedin className="w-3 h-3 hover:text-blue-500 transition-colors cursor-pointer" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Step {currentStep + 1} of {steps.length}
                </h2>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.5 }}>
                  <Badge variant="secondary" className="bg-white/20 text-white shadow-lg">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                  </Badge>
                </motion.div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="origin-left"
              >
                <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4 h-3 shadow-inner" />
              </motion.div>

              <div className="flex flex-wrap gap-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge
                      variant={index <= currentStep ? "default" : "outline"}
                      className={`transition-all duration-300 shadow-lg ${
                        index <= currentStep
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25"
                          : "bg-white/10 text-white/60 border-white/20 hover:bg-white/15"
                      }`}
                    >
                      {step.title}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h3>
                <p className="text-white/70">{steps[currentStep].description}</p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <motion.div
                className="flex justify-between mt-8 pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="group bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Assessment
                        <CheckCircle className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
