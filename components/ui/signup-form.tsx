import { useState } from "react"
import {motion} from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import {Dialog,
     DialogClose,
     DialogContent,
     DialogHeader,
     DialogDescription,
     DialogFooter} from "@/components/ui/dialog"
     import {z} from "zod"
     import { useForm } from "react-hook-form"
     import { useStore } from "@/lib/store"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, UserPlus } from "lucide-react"
import { useSignUpMutation } from "@/lib/auth-queries"
import { getFirebaseErrorMessage } from "@/lib/auth-service"


const signupSchema = z.object({
        name: z.string().min(2, {message: "이름은 최소 2자 이상 작성해주세요"}).max(50, {message: "이름은 최대 50자 이하로 작성해주세요"}),
        email: z.string().email({message: "유효한 이메일을 작성해주세요"}),
        password: z.string().min(6, {message: "비밀번호는 최소 6자 이상 작성해주세요"}).max(20, {message: "비밀번호는 최대 20자 이하로 작성해주세요"}),
        confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"]
})

    type TSignupFormValues = z.infer<typeof signupSchema>

const SignupForm = () => {

    const {setIsSignupModalOpen, isSignupModalOpen, setIsLoginModalOpen} = useStore()
    const signUpMutation = useSignUpMutation()
    
    const {register, handleSubmit, formState:{errors}, reset} = useForm(
        {
            resolver: zodResolver(signupSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    )
    

    const isCloseModal = () => {
        setIsSignupModalOpen(false)
        reset()
        signUpMutation.reset();
    }

    const onSubmit = async(data: TSignupFormValues) => {
        signUpMutation.mutate({
            email: data.email,
            password: data.password,
            name: data.name
        }, {
            onSuccess: () => {
                reset() // 폼 리셋
            },
            onError: (error) => {
                console.error('회원가입 실패:', error);
            }
        })
    }

    const isChangeLoginModalOpen = () => {
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(true);
        reset()
        signUpMutation.reset()
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
                        <label htmlFor="name">이름</label>
                        <Input
                        id="name"
                        placeholder= "이름을 입력해주세요"
                        {...register("name")}
                        className={errors.name ? "border-red-500" : ""}
                        />
                        {errors?.name && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-500"
                            >
                                {errors.name.message}
                            </motion.p>
                        )}
                        </div>
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
                        <div className="space-y-2">
                            <label htmlFor="password">비밀번호</label>
                            <Input
                            id="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register("password")}
                            type="password"
                            className={errors?.password ? "border-red-500" : ""}
                           />
                                {errors?.password && (
                                    <motion.p
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    className="text-xs text-red-500">
                                        {errors?.password.message}
                                    </motion.p>
                                )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <Input
                            id="confirmPassword"
                            placeholder="비밀번호를 다시 입력해주세요"
                            {...register("confirmPassword")}
                            type="password"
                            className={errors?.confirmPassword ? "border-red-500" : ""}
                           />
                                {errors?.confirmPassword && (
                                    <motion.p
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    className="text-xs text-red-500">
                                        {errors?.confirmPassword.message}
                                    </motion.p>
                                )}
                        </div>
                    
                    {signUpMutation.error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-md bg-red-50 dark:bg-red-900/20 p-3"
                        >
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {getFirebaseErrorMessage(signUpMutation.error.message)}
                            </p>
                        </motion.div>
                    )}
                    
                    <DialogFooter>
                        <Button type="submit"
                        disabled={signUpMutation.isPending}
                        className="flex-1"
                        variant="outline"
                        onClick={isChangeLoginModalOpen}
                        >로그인 하러가기</Button>
                        <Button
                        type="submit"
                        disabled={signUpMutation.isPending}
                        className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >{signUpMutation.isPending ? ( <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  가입중...
                </span>) : ( <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  회원가입
                </span>)}</Button>
                    </DialogFooter>
                  </form>
            </DialogContent>
        </Dialog>
    )

}

export default SignupForm