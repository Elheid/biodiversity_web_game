import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { endSession } from "../../api/api";
import axios from "axios";

export const RoundStart = ()=>{
    const nav = useNavigate()
    useEffect(()=>{
        endSession()//end prev session
    },[])

    /**
     * Just a random request to back, to start a new session on start
     */
    const startSessionRequest = ()=>{
        axios.get("/animals/Олень");
    }

    return (
        <Button onClick={()=>{
            startSessionRequest()
            nav("/first-round")
        }}>Start</Button>
    );
}