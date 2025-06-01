"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TechnicalStepProps {
  onUpdate: (data: any) => void
}

const cloudProviders = [
  { id: "aws", label: "Amazon Web Services", icon: "☁️" },
  { id: "azure", label: "Microsoft Azure", icon: "🔷" },
  { id: "gcp", label: "Google Cloud Platform", icon: "🌐" },
  { id: "on-premise", label: "On-premise Infrastructure", icon: "🏢" },
  { id: "hybrid", label: "Hybrid Cloud", icon: "🔄" },
]

const databases = [
  { id: "postgresql", label: "PostgreSQL", icon: "🐘" },
  { id: "mysql", label: "MySQL", icon: "🐬" },
  { id: "mongodb", label: "MongoDB", icon: "🍃" },
  { id: "redis", label: "Redis", icon: "🔴" },
  { id: "elasticsearch", label: "Elasticsearch", icon: "🔍" },
  { id: "snowflake", label: "Snowflake", icon: "❄️" },
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

export function TechnicalStep({ onUpdate }: TechnicalStepProps) {
  const [data, setData] = useState({
    cloudProviders: [] as string[],
    databases: [] as string[],
    programmingLanguages: "",
    frameworks: "",
    dataVolume: "",
    securityRequirements: "",
    complianceNeeds: "",
    existingAI: "",
    integrationChallenges: "",
  })

  const handleCloudChange = (providerId: string, checked: boolean) => {
    if (!providerId) return

    const newProviders = checked
      ? [...data.cloudProviders, providerId]
      : data.cloudProviders.filter((id) => id !== providerId)

    const newData = { ...data, cloudProviders: newProviders }
    setData(newData)
    onUpdate({ technical: newData })
  }

  const handleDatabaseChange = (databaseId: string, checked: boolean) => {
    if (!databaseId) return

    const newDatabases = checked ? [...data.databases, databaseId] : data.databases.filter((id) => id !== databaseId)

    const newData = { ...data, databases: newDatabases }
    setData(newData)
    onUpdate({ technical: newData })
  }

  const handleChange = (field: string, value: string) => {
    if (!field) return

    const newData = { ...data, [field]: value }
    setData(newData)
    onUpdate({ technical: newData })
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block">Current Cloud Infrastructure *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cloudProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={provider.id}
                      checked={data.cloudProviders.includes(provider.id)}
                      onCheckedChange={(checked) => handleCloudChange(provider.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500"
                    />
                    <Label
                      htmlFor={provider.id}
                      className="text-white cursor-pointer flex items-center space-x-2 flex-1"
                    >
                      <motion.span
                        className="text-xl"
                        style={{ originX: 0.5, originY: 0.5 }}
                        animate={{ rotate: data.cloudProviders.includes(provider.id) ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {provider.icon}
                      </motion.span>
                      <span>{provider.label}</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label className="text-white text-lg mb-4 block">Database Technologies *</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {databases.map((database, index) => (
            <motion.div
              key={database.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={database.id}
                      checked={data.databases.includes(database.id)}
                      onCheckedChange={(checked) => handleDatabaseChange(database.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-blue-500"
                    />
                    <Label
                      htmlFor={database.id}
                      className="text-white cursor-pointer flex items-center space-x-2 flex-1 text-sm"
                    >
                      <motion.span
                        className="text-xl"
                        style={{ originX: 0.5, originY: 0.5 }}
                        animate={{ scale: data.databases.includes(database.id) ? 1.2 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {database.icon}
                      </motion.span>
                      <span>{database.label}</span>
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
          <Label htmlFor="programmingLanguages" className="text-white mb-2 block">
            Programming Languages
          </Label>
          <Input
            id="programmingLanguages"
            value={data.programmingLanguages}
            onChange={(e) => handleChange("programmingLanguages", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200"
            placeholder="e.g., Python, JavaScript, Java"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="frameworks" className="text-white mb-2 block">
            Frameworks & Tools
          </Label>
          <Input
            id="frameworks"
            value={data.frameworks}
            onChange={(e) => handleChange("frameworks", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200"
            placeholder="e.g., React, Django, TensorFlow"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="dataVolume" className="text-white mb-2 block">
          Data Volume & Characteristics
        </Label>
        <Select onValueChange={(value) => handleChange("dataVolume", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-300 transition-colors duration-200">
            <SelectValue placeholder="Select your data volume" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small (&lt; 1GB)</SelectItem>
            <SelectItem value="medium">Medium (1GB - 1TB)</SelectItem>
            <SelectItem value="large">Large (1TB - 1PB)</SelectItem>
            <SelectItem value="enterprise">Enterprise (&gt; 1PB)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="securityRequirements" className="text-white mb-2 block">
          Security Requirements
        </Label>
        <Textarea
          id="securityRequirements"
          value={data.securityRequirements}
          onChange={(e) => handleChange("securityRequirements", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200"
          placeholder="Describe your security requirements, data privacy needs, access controls..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="complianceNeeds" className="text-white mb-2 block">
          Compliance Requirements
        </Label>
        <Input
          id="complianceNeeds"
          value={data.complianceNeeds}
          onChange={(e) => handleChange("complianceNeeds", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200"
          placeholder="e.g., GDPR, HIPAA, SOC 2, PCI DSS"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="existingAI" className="text-white mb-2 block">
          Existing AI/ML Tools
        </Label>
        <Textarea
          id="existingAI"
          value={data.existingAI}
          onChange={(e) => handleChange("existingAI", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[80px] focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200"
          placeholder="List any existing AI/ML tools, models, or platforms you're currently using..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="integrationChallenges" className="text-white mb-2 block">
          Integration Challenges
        </Label>
        <Textarea
          id="integrationChallenges"
          value={data.integrationChallenges}
          onChange={(e) => handleChange("integrationChallenges", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[80px] focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200"
          placeholder="Describe any technical challenges or constraints for AI integration..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-purple-500/10 border-purple-400/20">
          <CardContent className="p-4">
            <p className="text-purple-200 text-sm">
              🔧 Understanding your technical environment helps us recommend AI solutions that integrate seamlessly with
              your existing infrastructure.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
