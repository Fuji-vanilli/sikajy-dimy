import {
    BookOpen,
  BookOpenIcon,
  ChevronDownIcon,
  Home,
  Layers2Icon,
  LayoutDashboard,
  LogOutIcon,
  PinIcon,
  Settings,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export default function UserDropdown() {
    const {data, isPending} = authClient.useSession();
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
                <AvatarImage src="/origin/avatar.jpg" alt="Profile image" />
                <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <ChevronDownIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
            />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-w-64">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                    Keith Kennedy
                </span>
                <span className="truncate text-xs font-normal text-muted-foreground">
                    k.kennedy@coss.com
                </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href= "/    ">
                        <Home size={16} className="opacity-60" aria-hidden="true" />
                        <span>Home</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href= "/courses">
                        <BookOpen size={16} className="opacity-60" aria-hidden="true" />
                        <span>Courses</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href= "/dashboard">
                        <LayoutDashboard size={16} className="opacity-60" aria-hidden="true" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings size={16} className="opacity-60" aria-hidden="true" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link>
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}
