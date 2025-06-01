"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface TechnicalStepProps {
  onUpdate: (data: any) => void
  errors: string[]
}

const cloudProviders = [
  { id: "aws", label: "Amazon Web Services", icon: "☁️", description: "EC2, S3, Lambda, SageMaker" },
  { id: "azure", label: "Microsoft Azure", icon: "🔷", description: "Azure ML, Cognitive Services, Functions" },
  { id: "gcp", label: "Google Cloud Platform", icon: "🌐", description: "AI Platform, BigQuery, Cloud Functions" },
  {
    id: "on-premise",
    label: "On-premise Infrastructure",
    icon: "🏢",
    description: "Private servers, local data centers",
  },
  { id: "hybrid", label: "Hybrid Cloud", icon: "🔄", description: "Mix of cloud and on-premise solutions" },
]

const databases = [
  { id: "postgresql", label: "PostgreSQL", icon: "🐘", description: "Relational database" },
  { id: "mysql", label: "MySQL", icon: "🐬", description: "Open-source RDBMS" },
  { id: "mongodb", label: "MongoDB", icon: "🍃", description: "NoSQL document database" },
  { id: "redis", label: "Redis", icon: "🔴", description: "In-memory data store" },
  { id: "elasticsearch", label: "Elasticsearch", icon: "🔍", description: "Search and analytics engine" },
  { id: "snowflake", label: "Snowflake", icon: "❄️", description: "Cloud data warehouse" },
]

export function TechnicalStep({ onUpdate, errors }: TechnicalStepProps) {
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
          <Label className="text-white text-2xl font-bold">Current Cloud Infrastructure *</Label>
          {hasError("cloud providers") && <AlertCircle className="w-6 h-6 text-red-400" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cloudProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.cloudProviders.includes(provider.id)
                    ? "bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-500/10 border-cyan-400/40 shadow-xl shadow-cyan-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                } ${hasError("cloud providers") ? "border-red-400/30" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={provider.id}
                      checked={data.cloudProviders.includes(provider.id)}
                      onCheckedChange={(checked) => handleCloudChange(provider.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 transition-all duration-200 mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={provider.id}
                        className="text-white cursor-pointer flex items-start space-x-3 font-medium"
                      >
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: data.cloudProviders.includes(provider.id) ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {provider.icon}
                        </motion.span>
                        <div>
                          <div className="text-lg font-semibold mb-1">{provider.label}</div>
                          <div className="text-sm text-white/70 leading-relaxed">{provider.description}</div>
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
          <Label className="text-white text-2xl font-bold">Database Technologies *</Label>
          {hasError("databases") && <AlertCircle className="w-6 h-6 text-red-400" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {databases.map((database, index) => (
            <motion.div
              key={database.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                  data.databases.includes(database.id)
                    ? "bg-gradient-to-br from-orange-500/20 via-red-500/15 to-pink-500/10 border-orange-400/40 shadow-xl shadow-orange-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                } ${hasError("databases") ? "border-red-400/30" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={database.id}
                      checked={data.databases.includes(database.id)}
                      onCheckedChange={(checked) => handleDatabaseChange(database.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-all duration-200 mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={database.id}
                        className="text-white cursor-pointer flex items-start space-x-2 font-medium text-sm"
                      >
                        <motion.span
                          className="text-lg"
                          animate={{ scale: data.databases.includes(database.id) ? 1.2 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {database.icon}
                        </motion.span>
                        <div>
                          <div className="font-semibold mb-1">{database.label}</div>
                          <div className="text-xs text-white/60">{database.description}</div>
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
          <Label htmlFor="programmingLanguages" className="text-white mb-3 block text-xl font-semibold">
            Programming Languages
          </Label>
          <Input
            id="programmingLanguages"
            value={data.programmingLanguages}
            onChange={(e) => handleChange("programmingLanguages", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200 text-lg py-6"
            placeholder="e.g., Python, JavaScript, Java, C#"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="frameworks" className="text-white mb-3 block text-xl font-semibold">
            Frameworks & Tools
          </Label>
          <Input
            id="frameworks"
            value={data.frameworks}
            onChange={(e) => handleChange("frameworks", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200 text-lg py-6"
            placeholder="e.g., React, Django, TensorFlow, Docker"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="dataVolume" className="text-white mb-3 block text-xl font-semibold">
          Data Volume & Characteristics
        </Label>
        <Select onValueChange={(value) => handleChange("dataVolume", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-300 transition-colors duration-200 text-lg py-6">
            <SelectValue placeholder="Select your data volume" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
            <SelectItem value="small">Small (&lt; 1GB)</SelectItem>
            <SelectItem value="medium">Medium (1GB - 1TB)</SelectItem>
            <SelectItem value="large">Large (1TB - 1PB)</SelectItem>
            <SelectItem value="enterprise">Enterprise (&gt; 1PB)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="securityRequirements" className="text-white mb-3 block text-xl font-semibold">
          Security Requirements
        </Label>
        <Textarea
          id="securityRequirements"
          value={data.securityRequirements}
          onChange={(e) => handleChange("securityRequirements", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[120px] focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200 text-lg"
          placeholder="Describe your security requirements, data privacy needs, access controls, encryption standards..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="complianceNeeds" className="text-white mb-3 block text-xl font-semibold">
          Compliance Requirements
        </Label>
        <Input
          id="complianceNeeds"
          value={data.complianceNeeds}
          onChange={(e) => handleChange("complianceNeeds", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200 text-lg py-6"
          placeholder="e.g., GDPR, HIPAA, SOC 2, PCI DSS, ISO 27001"
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="existingAI" className="text-white mb-3 block text-xl font-semibold">
          Existing AI/ML Tools
        </Label>
        <Textarea
          id="existingAI"
          value={data.existingAI}
          onChange={(e) => handleChange("existingAI", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200 text-lg"
          placeholder="List any existing AI/ML tools, models, platforms, or services you're currently using..."
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="integrationChallenges" className="text-white mb-3 block text-xl font-semibold">
          Integration Challenges
        </Label>
        <Textarea
          id="integrationChallenges"
          value={data.integrationChallenges}
          onChange={(e) => handleChange("integrationChallenges", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 min-h-[100px] focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-300 transition-colors duration-200 text-lg"
          placeholder="Describe any technical challenges, legacy system constraints, or integration requirements..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-400/20 hover:border-purple-400/30 transition-all duration-300 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.p
              className="text-purple-200 text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🔧 Understanding your technical environment helps us recommend AI solutions that integrate seamlessly with
              your existing infrastructure, ensuring minimal disruption and maximum compatibility.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
