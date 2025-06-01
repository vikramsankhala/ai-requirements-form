"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  ChevronRight,
  Download,
  FileText,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle2,
} from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface FormData {
  organization?: {
    companyName?: string
    industry?: string
    companySize?: string
    role?: string
    department?: string
    description?: string
  }
  challenges?: {
    selectedChallenges?: string[]
    urgency?: number[]
    description?: string
    impact?: string
  }
  requirements?: {
    capabilities?: string[]
    integrations?: string[]
    scalability?: string
    performance?: string
    customization?: string
    specificNeeds?: string
  }
  technical?: {
    cloudProviders?: string[]
    databases?: string[]
    programmingLanguages?: string
    frameworks?: string
    dataVolume?: string
    securityRequirements?: string
    complianceNeeds?: string
    existingAI?: string
    integrationChallenges?: string
  }
  budget?: {
    budgetRange?: string
    timeline?: string
    investmentTypes?: string[]
    priority?: number[]
    roi?: string
    constraints?: string
    decisionMakers?: string
    nextSteps?: string
  }
}

interface AIEvaluationChatbotProps {
  formData: FormData
  isOpen: boolean
  onClose: () => void
}

export function AIEvaluationChatbot({ formData, isOpen, onClose }: AIEvaluationChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [evaluation, setEvaluation] = useState<{
    summary: string
    methodology: string
    timeline: string
    costs: {
      total: string
      breakdown: { category: string; amount: string; description: string }[]
    }
    recommendations: string[]
  } | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize chat with system message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessages: Message[] = [
        {
          role: "system",
          content:
            "You are an AI Implementation Specialist that helps analyze enterprise requirements and provide detailed AI implementation plans.",
        },
        {
          role: "assistant",
          content:
            "Hello! I'm your AI Implementation Specialist. I've analyzed your requirements form and prepared a comprehensive evaluation. You can view the detailed analysis in the Evaluation tab, or ask me specific questions about the implementation plan, methodology, or costs.",
        },
      ]
      setMessages(initialMessages)
      generateInitialEvaluation()
    }
  }, [isOpen, formData])

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const generateInitialEvaluation = async () => {
    setIsLoading(true)

    try {
      // Mock evaluation data - replace with actual AI call when SDK is properly configured
      const mockEvaluation = {
        summary: `Based on your assessment, your ${formData.organization?.companyName || "organization"} in the ${formData.organization?.industry || "technology"} sector shows strong potential for AI implementation. Your primary challenges around ${formData.challenges?.selectedChallenges?.[0] || "operational efficiency"} can be effectively addressed through targeted AI solutions.`,

        methodology: `Phase 1: Discovery & Planning (4-6 weeks)
- Detailed requirements analysis
- Technical architecture design
- Stakeholder alignment sessions
- Proof of concept development

Phase 2: Implementation (8-12 weeks)
- Core AI system development
- Integration with existing systems
- Initial testing and validation
- User training programs

Phase 3: Deployment & Optimization (4-6 weeks)
- Production deployment
- Performance monitoring
- User feedback integration
- Continuous optimization`,

        timeline: `Total Project Duration: 16-24 weeks

Milestone 1 (Week 6): Completed discovery and approved technical design
Milestone 2 (Week 12): Core functionality implemented and tested
Milestone 3 (Week 18): Full deployment and user training completed
Milestone 4 (Week 24): Performance optimization and handover`,

        costs: {
          total: `$${formData.budget?.budgetRange?.includes("50k") ? "75,000 - $125,000" : formData.budget?.budgetRange?.includes("100k") ? "150,000 - $250,000" : formData.budget?.budgetRange?.includes("250k") ? "300,000 - $450,000" : "500,000 - $750,000"}`,
          breakdown: [
            {
              category: "Discovery & Planning",
              amount: "$25,000 - $40,000",
              description: "Requirements analysis, technical design, and project planning",
            },
            {
              category: "AI Development",
              amount: "$40,000 - $80,000",
              description: "Custom AI model development and training",
            },
            {
              category: "Integration & Testing",
              amount: "$20,000 - $35,000",
              description: "System integration and comprehensive testing",
            },
            {
              category: "Training & Support",
              amount: "$15,000 - $25,000",
              description: "User training and 6-month support package",
            },
            {
              category: "Infrastructure",
              amount: "$10,000 - $20,000",
              description: "Cloud infrastructure and deployment costs",
            },
          ],
        },

        recommendations: [
          `Start with a pilot project focusing on ${formData.challenges?.selectedChallenges?.[0] || "your primary challenge"} to demonstrate ROI`,
          `Leverage your existing ${formData.technical?.cloudProviders?.[0] || "cloud"} infrastructure to reduce implementation costs`,
          `Implement a phased rollout approach to minimize business disruption`,
          `Establish clear success metrics and KPIs before implementation begins`,
          `Invest in team training to ensure successful adoption and long-term success`,
          `Consider starting with pre-built AI solutions before developing custom models`,
          `Ensure data quality and governance processes are in place before AI implementation`,
        ],
      }

      setEvaluation(mockEvaluation)
    } catch (error) {
      console.error("Error generating evaluation:", error)
      // Fallback evaluation if anything fails
      setEvaluation({
        summary:
          "Thank you for completing the assessment. Our team will review your requirements and provide a detailed evaluation within 24 hours.",
        methodology:
          "Our team will contact you to discuss the implementation methodology based on your specific needs.",
        timeline: "Timeline will be determined based on your requirements and priorities.",
        costs: {
          total: "Cost estimates will be provided after detailed analysis",
          breakdown: [{ category: "Consultation", amount: "Free", description: "Initial consultation and proposal" }],
        },
        recommendations: ["Schedule a consultation call to discuss your specific needs in detail"],
      })
    }

    setIsLoading(false)
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Mock AI response - replace with actual AI call when SDK is properly configured
      let responseText = ""

      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("cost") || lowerInput.includes("price") || lowerInput.includes("budget")) {
        responseText = `Based on your assessment, the estimated project cost is ${evaluation?.costs.total || "to be determined"}. This includes discovery, development, integration, training, and support. The investment is structured to provide maximum value and ROI for your organization.`
      } else if (lowerInput.includes("timeline") || lowerInput.includes("time") || lowerInput.includes("duration")) {
        responseText = `The implementation timeline is typically 16-24 weeks, broken down into three main phases: Discovery & Planning (4-6 weeks), Implementation (8-12 weeks), and Deployment & Optimization (4-6 weeks). We can adjust this timeline based on your specific requirements and urgency.`
      } else if (
        lowerInput.includes("methodology") ||
        lowerInput.includes("approach") ||
        lowerInput.includes("process")
      ) {
        responseText = `Our methodology follows a proven three-phase approach: 1) Discovery & Planning - where we analyze your requirements and design the solution, 2) Implementation - where we develop and integrate the AI systems, and 3) Deployment & Optimization - where we deploy to production and optimize performance.`
      } else if (
        lowerInput.includes("recommendation") ||
        lowerInput.includes("advice") ||
        lowerInput.includes("suggest")
      ) {
        responseText = `My key recommendations for your organization include starting with a pilot project to demonstrate ROI, leveraging your existing infrastructure, implementing a phased rollout, establishing clear success metrics, and investing in team training for successful adoption.`
      } else {
        responseText = `Thank you for your question about "${input}". Based on your assessment, I can provide detailed information about costs, timeline, methodology, or recommendations. What specific aspect would you like me to elaborate on?`
      }

      // Add AI response
      const assistantMessage: Message = { role: "assistant", content: responseText }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again or contact our team for assistance.",
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const downloadEvaluation = () => {
    if (!evaluation) return

    const evaluationText = `
# AI Implementation Evaluation

## Executive Summary
${evaluation.summary}

## Implementation Methodology
${evaluation.methodology}

## Timeline
${evaluation.timeline}

## Project Costs
Total: ${evaluation.costs.total}

### Cost Breakdown
${evaluation.costs.breakdown.map((item) => `- ${item.category}: ${item.amount}\n  ${item.description}`).join("\n\n")}

## Key Recommendations
${evaluation.recommendations.map((rec) => `- ${rec}`).join("\n")}
    `

    const blob = new Blob([evaluationText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `AI_Implementation_Evaluation_${new Date().toISOString().split("T")[0]}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50"
        style={{
          width: isMinimized ? "auto" : "90%",
          maxWidth: isMinimized ? "auto" : "800px",
          height: isMinimized ? "auto" : "80vh",
          maxHeight: isMinimized ? "auto" : "800px",
        }}
      >
        {isMinimized ? (
          <Button
            onClick={() => setIsMinimized(false)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0 rounded-full p-4"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        ) : (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-white/20 shadow-2xl h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">AI Implementation Specialist</h3>
                {isLoading && (
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30 animate-pulse">
                    Thinking...
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(true)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="px-4 border-b border-white/10">
                <TabsList className="bg-white/5">
                  <TabsTrigger
                    value="chat"
                    className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="evaluation"
                    className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
                  >
                    Evaluation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="flex-1 flex flex-col p-4 overflow-hidden">
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages
                    .filter((msg) => msg.role !== "system")
                    .map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "assistant"
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-white"
                              : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-white"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex space-x-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your AI implementation plan..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[60px] resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 self-end h-[60px] px-4"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="evaluation" className="flex-1 overflow-y-auto p-4">
                {evaluation ? (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                        AI Implementation Evaluation
                      </h3>
                      <Button
                        onClick={downloadEvaluation}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    </div>

                    <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/20">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-blue-400" />
                          Executive Summary
                        </h4>
                        <p className="text-white/90 whitespace-pre-wrap">{evaluation.summary}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
                          Implementation Methodology
                        </h4>
                        <p className="text-white/90 whitespace-pre-wrap">{evaluation.methodology}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-amber-400" />
                          Timeline
                        </h4>
                        <p className="text-white/90 whitespace-pre-wrap">{evaluation.timeline}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                          Project Costs
                        </h4>
                        <div className="mb-4">
                          <div className="text-lg font-medium text-white">Total: {evaluation.costs.total}</div>
                        </div>

                        <h5 className="text-lg font-medium text-white mb-4">Cost Breakdown</h5>
                        <div className="space-y-4">
                          {evaluation.costs.breakdown.map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium text-white">{item.category}</div>
                                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                                  {item.amount}
                                </Badge>
                              </div>
                              <p className="text-white/70 text-sm">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                          Key Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {evaluation.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start space-x-2 text-white/90">
                              <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                              <span>{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200/20 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/70">Generating your AI implementation evaluation...</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
