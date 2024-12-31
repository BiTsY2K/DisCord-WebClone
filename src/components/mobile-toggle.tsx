import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { NavigationSidebar } from "./navigation/NavigationSidebar"
import { ServerSidebar } from "./server/ServerSidebar"

export const MobileToggle = ({
  serverId
}:{ serverId: string}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="">
        <ServerSidebar id={serverId} />
      </SheetContent>
    </Sheet>
  )
}