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