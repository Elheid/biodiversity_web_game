import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { endSession } from "../../api/api";

export const RoundStart = ()=>{
    const nav = useNavigate()
        useEffect(()=>{
            endSession()//end prev session
        },[])

    return (
        <Button onClick={()=>nav("/first-round")}>Start</Button>
    );
}