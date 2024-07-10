"use client"

import { useEffect, useState } from "react"
import Model from "@/components/model";
const ModelProvider=()=>{
    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
  return(
       <>
    <Model title="Test model" description="test desc" 
    isOpen
    onChange={()=>{}}>
        Test children
        </Model>
        </>
  )
}

export default ModelProvider;