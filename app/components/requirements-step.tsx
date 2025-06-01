"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RequirementsStepProps {
  onUpdate: (data: any) => void
}

const aiCapabilities = [
  { id: "nlp", label: "Natural Language Processing", icon: "💬" },
  { id: "computer-vision", label: "Computer Vision", icon: "👁️" },
  { id: "machine-learning", label: "Machine Learning Models", icon: "🧠" },
  { id: "automation", label: "Process Automation", icon: "🔄" },
  { id: "chatbots", label: "Chatbots & Virtual Assistants", icon: "🤖" },
  { id: "analytics", label: "Predictive Analytics", icon: "📈" },
  { id: "recommendation", label: "Recommendation Systems", icon: "🎯" },
  { id: "anomaly-detection", label: "Anomaly Detection", icon: "🚨" },
]

const integrationTypes = [
  { id: "api", label: "API Integration", icon: "🔌" },
  { id: "embedded", label: "Embedded Solutions", icon: "📱" },
  { id: "cloud", label: "Cloud-based Services", icon: "☁️" },
  { id: "on-premise", label: "On-premise Deployment", icon: "🏢" },
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
  },
}

export function RequirementsStep({ onUpdate }: RequirementsStepProps) {
  const [data, setData] = useState({
    capabilities: [] as string[],
    integrations: [] as string[],
    scalability: "",
    performance: "",
    customization: "",
    specificNeeds: "",
  })

  const handleCapabilityChange = (capabilityId: string, checked: boolean) => {
    if (!capabilityId) return

    const newCapabilities = checked
      ? [...data.capabilities, capabilityId]
      : data.capabilities.filter((id) => id !== capabilityId)

    const newData = { ...data, capabilities: newCapabilities }
    setData(newData)
    onUpdate({ requirements: newData })
  }

  const handleIntegrationChange = (integrationId: string, checked: boolean) => {
    if (!integrationId) return

    const newIntegrations = checked
      ? [...data.integrations, integrationId]
      : data.integrations.filter((id) => id !== integrationId)

    const newData = { ...data, integrations: newIntegrations }
    setData(newData)
    onUpdate({ requirements: newData })
  }

  const handleChange = (field: string, value: string) => {
    if (!field) return

    const newData = { ...data, [field]: value }
    setData(newData)
    onUpdate({ requirements: newData })
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block">What AI capabilities do you need? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiCapabilities.map((capability, index) => (
            <motion.div key={capability.id} variants={itemVariants}>
              <Card
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={capability.id}
                      checked={data.capabilities.includes(capability.id)}
                      onCheckedChange={(checked) => handleCapabilityChange(capability.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 transition-colors"
                    />
                    <Label
                      htmlFor={capability.id}
                      className="text-white cursor-pointer flex items-center space-x-2 flex-1"
                    >
                      <motion.span
                        className="text-xl"
                        style={{ originX: 0.5, originY: 0.5, display: "inline-block" }}
                        animate={{ rotate: data.capabilities.includes(capability.id) ? 360 : 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {capability.icon}
                      </motion.span>
                      <span>{capability.label}</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block">Preferred integration approach *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationTypes.map((integration, index) => (
            <motion.div key={integration.id} variants={itemVariants}>
              <Card
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={integration.id}
                      checked={data.integrations.includes(integration.id)}
                      onCheckedChange={(checked) => handleIntegrationChange(integration.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 transition-colors"
                    />
                    <Label
                      htmlFor={integration.id}
                      className="text-white cursor-pointer flex items-center space-x-2 flex-1"
                    >
                      <motion.span
                        className="text-xl"
                        style={{ originX: 0.5, originY: 0.5, display: "inline-block" }}
                        animate={{ rotate: data.integrations.includes(integration.id) ? 360 : 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {integration.icon}
                      </motion.span>
                      <span>{integration.label}</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Label htmlFor="scalability" className="text-white mb-2 block">
            Scalability Requirements
          </Label>
          <Select onValueChange={(value) => handleChange("scalability", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors">
              <SelectValue placeholder="Select scalability needs" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white">
              <SelectItem value="small">Small scale (&lt; 1K users)</SelectItem>
              <SelectItem value="medium">Medium scale (1K - 10K users)</SelectItem>
              <SelectItem value="large">Large scale (10K - 100K users)</SelectItem>
              <SelectItem value="enterprise">Enterprise scale (100K+ users)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="performance" className="text-white mb-2 block">
            Performance Requirements
          </Label>
          <Select onValueChange={(value) => handleChange("performance", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors">
              <SelectValue placeholder="Select performance needs" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white">
              <SelectItem value="real-time">Real-time (&lt; 100ms)</SelectItem>
              <SelectItem value="near-real-time">Near real-time (&lt; 1s)</SelectItem>
              <SelectItem value="batch">Batch processing (minutes/hours)</SelectItem>
              <SelectItem value="flexible">Flexible timing</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="customization" className="text-white mb-2 block">
          Customization Requirements
        </Label>
        <Textarea
          id="customization"
          value={data.customization}
          onChange={(e) => handleChange("customization", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors"
          placeholder="Describe any specific customization needs for your industry or use case..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="specificNeeds" className="text-white mb-2 block">
          Additional Specific Needs
        </Label>
        <Textarea
          id="specificNeeds"
          value={data.specificNeeds}
          onChange={(e) => handleChange("specificNeeds", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors"
          placeholder="Any other specific requirements, compliance needs, or special considerations..."
        />
      </motion.div>

      <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
        <Card className="bg-green-500/10 border-green-400/20">
          <CardContent className="p-4">
            <p className="text-green-200 text-sm">
              🎯 These requirements help us design AI solutions that perfectly fit your technical and business needs.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
