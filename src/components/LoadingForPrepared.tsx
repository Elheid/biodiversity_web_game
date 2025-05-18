import { ReactNode, useEffect, useState } from "react"
import { Loading } from "./Loading"

export interface LoadingForPreparedWithChildrenProps {
    isLoading:boolean;
    haveRounds?:boolean;
    children?: ReactNode;
}
export const LoadingForPreparedWithChildren = 
({children, isLoading, haveRounds = false}:LoadingForPreparedWithChildrenProps)=>{
    const [isRoundPrepared, setIsPrepared] = useState(false)
        useEffect(()=>{
            const onRoundStart = ()=>{
                setIsPrepared(true)
            }
            const onRoundEnd = ()=>{
                setIsPrepared(false)
            }
            window.addEventListener("round-start", onRoundStart);
            window.addEventListener("round-end", onRoundEnd);
            if(!haveRounds) setIsPrepared(true)
            return () => {
                window.removeEventListener("round-start", onRoundStart);
                window.removeEventListener("round-end", onRoundEnd);
            }
        },[])
    return (
        <>
            <Loading sx={{display:`${isLoading || !isRoundPrepared ? "block" : "none"}`}} />
            <div style={{opacity:`${(isLoading || !isRoundPrepared) ? "0.25" : "1"}`}}>
            {children}
            </div>
        </>
        
    )
}