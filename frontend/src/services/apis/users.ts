import axios from "./../axios";
import type { IUser } from "@/interfaces/IUser";

interface LoginForm {
    email: string,
    password: string
}

interface RegisterForm {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

export const loginUser = async (data: LoginForm): Promise<IUser> => {
    const response = await axios({
        method: 'post',
        url: 'users/login',
        data
    })

    return response.data
}

export const registerUser = async (data: RegisterForm): Promise<void> => {
    await axios({
        method: 'post',
        url: 'users/register',
        data
    })
}
