/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { UserProvider } from "./interfaces/providers/user";

export const UserContext = createContext<UserProvider>({} as UserProvider);
export const ToastContext = createContext<(severity: 'success' | 'info' | 'warn' | 'error', title: string, detail: string) => void>(() => {});