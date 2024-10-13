"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, DollarSign, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BusinessSalePlatformComponent() {
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.location.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    (<div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Business Sale Platform</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>List Your Business</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List Your Business for Sale</DialogTitle>
              <DialogDescription>
                Fill out the form below to list your business on our platform.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleAddBusiness(Object.fromEntries(formData))
                e.target.reset()
              }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Business Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" name="description" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Asking Price ($)
                  </Label>
                  <Input id="price" name="price" type="number" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employees" className="text-right">
                    Number of Employees
                  </Label>
                  <Input
                    id="employees"
                    name="employees"
                    type="number"
                    className="col-span-3"
                    required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="yearEstablished" className="text-right">
                    Year Established
                  </Label>
                  <Input
                    id="yearEstablished"
                    name="yearEstablished"
                    type="number"
                    className="col-span-3"
                    required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" name="location" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">List Business</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <Card key={business.id}>
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>{business.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{business.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  ${business.price.toLocaleString()}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {business.employees} employees
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Est. {business.yearEstablished}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Seller</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>)
  );
}
