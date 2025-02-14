"use client"

import { useEffect, useState } from "react"
import Model from "@/components/model";
import AuthModel from "@/components/authModel";
const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <>
          <AuthModel/>
        </>
    )
}

export default ModelProvider;