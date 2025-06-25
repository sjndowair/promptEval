"use client"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import {useStore } from "@/lib/store"
import { useSignInMutation } from "@/lib/auth-queries"
import { getFirebaseErrorMessage } from "@/lib/auth-service"

const loginSchema = z.object({
        email: z.string().email({message: "유요한 이메일을 작성해주세요"}),
        password: z.string().min(6, {
            message: "비밀번호는 최소 6자 이상 최대 20자 이하로 작성해주세요"
        })
    })
    type TLoginFormValues = z.infer<typeof loginSchema>


 export const LoginForm = () => {
    
    const {isLoginModalOpen, setIsLoginModalOpen, setIsSignupModalOpen} = useStore()
    const signInMutation = useSignInMutation()

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
        signInMutation.reset() // mutation 상태 리셋
    }
    
    const onSubmit = async (data: TLoginFormValues) => {
        signInMutation.mutate({
            email: data.email,
            password: data.password
        }, {
            onSuccess: () => {
                reset() // 폼 리셋
            },
            onError: (error) => {
                // 에러는 mutation에서 처리하므로 별도 처리 불필요
                console.error('로그인 실패:', error);
            }
        })
    }
    
    const isChangeSignupModalOpen = () => {
      setIsLoginModalOpen(false);
      setIsSignupModalOpen(true);
      reset();
      signInMutation.reset();

    }

    
    return (<Dialog open={isLoginModalOpen} onOpenChange={isCloseLoginModal}>
      
      <DialogContent className="sm:max-w-[25rem]">
        <DialogHeader>
          <DialogTitle className="text-purple-600 dark:text-blue-400">로그인</DialogTitle>
          <DialogDescription>프롬프트 평가 서비스를 이용하려면 로그인이 필요합니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              placeholder="이메일을 입력해주세요"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {signInMutation.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-md bg-red-50 dark:bg-red-900/20 p-3"
            >
              <p className="text-sm text-red-600 dark:text-red-400">
                {getFirebaseErrorMessage(signInMutation.error.message)}
              </p>
            </motion.div>
          )}
         
          <DialogFooter className="pt-4">
            <Button className="flex-1 " type="button" variant="outline" onClick={isChangeSignupModalOpen} disabled={signInMutation.isPending}>회원가입 하러가기</Button>
            <Button type="button" variant="outline" onClick={isCloseLoginModal} disabled={signInMutation.isPending}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={signInMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {signInMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  로그인 중...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  로그인
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>)


}

