"use client"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

const loginSchema = z.object({
        email: z.string().email({message: "유요한 이메일을 작성해주세요"}),
        password: z.string().min(6, {
            message: "비밀번호는 최소 6자 이상 최대 20자 이하로 작성해주세요"
        })
    })
    type TLoginFormValues = z.infer<typeof loginSchema>


 const LoginForm = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    const {register, handleSubmit, formState:{errors}, reset} = useForm<TLoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
      } 
    })

    const isCloseLoginModal  = () => {
        setIsLoginModalOpen(false)
        reset()
        setError(null)
        setIsLoading(false)
    }
    
    const onSubmit = async (data: TLoginFormValues) => {
        setIsLoading(true)
        try{

        }catch(error){
            setError(error instanceof Error ? error.message : "로그인 중 에러가 발생하였습니다.")
            throw new Error("에러가 발생하였습니다, 관리자에게 문의 하세요.")
        }finally{
            setIsLoading(false)
        }
        
        
    }

    
    return (<form></form>)


}

export default LoginForm 