'use client'

import { ArrowLeft, Plus, Presentation, Globe, FileText, Shield, Share2, Dna, Briefcase, Coffee, Brain } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Generate</h1>
          <p className="text-center text-gray-600 text-lg">What would you like to create today?</p>
        </div>

        {/* Content Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
          <Card className="p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors bg-blue-100/50">
            <Presentation className="w-6 h-6 mb-1.5 text-primary" />
            <span className="text-blue-600 text-sm">Presentation</span>
          </Card>
          <Card className="p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <Globe className="w-6 h-6 mb-1.5 text-gray-600" />
            <span className="text-sm">Webpage</span>
          </Card>
          <Card className="p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 mb-1.5 text-gray-600" />
            <span className="text-sm">Document</span>
          </Card>
        </div>

        {/* Settings */}
        <div className="flex flex-wrap gap-4 max-w-2xl mx-auto mb-8">
          <Select defaultValue="8">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Cards" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8 cards</SelectItem>
              <SelectItem value="12">12 cards</SelectItem>
              <SelectItem value="16">16 cards</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="default">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="en-US">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <Input 
            placeholder="Describe what you'd like to make" 
            className="w-full p-4 text-lg"
          />
        </div>

        {/* Example Prompts */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-gray-600 mb-8">Example prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "Cyber security basics" },
              { icon: <Share2 className="w-4 h-4" />, text: "Social media marketing strategies" },
              { icon: <Dna className="w-4 h-4" />, text: "Intro genetics lesson" },
              { icon: <Briefcase className="w-4 h-4" />, text: "Pitch deck for a startup that makes organic dog food" },
              { icon: <Coffee className="w-4 h-4" />, text: "How to brew the perfect cup of espresso" },
              { icon: <Brain className="w-4 h-4" />, text: "Seminar on the psychology of decision-making" },
            ].map((prompt, index) => (
              <Card key={index} className="p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{prompt.icon}</span>
                    <span className="text-xs text-gray-600">{prompt.text}</span>
                  </div>
                  <Plus className="h-3 w-3 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

