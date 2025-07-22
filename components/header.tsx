"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {  LogIn, User, LogOut, UserPlus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import  {LoginForm}  from "@/components/ui/login-form"
import { useStore } from "@/lib/store"
import { useSignOutMutation } from "@/lib/auth-queries"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {navItems} from "@/constants/data"
import {MobileNav} from "@/components/ui/mobile-nav"

import SignupForm from "./ui/signup-form"


export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const {setIsLoginModalOpen, user, setIsSignupModalOpen} = useStore()
  const signOutMutation = useSignOutMutation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])




  const isHandleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const isHandleSignupClick = () => {
    setIsSignupModalOpen(true)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold text-purple-600 dark:text-blue-400">
                프롬프트 평가기
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-blue-400 ${
                        pathname === item.href
                          ? "text-purple-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="underline"
                          className="absolute left-0 top-full h-0.5 w-full bg-purple-600 dark:bg-blue-400"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center space-x-4">
                <ThemeToggle />

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 w-8 bg-purple-100 dark:bg-blue-900"
                      >
                        <User className="h-4 w-4 text-purple-600 dark:text-blue-400" />
                        <span className="sr-only">사용자 메뉴</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isHandleSignupClick}
                      className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      회원가입
                    </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={isHandleLoginClick}
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    로그인
                  </Button>
                  
                  </>
                )}
              </div>
            </nav>
            {/* Mobile Navigation Toggle */}
           <MobileNav 
           isOpen={isOpen}
           setIsOpen={setIsOpen}
           isHandleLoginClick={isHandleLoginClick} 
           isHandleSignupClick={isHandleSignupClick} />  
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block py-2 text-base font-medium ${
                        pathname === item.href
                          ? "text-purple-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </header>

      <LoginForm />
      <SignupForm />
    </>
  )
}
