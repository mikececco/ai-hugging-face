import { Button } from "@/components/ui/button"
import { List, PlusCircle } from "lucide-react"

export function Sidebar({ activeView, setActiveView }) {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Options</h2>
      <ul>
        <li className="mb-2">
          <Button
            variant={activeView === "all" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveView("all")}
          >
            <List className="mr-2 h-4 w-4" />
            All Businesses
          </Button>
        </li>
        <li>
          <Button
            variant={activeView === "create" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveView("create")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Business
          </Button>
        </li>
      </ul>
    </div>
  )
}
