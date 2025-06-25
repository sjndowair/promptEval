"use client"
import { useStore } from "@/lib/store"
import { ThemeToggle } from "../theme-toggle"
import { Button } from "./button"
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
 } from "./dropdown-menu"
 import {User, LogOut, LogIn, Menu, X, UserPlus } from "lucide-react"
 import { useSignOutMutation } from "@/lib/auth-queries"
 

 interface IMobileNavProps {
    isOpen?: boolean;
    setIsOpen?: ((isOpen: boolean) => void)
    isHandleLoginClick?: () => void;
    isHandleSignupClick?: () => void;
 }

export const MobileNav = ({isOpen, setIsOpen = () => {}
    ,isHandleLoginClick, isHandleSignupClick}: IMobileNavProps) => {
    const {user} = useStore()
    const signOutMutation = useSignOutMutation()

    return (
        <div className="flex items-center md:hidden"> 
        <ThemeToggle />
        {user ? (
              <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-purple-100 dark:bg-blue-900">
                      <User className="h-4 w-4 text-purple-600 dark:text-blue-400" />
                      <span className="sr-only">사용자 메뉴</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOutMutation.mutate()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
        ) : (
            <div className="flex items-center gap-2 mx-1.25">
             <Button
              variant="default"
              size="sm"
              onClick={isHandleLoginClick}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700">
               <LogIn className="h-4 w-4" />
                <span className="sr-only">로그인</span>
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={isHandleSignupClick}
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                    <UserPlus className="h-4 w-4" />
                    <span className="sr-only">회원가입</span>
                </Button>
                </div>
        )}
        <Button type="button" variant="ghost" size="icon" aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)} 
            >{isOpen ? (
    <X className="h-4 w-4" />
  ) : (
    <Menu className="h-4 w-4" />
  )}
        </Button>
        </div>
        
    )
    
}

