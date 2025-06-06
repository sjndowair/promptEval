import { useMutation } from "@tanstack/react-query";

interface ILoginCredentials {
    email: string;
    password: string;
}
interface IUser {
    id: string;
    name: string;
    email: string;
}

interface ILoginError {
    message: string
}

//모의 로그인 함수

const mockLogin = async (credential: ILoginCredentials) => {
   return new Promise<IUser>((res, rej) => {
    if(credential.email === typeof "string" && credential.password === typeof "string") {
        setTimeout(() => {
            res({
                id: "wodnjsdl1125",
                name: "김재원",
                email: credential.email,
            })
        }, 2000)
    }else{
        rej({message: "로그인 정보가 올바르지 않습니다."} as ILoginError)
    }
   })    
}

export const useLogin = () => {
    return useMutation<IUser, ILoginError, ILoginCredentials>({
        mutationFn: mockLogin,
    })
}