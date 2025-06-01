"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface ChallengesStepProps {
  onUpdate: (data: any) => void
}

const challenges = [
  { id: "data-processing", label: "Data Processing & Analysis", icon: "📊" },
  { id: "customer-service", label: "Customer Service Automation", icon: "🤖" },
  { id: "decision-making", label: "Decision Making Support", icon: "🎯" },
  { id: "operational-efficiency", label: "Operational Efficiency", icon: "⚡" },
  { id: "predictive-analytics", label: "Predictive Analytics", icon: "🔮" },
  { id: "content-generation", label: "Content Generation", icon: "✍️" },
  { id: "quality-control", label: "Quality Control", icon: "✅" },
  { id: "cost-reduction", label: "Cost Reduction", icon: "💰" },
]

export function ChallengesStep({ onUpdate }: ChallengesStepProps) {
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block font-semibold">
          What challenges is your organization facing? *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  data.selectedChallenges.includes(challenge.id)
                    ? "bg-blue-500/20 border-blue-400/40 shadow-lg shadow-blue-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={challenge.id}
                      checked={data.selectedChallenges.includes(challenge.id)}
                      onCheckedChange={(checked) => handleChallengeChange(challenge.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200"
                    />
                    <Label
                      htmlFor={challenge.id}
                      className="text-white cursor-pointer flex items-center space-x-2 flex-1 font-medium"
                    >
                      <motion.span
                        className="text-xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {challenge.icon}
                      </motion.span>
                      <span>{challenge.label}</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white mb-4 block font-medium">How urgent is addressing these challenges? (1-10)</Label>
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Slider
              value={data.urgency}
              onValueChange={(value) => handleChange("urgency", value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </motion.div>
          <div className="flex justify-between text-sm text-white/60">
            <span>Not urgent</span>
            <motion.span
              className="text-white font-medium bg-white/10 px-3 py-1 rounded-full"
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
        <Label htmlFor="description" className="text-white mb-2 block font-medium">
          Describe your main challenges in detail
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 min-h-[120px] resize-none"
          placeholder="Provide specific details about the challenges you're facing and their impact on your business..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="impact" className="text-white mb-2 block font-medium">
          What's the business impact of these challenges?
        </Label>
        <Textarea
          id="impact"
          value={data.impact}
          onChange={(e) => handleChange("impact", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 min-h-[100px] resize-none"
          placeholder="How do these challenges affect your revenue, efficiency, customer satisfaction, etc.?"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-amber-500/10 border-amber-400/20 hover:bg-amber-500/15 transition-all duration-300">
          <CardContent className="p-4">
            <motion.p
              className="text-amber-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ⚠️ Understanding your challenges helps us prioritize AI solutions that will have the most significant
              impact on your business.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
