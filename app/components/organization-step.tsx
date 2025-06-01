"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface OrganizationStepProps {
  onUpdate: (data: any) => void
  errors: string[]
}

export function OrganizationStep({ onUpdate, errors }: OrganizationStepProps) {
  const [data, setData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    role: "",
    department: "",
    description: "",
  })

  const handleChange = (field: string, value: string) => {
    if (field && value !== undefined) {
      const newData = { ...data, [field]: value }
      setData(newData)
      onUpdate({ organization: newData })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const hasError = (field: string) => {
    return errors.some((error) => error.toLowerCase().includes(field.toLowerCase()))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
          <Label htmlFor="companyName" className="text-white mb-3 block text-lg font-semibold">
            Company Name *
          </Label>
          <div className="relative">
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 text-lg py-6 ${
                hasError("company name") ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : ""
              }`}
              placeholder="Enter your company name"
            />
            {hasError("company name") && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Label htmlFor="industry" className="text-white mb-3 block text-lg font-semibold">
            Industry *
          </Label>
          <Select onValueChange={(value) => handleChange("industry", value)}>
            <SelectTrigger
              className={`bg-white/10 border-white/20 text-white hover:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-lg py-6 ${
                hasError("industry") ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : ""
              }`}
            >
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Label htmlFor="companySize" className="text-white mb-3 block text-lg font-semibold">
            Company Size *
          </Label>
          <Select onValueChange={(value) => handleChange("companySize", value)}>
            <SelectTrigger
              className={`bg-white/10 border-white/20 text-white hover:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-lg py-6 ${
                hasError("company size") ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : ""
              }`}
            >
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
              <SelectItem value="startup">Startup (1-50)</SelectItem>
              <SelectItem value="small">Small (51-200)</SelectItem>
              <SelectItem value="medium">Medium (201-1000)</SelectItem>
              <SelectItem value="large">Large (1001-5000)</SelectItem>
              <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Label htmlFor="role" className="text-white mb-3 block text-lg font-semibold">
            Your Role *
          </Label>
          <div className="relative">
            <Input
              id="role"
              value={data.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 text-lg py-6 ${
                hasError("role") ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" : ""
              }`}
              placeholder="e.g., CTO, VP Engineering, CEO"
            />
            {hasError("role") && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
            )}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="department" className="text-white mb-3 block text-lg font-semibold">
          Department
        </Label>
        <Input
          id="department"
          value={data.department}
          onChange={(e) => handleChange("department", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 text-lg py-6"
          placeholder="e.g., Engineering, Operations, Product"
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="description" className="text-white mb-3 block text-lg font-semibold">
          Company Description
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 min-h-[120px] resize-none text-lg"
          placeholder="Brief description of your company, products, and services..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:border-blue-400/30 transition-all duration-300 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.p
              className="text-blue-200 text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              💡 This information helps us understand your organization's context and tailor our AI recommendations to
              your specific industry, size, and business objectives.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
