"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Download,
  Loader2,
  AlertCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import { OrganizationStep } from "./components/organization-step"
import { ChallengesStep } from "./components/challenges-step"
import { RequirementsStep } from "./components/requirements-step"
import { TechnicalStep } from "./components/technical-step"
import { BudgetStep } from "./components/budget-step"
import { AnimatedBackground } from "./components/animated-background"
import { PremiumFloatingElements } from "./components/premium-floating-elements"
import { Header } from "./components/header"
import { ContactButton } from "./components/contact-button"
import { ContactModal } from "./components/contact-modal"
import { Footer } from "./components/footer"
import { AIEvaluationChatbot } from "./components/ai-evaluation-chatbot"

const steps = [
  {
    id: "organization",
    title: "Organization Overview",
    description: "Tell us about your company",
    required: ["companyName", "industry", "companySize", "role"],
  },
  {
    id: "challenges",
    title: "Current Challenges",
    description: "What problems are you facing?",
    required: ["selectedChallenges"],
  },
  {
    id: "requirements",
    title: "AI Requirements",
    description: "What do you need from AI?",
    required: ["capabilities", "integrations"],
  },
  {
    id: "technical",
    title: "Technical Environment",
    description: "Your current tech stack",
    required: ["cloudProviders", "databases"],
  },
  {
    id: "budget",
    title: "Budget & Timeline",
    description: "Investment and timeline expectations",
    required: ["budgetRange", "timeline"],
  },
]

export default function VikramSankhalaWebsite() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const assessmentRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const updateFormData = (stepData: any) => {
    if (stepData) {
      setFormData((prev) => ({ ...prev, ...stepData }))
      // Clear validation errors for updated fields
      const stepKey = Object.keys(stepData)[0]
      if (validationErrors[stepKey]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[stepKey]
          return newErrors
        })
      }
    }
  }

  const validateCurrentStep = () => {
    const currentStepData = steps[currentStep]
    const errors: string[] = []

    currentStepData.required.forEach((field) => {
      const stepKey = Object.keys(formData).find(
        (key) => formData[key] && typeof formData[key] === "object" && formData[key][field],
      )

      if (!stepKey) {
        errors.push(`${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`)
      } else {
        const value = formData[stepKey][field]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          errors.push(`${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`)
        }
      }
    })

    if (errors.length > 0) {
      setValidationErrors({ [currentStepData.id]: errors })
      return false
    }

    return true
  }

  const smoothScrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setTimeout(smoothScrollToTop, 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setTimeout(smoothScrollToTop, 100)
    }
  }

  const downloadCSV = () => {
    const csvData = []
    const headers = ["Section", "Field", "Value"]
    csvData.push(headers.join(","))

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
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    console.log("Form submitted:", formData)

    // Open the chatbot after submission
    setTimeout(() => {
      setIsChatbotOpen(true)
    }, 1000)
  }

  const renderStep = () => {
    const stepProps = {
      onUpdate: updateFormData,
      errors: validationErrors[steps[currentStep].id] || [],
    }

    switch (currentStep) {
      case 0:
        return <OrganizationStep {...stepProps} />
      case 1:
        return <ChallengesStep {...stepProps} />
      case 2:
        return <RequirementsStep {...stepProps} />
      case 3:
        return <TechnicalStep {...stepProps} />
      case 4:
        return <BudgetStep {...stepProps} />
      default:
        return <OrganizationStep {...stepProps} />
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <PremiumFloatingElements />
        <Header />
        <ContactButton onClick={() => setIsContactModalOpen(true)} />
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        <AIEvaluationChatbot formData={formData} isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <Card className="backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 shadow-2xl shadow-black/20">
              <CardContent className="p-12 space-y-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <CheckCircle className="w-24 h-24 text-emerald-400 mx-auto relative z-10 drop-shadow-2xl" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                    Assessment Submitted Successfully!
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                    Thank you for completing the comprehensive AI requirements assessment. Our AI has analyzed your
                    submission and prepared a detailed implementation plan.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                >
                  <Button
                    onClick={() => setIsChatbotOpen(true)}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 transform hover:scale-105 border-0 px-8 py-4 text-lg font-semibold"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <MessageSquare className="w-5 h-5 mr-3" />
                    View AI Implementation Plan
                  </Button>

                  <Button
                    onClick={downloadCSV}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Download Assessment Data
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start space-x-3 text-white/90">
                      <ArrowRight className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span>Review your AI implementation plan in the chatbot</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/90">
                      <ArrowRight className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span>Ask questions about methodology, timeline, and costs</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/90">
                      <ArrowRight className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span>Download the evaluation report for your team</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/90">
                      <ArrowRight className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span>Schedule a follow-up consultation for detailed planning</span>
                    </li>
                  </ul>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  // Rest of the component remains the same...
  // (Keep the existing return statement for the form)
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <PremiumFloatingElements />
      <Header
        onServicesClick={() => scrollToSection(servicesRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onAssessmentClick={() => scrollToSection(assessmentRef)}
        onTestimonialsClick={() => scrollToSection(testimonialsRef)}
      />
      <ContactButton onClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Assessment Form Section */}
      <section ref={assessmentRef} className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight mb-6">
              AI Requirements Assessment
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Complete this assessment to receive a customized AI solution proposal tailored to your business needs
            </p>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 shadow-2xl shadow-black/10">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Step {currentStep + 1} of {steps.length}
                    </h2>
                    <p className="text-white/60">Complete all sections for comprehensive analysis</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-right"
                  >
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg text-lg px-4 py-2">
                      {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                    </Badge>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="origin-left mb-6"
                >
                  <div className="relative">
                    <Progress
                      value={((currentStep + 1) / steps.length) * 100}
                      className="h-4 shadow-inner bg-white/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="relative"
                    >
                      <Badge
                        variant={index <= currentStep ? "default" : "outline"}
                        className={`w-full p-3 text-center transition-all duration-500 ${
                          index <= currentStep
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 border-0"
                            : "bg-white/5 text-white/60 border-white/20 hover:bg-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="text-xs font-medium">{step.title}</div>
                      </Badge>
                      {index <= currentStep && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full shadow-lg"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Validation Errors */}
          <AnimatePresence>
            {validationErrors[steps[currentStep].id] && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-6"
              >
                <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-red-200 font-semibold mb-2">
                          Please complete the following required fields:
                        </h3>
                        <ul className="text-red-300 text-sm space-y-1">
                          {validationErrors[steps[currentStep].id].map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 shadow-2xl shadow-black/10">
              <CardContent className="p-10">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-xl text-white/70 leading-relaxed">{steps[currentStep].description}</p>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <motion.div
                  className="flex justify-between items-center mt-12 pt-8 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="group bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] px-8 py-4 text-lg font-semibold border-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Assessment & Get AI Analysis
                          <CheckCircle className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={nextStep}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 transform hover:scale-105 px-8 py-4 text-lg font-semibold border-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      Continue
                      <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
