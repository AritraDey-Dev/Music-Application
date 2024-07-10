"use client"

import { MyUUserContextProvider } from "@/hooks/useUser"
import React from "react"

interface UserProviderProps {
    children: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    return (
        <MyUUserContextProvider>{children}</MyUUserContextProvider>
    )
}

export default UserProvider;