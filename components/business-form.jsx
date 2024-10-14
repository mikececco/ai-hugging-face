import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function BusinessForm({ handleAddBusiness }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      handleAddBusiness(Object.fromEntries(formData))
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
      <Button type="submit" className="w-full">List Business</Button>
    </form>
  )
}
