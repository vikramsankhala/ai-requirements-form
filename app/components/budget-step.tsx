"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface BudgetStepProps {
  onUpdate: (data: any) => void
}

const budgetRanges = [
  { id: "under-50k", label: "Under $50,000", icon: "💰" },
  { id: "50k-100k", label: "$50,000 - $100,000", icon: "💰" },
  { id: "100k-250k", label: "$100,000 - $250,000", icon: "💰" },
  { id: "250k-500k", label: "$250,000 - $500,000", icon: "💰" },
  { id: "500k-1m", label: "$500,000 - $1,000,000", icon: "💰" },
  { id: "over-1m", label: "Over $1,000,000", icon: "💰" },
]

const investmentTypes = [
  { id: "pilot", label: "Pilot Project", icon: "🚀" },
  { id: "full-implementation", label: "Full Implementation", icon: "🏗️" },
  { id: "consulting", label: "Consulting & Strategy", icon: "💡" },
  { id: "training", label: "Team Training", icon: "📚" },
  { id: "ongoing-support", label: "Ongoing Support", icon: "🔧" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

export function BudgetStep({ onUpdate }: BudgetStepProps) {
  const [data, setData] = useState({
    budgetRange: "",
    timeline: "",
    investmentTypes: [] as string[],
    priority: [5],
    roi: "",
    constraints: "",
    decisionMakers: "",
    nextSteps: "",
  })

  const handleInvestmentChange = (investmentId: string, checked: boolean) => {
    if (!investmentId) return

    const newInvestments = checked
      ? [...data.investmentTypes, investmentId]
      : data.investmentTypes.filter((id) => id !== investmentId)

    const newData = { ...data, investmentTypes: newInvestments }
    setData(newData)
    onUpdate({ budget: newData })
  }

  const handleChange = (field: string, value: any) => {
    if (!field) return

    const newData = { ...data, [field]: value }
    setData(newData)
    onUpdate({ budget: newData })
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block">Budget Range *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetRanges.map((budget, index) => (
            <motion.div key={budget.id} variants={itemVariants}>
              <Card
                className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                  data.budgetRange === budget.id ? "bg-blue-500/20 border-blue-400/40" : ""
                }`}
                onClick={() => handleChange("budgetRange", budget.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  scale: data.budgetRange === budget.id ? 1.05 : 1,
                  backgroundColor:
                    data.budgetRange === budget.id ? "rgba(147, 197, 253, 0.1)" : "rgba(255, 255, 255, 0.05)",
                  borderColor: data.budgetRange === budget.id ? "rgba(94, 148, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
                  transition: "scale 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{budget.icon}</span>
                    <span className="text-white">{budget.label}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="timeline" className="text-white mb-2 block">
          Implementation Timeline *
        </Label>
        <Select onValueChange={(value) => handleChange("timeline", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors">
            <SelectValue placeholder="Select your timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
            <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
            <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
            <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
            <SelectItem value="flexible">Flexible timeline</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block">Investment Areas *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {investmentTypes.map((investment, index) => (
            <motion.div key={investment.id} variants={itemVariants}>
              <Card
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={investment.id}
                      checked={data.investmentTypes.includes(investment.id)}
                      onCheckedChange={(checked) => handleInvestmentChange(investment.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    />
                    <Label
                      htmlFor={investment.id}
                      className="text-white cursor-pointer flex items-center space-x-2 flex-1"
                    >
                      <span className="text-xl">{investment.icon}</span>
                      <span>{investment.label}</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white mb-4 block">Project Priority Level (1-10)</Label>
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Slider
              value={data.priority}
              onValueChange={(value) => handleChange("priority", value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </motion.div>
          <div className="flex justify-between text-sm text-white/60">
            <span>Low priority</span>
            <motion.span
              className="text-white font-medium"
              style={{ display: "inline-block" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Priority: {data.priority[0]}/10
            </motion.span>
            <span>Critical priority</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="roi" className="text-white mb-2 block">
          Expected ROI & Success Metrics
        </Label>
        <Textarea
          id="roi"
          value={data.roi}
          onChange={(e) => handleChange("roi", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          placeholder="Describe your expected return on investment and how you'll measure success..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="constraints" className="text-white mb-2 block">
          Budget Constraints & Considerations
        </Label>
        <Textarea
          id="constraints"
          value={data.constraints}
          onChange={(e) => handleChange("constraints", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          placeholder="Any budget constraints, approval processes, or financial considerations we should know about..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="decisionMakers" className="text-white mb-2 block">
          Decision Makers & Stakeholders
        </Label>
        <Textarea
          id="decisionMakers"
          value={data.decisionMakers}
          onChange={(e) => handleChange("decisionMakers", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[80px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          placeholder="Who are the key decision makers and stakeholders involved in this project?"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="nextSteps" className="text-white mb-2 block">
          Preferred Next Steps
        </Label>
        <Textarea
          id="nextSteps"
          value={data.nextSteps}
          onChange={(e) => handleChange("nextSteps", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[80px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          placeholder="What would you like to happen after this assessment? (e.g., proposal, demo, pilot project)"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-emerald-500/10 border-emerald-400/20">
          <CardContent className="p-4">
            <p className="text-emerald-200 text-sm">
              💡 Budget and timeline information helps us create a realistic proposal that aligns with your investment
              capacity and business objectives.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
