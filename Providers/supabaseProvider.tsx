"use client"

import Sidebar from "@/components/sidebar"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"

interface supabaseProviderProps{
    children: React.ReactNode
}

const SupabaseProvider: React.FC<supabaseProviderProps>=({children})=>{
    const [supabaseclient]=useState(()=>
    createClientComponentClient<Database>()
)
return (
<SessionContextProvider supabaseClient={supabaseclient}>
    <Sidebar>
    {children}
    </Sidebar>
</SessionContextProvider>
)
}

export default SupabaseProvider;