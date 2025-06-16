import { useState } from "react"
import {motion} from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import {Dialog,
     DialogClose,
     DialogContent,
     DialogHeader,
     DialogDescription} from "@/components/ui/dialog"
     import {z} from "zod"
     import { useForm } from "react-hook-form"
     import { useStore } from "@/lib/store"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"


const signupSchema = z.object({
        name: z.string().min(2, {message: "이름은 최소 2자 이상 작성해주세요"}).max(2, {message: "이름은 최소 2자 이상으로 작성해주세요"}),
        email: z.string().email({message: "유효한 이메일을 작성해주세요"}),
        password: z.string().min(6, {message: "비밀번호는 최소 6자 이상 작성해주세요"}).max(20, {message: "비밀번호는 최대 20자 이하로 작성해주세요"}),
    })

    type TSignupFormValues = z.infer<typeof signupSchema>

const SignupForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {register, handleSubmit, formState:{errors}, reset} = useForm(
        {
            resolver: zodResolver(signupSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
            }
        }
    )
    
    const {setIsSignupModalOpen, isSignupModalOpen} = useStore();
    const isCloseModal = () => {
        setIsSignupModalOpen(false)
        reset()
        setError(null)
        setIsLoading(false)
        
    }

    const onSubmit = async(data: TSignupFormValues) => {
        try{
            console.log("회원가입 시도:", data)
        }catch(error){
            setError(error instanceof Error ? error.message : "회원가입 중 에러가 발생하였습니다.")
            throw new Error(error instanceof Error ? error.message : "회원가입 중 에러가 발생하였습니다.")
        }finally{
            setIsLoading(false)
        }
    }


    



    return (
        <Dialog open={isSignupModalOpen} onOpenChange={isCloseModal}>
            <DialogContent className="sm:max-w-[25rem]">
                <DialogHeader>  
                  <DialogTitle className="text-purple-800 dark:text-blue-400">회원가입</DialogTitle>
                  <DialogDescription>프롬프트 평가 서비스에 가입하고 다양한 기능을 이용해보세요.</DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label htmlFor="email">이메일</label>
                        <Input
                            id="email"
                            placeholder="이메일을 입력해주세요"
                            {...register("email")}
                            className={errors.email ? "border-red-500" : ""}
                        /> 
                        {errors?.email && (
                             <motion.p
                             initial={{opacity: 0, y: -10 }}
                             animate={{opacity: 1, y: 0}}
                             className ="text-xs text-red-500"
                             >{errors.email.message}</motion.p>
                        )}
                        
                    </div>
                  </form>
            </DialogContent>
        </Dialog>
    )

}

export default SignupForm