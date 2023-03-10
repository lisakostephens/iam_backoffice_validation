/* eslint-disable no-unused-vars */
export interface LoginProps {
    email: string; 
    validateEmail: (email: string) => void; 
    onUpdateEmail: (email: string) => void; 
    isEmailError: boolean;
    password: string; 
    validatePassword: (password: string) => void; 
    onUpdatePassword: (password: string) => void; 
    isPasswordError: boolean; 
    onLogin: () => Promise<void>; 
    isLoginError: boolean;
}