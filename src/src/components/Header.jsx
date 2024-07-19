"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/store/auth-provider"
import {
  Home,
  Package2,
  PanelLeft,
  Settings,
  Users2,
  SquareMenu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

const LOGOUT_INTERNAL_ENDPOINT = '/api/logout/'

export default function Header({children}) {
  const auth = useAuth();
  const path = usePathname();

  const logoutHandler = async() => {
    auth.logout();
    await fetch(LOGOUT_INTERNAL_ENDPOINT);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className={path === '/' ? "h-5 w-5 text-purple-600" : "h-5 w-5"}/>
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-[Vazir-Medium] bg-purple-800">خانه</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/users/login/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className={path.startsWith('/users') ? "h-5 w-5 text-purple-600" : "h-5 w-5"} />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-[Vazir-Medium] bg-purple-800">احراز هویت</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          {auth.isAuthenticated && <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/forms/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <SquareMenu className={path.startsWith('/forms') ? "h-5 w-5 text-purple-600" : "h-5 w-5"} />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-[Vazir-Medium] bg-purple-800">فرم ها</TooltipContent>
          </Tooltip>
          </TooltipProvider>}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        {auth.isAuthenticated && <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className={path.startsWith('/admin') ? "h-5 w-5 text-purple-600" : "h-5 w-5"} />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-[Vazir-Medium] bg-purple-800">پنل ادمین</TooltipContent>
          </Tooltip>
          </TooltipProvider>}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/login"
                  className="font-[Vazir-Medium] mt-7 flex items-center gap-4 px-2.5 text-muted-foreground hover:text-purple-800"
                >
                  <Home className="h-5 w-5" />
                  خانه
                </Link>
                <Link
                  href="/users/login/"
                  className="font-[Vazir-Medium] flex items-center gap-4 px-2.5 text-muted-foreground hover:text-purple-800"
                >
                  <Users2 className="h-5 w-5" />
                  احراز هویت
                </Link>
                {auth.isAuthenticated && <Link
                  href="/forms"
                  className="font-[Vazir-Medium] flex items-center gap-4 px-2.5 text-muted-foreground hover:text-purple-800"
                >
                  <SquareMenu className="h-5 w-5" />
                  فرم ها
                </Link>}
                {auth.isAuthenticated && <Link
                  href="/admin"
                  className="font-[Vazir-Medium] flex items-center gap-4 px-2.5 text-muted-foreground hover:text-purple-800"
                >
                  <Settings className="h-5 w-5" />
                  پنل ادمین
                </Link>}
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-right font-[Vazir-Medium]">{auth.isAuthenticated && auth.email ? auth.email : 'ایمیل من'}</DropdownMenuLabel>
              {auth.isAuthenticated && <DropdownMenuLabel onClick={logoutHandler} className="font-[Vazir-Medium] text-right cursor-pointer hover:text-purple-800">خروج</DropdownMenuLabel>}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <hr/>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  )
}
