import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Calendar } from "lucide-react"

export function BusinessCard({ business }) {
  return (
    <Card>
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
  )
}
