import { Dispatch, SetStateAction } from "react";

export interface UserProvider {
    userData: UserData | null;
    updateUserdata: Dispatch<SetStateAction<UserData | null>>;
}

export interface UserData {
    email: string;
    user_id: number;
    user_name: string;
}