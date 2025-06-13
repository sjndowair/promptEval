import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {Dialog,
     DialogClose,
     DialogContent,
     DialogDescription} from "@/components/ui/dialog"
     import {z} from "zod"
     import { useForm } from "react-hook-form"
     import { useStore } from "@/lib/store"


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

            </DialogContent>
        </Dialog>
    )

}

export default SignupForm