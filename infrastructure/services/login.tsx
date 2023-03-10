import axios from 'axios';
import { UserData } from "../interfaces/providers/user";

export const login = async (email: string, password: string) => {
    const body = { email: email, password: password }
    const response: UserData = await ( await axios.post(`${(process.env.NEXT_PUBLIC_API_URL as string)}/api/v1/auth/login`, body)).data;
    
    return response
}