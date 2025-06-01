"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { AlertCircle } from "lucide-react"

interface BudgetStepProps {
  onUpdate: (data: any) => void
  errors: string[]
}

const budgetRanges = [
  { id: "under-50k", label: "Under $50,000", icon: "💰", description: "Small pilot projects, proof of concepts" },
  { id: "50k-100k", label: "$50,000 - $100,000", icon: "💰", description: "Department-level implementations" },
  { id: "100k-250k", label: "$100,000 - $250,000", icon: "💰", description: "Multi-department solutions" },
  { id: "250k-500k", label: "$250,000 - $500,000", icon: "💰", description: "Enterprise-wide implementations" },
  { id: "500k-1m", label: "$500,000 - $1,000,000", icon: "💰", description: "Large-scale transformations" },
  { id: "over-1m", label: "Over $1,000,000", icon: "💰", description: "Strategic AI initiatives" },
]

const investmentTypes = [
  { id: "pilot", label: "Pilot Project", icon: "🚀", description: "Small-scale proof of concept" },
  { id: "full-implementation", label: "Full Implementation", icon: "🏗️", description: "Complete solution deployment" },
  { id: "consulting", label: "Consulting & Strategy", icon: "💡", description: "Strategic planning and guidance" },
  { id: "training", label: "Team Training", icon: "📚", description: "Staff education and upskilling" },
  { id: "ongoing-support", label: "Ongoing Support", icon: "🔧", description: "Maintenance and optimization" },
]

export function BudgetStep({ onUpdate, errors }: BudgetStepProps) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const hasError = (field: string) => {
    return errors.some((error) => error.toLowerCase().includes(field.toLowerCase()))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-6">
          <Label className="text-white text-2xl font-bold">Budget Range *</Label>
          {hasError("budget range") && <AlertCircle className="w-6 h-6 text-red-400" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgetRanges.map((budget, index) => (
            <motion.div key={budget.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.budgetRange === budget.id
                    ? "bg-gradient-to-br from-emerald-500/20 via-green-500/15 to-teal-500/10 border-emerald-400/40 shadow-xl shadow-emerald-500/20 scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                } ${hasError("budget range") ? "border-red-400/30" : ""}`}
                onClick={() => handleChange("budgetRange", budget.id)}
                whileHover={{ scale: data.budgetRange === budget.id ? 1.05 : 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <motion.span
                      className="text-2xl"
                      animate={{ scale: data.budgetRange === budget.id ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {budget.icon}
                    </motion.span>
                    <div>
                      <div className="text-lg font-semibold text-white mb-1">{budget.label}</div>
                      <div className="text-sm text-white/70 leading-relaxed">{budget.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-3">
          <Label htmlFor="timeline" className="text-white text-xl font-semibold">
            Implementation Timeline *
          </Label>
          {hasError("timeline") && <AlertCircle className="w-5 h-5 text-red-400" />}
        </div>
        <Select onValueChange={(value) => handleChange("timeline", value)}>
          <SelectTrigger
            className={`bg-white/10 border-white/20 text-white hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors text-lg py-6 ${
              hasError("timeline") ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : ""
            }`}
          >
            <SelectValue placeholder="Select your timeline" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
            <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
            <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
            <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
            <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
            <SelectItem value="flexible">Flexible timeline</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white text-2xl font-bold mb-6 block">Investment Areas *</Label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investmentTypes.map((investment, index) => (
            <motion.div key={investment.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.investmentTypes.includes(investment.id)
                    ? "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-fuchsia-500/10 border-violet-400/40 shadow-xl shadow-violet-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={investment.id}
                      checked={data.investmentTypes.includes(investment.id)}
                      onCheckedChange={(checked) => handleInvestmentChange(investment.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500 transition-all duration-200 mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={investment.id}
                        className="text-white cursor-pointer flex items-start space-x-3 font-medium"
                      >
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: data.investmentTypes.includes(investment.id) ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {investment.icon}
                        </motion.span>
                        <div>
                          <div className="text-lg font-semibold mb-1">{investment.label}</div>
                          <div className="text-sm text-white/70 leading-relaxed">{investment.description}</div>
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
        <Label className="text-white mb-6 block text-xl font-semibold">Project Priority Level (1-10)</Label>
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="px-4">
            <Slider
              value={data.priority}
              onValueChange={(value) => handleChange("priority", value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </motion.div>
          <div className="flex justify-between text-base text-white/60 px-4">
            <span>Low priority</span>
            <motion.span
              className="text-white font-semibold bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-2 rounded-full text-sm shadow-lg"
              key={data.priority[0]}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              Priority: {data.priority[0]}/10
            </motion.span>
            <span>Critical priority</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="roi" className="text-white mb-3 block text-xl font-semibold">
          Expected ROI & Success Metrics
        </Label>
        <Textarea
          id="roi"
          value={data.roi}
          onChange={(e) => handleChange("roi", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[120px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors text-lg"
          placeholder="Describe your expected return on investment, key performance indicators, and how you'll measure success..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="constraints" className="text-white mb-3 block text-xl font-semibold">
          Budget Constraints & Considerations
        </Label>
        <Textarea
          id="constraints"
          value={data.constraints}
          onChange={(e) => handleChange("constraints", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[120px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors text-lg"
          placeholder="Any budget constraints, approval processes, financial considerations, or funding requirements..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="decisionMakers" className="text-white mb-3 block text-xl font-semibold">
          Decision Makers & Stakeholders
        </Label>
        <Textarea
          id="decisionMakers"
          value={data.decisionMakers}
          onChange={(e) => handleChange("decisionMakers", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors text-lg"
          placeholder="Who are the key decision makers, stakeholders, and influencers involved in this project?"
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="nextSteps" className="text-white mb-3 block text-xl font-semibold">
          Preferred Next Steps
        </Label>
        <Textarea
          id="nextSteps"
          value={data.nextSteps}
          onChange={(e) => handleChange("nextSteps", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors text-lg"
          placeholder="What would you like to happen after this assessment? (e.g., detailed proposal, demo, pilot project, strategy session)"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/20 hover:border-emerald-400/30 transition-all duration-300 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.p
              className="text-emerald-200 text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              💡 Budget and timeline information helps us create a realistic proposal that aligns with your investment
              capacity, business objectives, and organizational readiness for AI transformation.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
