"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface RequirementsStepProps {
  onUpdate: (data: any) => void
  errors: string[]
}

const aiCapabilities = [
  {
    id: "nlp",
    label: "Natural Language Processing",
    icon: "💬",
    description: "Text analysis, chatbots, language understanding",
  },
  {
    id: "computer-vision",
    label: "Computer Vision",
    icon: "👁️",
    description: "Image recognition, object detection, visual analysis",
  },
  {
    id: "machine-learning",
    label: "Machine Learning Models",
    icon: "🧠",
    description: "Predictive models, pattern recognition, data insights",
  },
  { id: "automation", label: "Process Automation", icon: "🔄", description: "Workflow automation, task optimization" },
  {
    id: "chatbots",
    label: "Chatbots & Virtual Assistants",
    icon: "🤖",
    description: "Customer service, internal support systems",
  },
  {
    id: "analytics",
    label: "Predictive Analytics",
    icon: "📈",
    description: "Forecasting, trend analysis, business intelligence",
  },
  {
    id: "recommendation",
    label: "Recommendation Systems",
    icon: "🎯",
    description: "Personalized suggestions, content curation",
  },
  {
    id: "anomaly-detection",
    label: "Anomaly Detection",
    icon: "🚨",
    description: "Fraud detection, quality control, monitoring",
  },
]

const integrationTypes = [
  { id: "api", label: "API Integration", icon: "🔌", description: "RESTful APIs, webhooks, microservices" },
  {
    id: "embedded",
    label: "Embedded Solutions",
    icon: "📱",
    description: "Native app integration, SDK implementation",
  },
  { id: "cloud", label: "Cloud-based Services", icon: "☁️", description: "SaaS solutions, cloud deployment" },
  { id: "on-premise", label: "On-premise Deployment", icon: "🏢", description: "Local infrastructure, private cloud" },
]

export function RequirementsStep({ onUpdate, errors }: RequirementsStepProps) {
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
          <Label className="text-white text-2xl font-bold">What AI capabilities do you need? *</Label>
          {hasError("capabilities") && <AlertCircle className="w-6 h-6 text-red-400" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiCapabilities.map((capability, index) => (
            <motion.div key={capability.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.capabilities.includes(capability.id)
                    ? "bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/10 border-emerald-400/40 shadow-xl shadow-emerald-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                } ${hasError("capabilities") ? "border-red-400/30" : ""}`}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={capability.id}
                      checked={data.capabilities.includes(capability.id)}
                      onCheckedChange={(checked) => handleCapabilityChange(capability.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all duration-200 mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={capability.id}
                        className="text-white cursor-pointer flex items-start space-x-3 font-medium"
                      >
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: data.capabilities.includes(capability.id) ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {capability.icon}
                        </motion.span>
                        <div>
                          <div className="text-lg font-semibold mb-1">{capability.label}</div>
                          <div className="text-sm text-white/70 leading-relaxed">{capability.description}</div>
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
        <div className="flex items-center space-x-3 mb-6">
          <Label className="text-white text-2xl font-bold">Preferred integration approach *</Label>
          {hasError("integrations") && <AlertCircle className="w-6 h-6 text-red-400" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrationTypes.map((integration, index) => (
            <motion.div key={integration.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.integrations.includes(integration.id)
                    ? "bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-rose-500/10 border-purple-400/40 shadow-xl shadow-purple-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                } ${hasError("integrations") ? "border-red-400/30" : ""}`}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={integration.id}
                      checked={data.integrations.includes(integration.id)}
                      onCheckedChange={(checked) => handleIntegrationChange(integration.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 transition-all duration-200 mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={integration.id}
                        className="text-white cursor-pointer flex items-start space-x-3 font-medium"
                      >
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: data.integrations.includes(integration.id) ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {integration.icon}
                        </motion.span>
                        <div>
                          <div className="text-lg font-semibold mb-1">{integration.label}</div>
                          <div className="text-sm text-white/70 leading-relaxed">{integration.description}</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Label htmlFor="scalability" className="text-white mb-3 block text-xl font-semibold">
            Scalability Requirements
          </Label>
          <Select onValueChange={(value) => handleChange("scalability", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors text-lg py-6">
              <SelectValue placeholder="Select scalability needs" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
              <SelectItem value="small">Small scale (&lt; 1K users)</SelectItem>
              <SelectItem value="medium">Medium scale (1K - 10K users)</SelectItem>
              <SelectItem value="large">Large scale (10K - 100K users)</SelectItem>
              <SelectItem value="enterprise">Enterprise scale (100K+ users)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="performance" className="text-white mb-3 block text-xl font-semibold">
            Performance Requirements
          </Label>
          <Select onValueChange={(value) => handleChange("performance", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors text-lg py-6">
              <SelectValue placeholder="Select performance needs" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
              <SelectItem value="real-time">Real-time (&lt; 100ms)</SelectItem>
              <SelectItem value="near-real-time">Near real-time (&lt; 1s)</SelectItem>
              <SelectItem value="batch">Batch processing (minutes/hours)</SelectItem>
              <SelectItem value="flexible">Flexible timing</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="customization" className="text-white mb-3 block text-xl font-semibold">
          Customization Requirements
        </Label>
        <Textarea
          id="customization"
          value={data.customization}
          onChange={(e) => handleChange("customization", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[120px] hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors text-lg"
          placeholder="Describe any specific customization needs for your industry, compliance requirements, or unique use cases..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="specificNeeds" className="text-white mb-3 block text-xl font-semibold">
          Additional Specific Needs
        </Label>
        <Textarea
          id="specificNeeds"
          value={data.specificNeeds}
          onChange={(e) => handleChange("specificNeeds", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[120px] hover:border-blue-300 focus:ring-2 focus:ring-blue-500 transition-colors text-lg"
          placeholder="Any other specific requirements, compliance needs, integration constraints, or special considerations..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 hover:border-green-400/30 transition-all duration-300 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.p
              className="text-green-200 text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🎯 These requirements help us design AI solutions that perfectly fit your technical and business needs,
              ensuring seamless integration with your existing systems and workflows.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
