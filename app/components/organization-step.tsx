"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface OrganizationStepProps {
  onUpdate: (data: any) => void
}

export function OrganizationStep({ onUpdate }: OrganizationStepProps) {
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
          <Label htmlFor="companyName" className="text-white mb-2 block font-medium">
            Company Name *
          </Label>
          <Input
            id="companyName"
            value={data.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
            placeholder="Enter your company name"
          />
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Label htmlFor="industry" className="text-white mb-2 block font-medium">
            Industry *
          </Label>
          <Select onValueChange={(value) => handleChange("industry", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
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
          <Label htmlFor="companySize" className="text-white mb-2 block font-medium">
            Company Size *
          </Label>
          <Select onValueChange={(value) => handleChange("companySize", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="startup">Startup (1-50)</SelectItem>
              <SelectItem value="small">Small (51-200)</SelectItem>
              <SelectItem value="medium">Medium (201-1000)</SelectItem>
              <SelectItem value="large">Large (1001-5000)</SelectItem>
              <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Label htmlFor="role" className="text-white mb-2 block font-medium">
            Your Role *
          </Label>
          <Input
            id="role"
            value={data.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
            placeholder="e.g., CTO, VP Engineering"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="department" className="text-white mb-2 block font-medium">
          Department
        </Label>
        <Input
          id="department"
          value={data.department}
          onChange={(e) => handleChange("department", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
          placeholder="e.g., Engineering, Operations, Product"
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label htmlFor="description" className="text-white mb-2 block font-medium">
          Company Description
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15 min-h-[100px] resize-none"
          placeholder="Brief description of your company and what you do..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/15 transition-all duration-300">
          <CardContent className="p-4">
            <motion.p
              className="text-blue-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              💡 This information helps us understand your organization's context and tailor our AI recommendations
              accordingly.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
