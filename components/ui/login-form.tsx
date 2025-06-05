"use client"
import z from "zod"
import useForm from "react-hook-form"

 const LoginForm = () => {
    console.log(z)
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6, {
            message: "비밀번호는 최소 6자 이상 최대 20자 이하로 작성해주세요"
        }).max(20, {
            message: "비밀번호는 최소 6자 이상 최대 20자 이하로 작성해주세요"
        })
    })

    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     register: {
    //         resolver : async () => {

    //         }
    //     }
    // })

    return (<form></form>)


}

export default LoginForm 