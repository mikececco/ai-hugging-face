"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "./sidebar"
import { BusinessList } from "./business-list"
import { BusinessForm } from "./business-form"

export function BusinessSalePlatformComponent() {
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeView, setActiveView] = useState("all")

  const { toast } = useToast()

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    try {
      const response = await fetch('/api/businesses')
      const data = await response.json()
      setBusinesses(data)
    } catch (error) {
      console.error('Error fetching businesses:', error)
      toast({
        title: "Error",
        description: "Failed to fetch businesses. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddBusiness = async (newBusiness) => {
    try {
      const response = await fetch('/api/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBusiness),
      })

      if (response.ok) {
        const addedBusiness = await response.json()
        setBusinesses([addedBusiness, ...businesses])
        toast({
          title: "Success",
          description: "Your business has been listed successfully.",
        })
        setActiveView("all")
      } else {
        throw new Error('Failed to add business')
      }
    } catch (error) {
      console.error('Error adding business:', error)
      toast({
        title: "Error",
        description: "Failed to list your business. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Business Sale Platform</h1>
        
        {activeView === "all" ? (
          <BusinessList 
            businesses={businesses} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        ) : (
          <BusinessForm handleAddBusiness={handleAddBusiness} />
        )}
      </div>
    </div>
  )
}
