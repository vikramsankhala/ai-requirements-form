"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { AlertCircle } from "lucide-react"

interface ChallengesStepProps {
  onUpdate: (data: any) => void
  errors: string[]
}

const challenges = [
  {
    id: "data-processing",
    label: "Data Processing & Analysis",
    icon: "📊",
    description: "Handling large datasets and extracting insights",
  },
  {
    id: "customer-service",
    label: "Customer Service Automation",
    icon: "🤖",
    description: "Automating support and improving response times",
  },
  {
    id: "decision-making",
    label: "Decision Making Support",
    icon: "🎯",
    description: "AI-powered analytics for better business decisions",
  },
  {
    id: "operational-efficiency",
    label: "Operational Efficiency",
    icon: "⚡",
    description: "Streamlining processes and reducing costs",
  },
  {
    id: "predictive-analytics",
    label: "Predictive Analytics",
    icon: "🔮",
    description: "Forecasting trends and future outcomes",
  },
  {
    id: "content-generation",
    label: "Content Generation",
    icon: "✍️",
    description: "Automated content creation and optimization",
  },
  {
    id: "quality-control",
    label: "Quality Control",
    icon: "✅",
    description: "Automated quality assurance and testing",
  },
  { id: "cost-reduction", label: "Cost Reduction", icon: "💰", description: "Identifying cost-saving opportunities" },
]

export function ChallengesStep({ onUpdate, errors }: ChallengesStepProps) {
  const [data, setData] = useState({
    selectedChallenges: [] as string[],
    urgency: [5],
    description: "",
    impact: "",
  })

  const handleChallengeChange = (challengeId: string, checked: boolean) => {
    if (!challengeId) return

    const newChallenges = checked
      ? [...data.selectedChallenges, challengeId]
      : data.selectedChallenges.filter((id) => id !== challengeId)

    const newData = { ...data, selectedChallenges: newChallenges }
    setData(newData)
    onUpdate({ challenges: newData })
  }

  const handleChange = (field: string, value: any) => {
    if (!field) return

    const newData = { ...data, [field]: value }
    setData(newData)
    onUpdate({ challenges: newData })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const hasError = (field: string) => {
    return errors.some((error) => error.toLowerCase().includes(field.toLowerCase()))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-6">
          <Label className="text-white text-2xl font-bold">What challenges is your organization facing? *</Label>
          {hasError("selected challenges") && <AlertCircle className="w-6 h-6 text-red-400" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.selectedChallenges.includes(challenge.id)
                    ? "bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/10 border-blue-400/40 shadow-xl shadow-blue-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                } ${hasError("selected challenges") ? "border-red-400/30" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={challenge.id}
                      checked={data.selectedChallenges.includes(challenge.id)}
                      onCheckedChange={(checked) => handleChallengeChange(challenge.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200 mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={challenge.id}
                        className="text-white cursor-pointer flex items-start space-x-3 font-medium"
                      >
                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {challenge.icon}
                        </motion.span>
                        <div>
                          <div className="text-lg font-semibold mb-1">{challenge.label}</div>
                          <div className="text-sm text-white/70 leading-relaxed">{challenge.description}</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white mb-6 block text-xl font-semibold">
          How urgent is addressing these challenges? (1-10)
        </Label>
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="px-4">
            <Slider
              value={data.urgency}
              onValueChange={(value) => handleChange("urgency", value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </motion.div>
          <div className="flex justify-between text-base text-white/60 px-4">
            <span>Not urgent</span>
            <motion.span
              className="text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full text-sm"
              key={data.urgency[0]}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              Urgency: {data.urgency[0]}/10
            </motion.span>
            <span>Extremely urgent</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="description" className="text-white mb-3 block text-xl font-semibold">
          Describe your main challenges in detail
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 min-h-[140px] resize-none text-lg"
          placeholder="Provide specific details about the challenges you're facing, their impact on your business, and any current solutions you've tried..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="impact" className="text-white mb-3 block text-xl font-semibold">
          What's the business impact of these challenges?
        </Label>
        <Textarea
          id="impact"
          value={data.impact}
          onChange={(e) => handleChange("impact", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 min-h-[120px] resize-none text-lg"
          placeholder="How do these challenges affect your revenue, efficiency, customer satisfaction, competitive advantage, etc.?"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 hover:border-amber-400/30 transition-all duration-300 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.p
              className="text-amber-200 text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ⚠️ Understanding your challenges helps us prioritize AI solutions that will have the most significant
              impact on your business operations and bottom line.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
