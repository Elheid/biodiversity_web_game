import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { endSession } from "../../api/api";
import axios from "axios";
import { GameType } from "../../interfaces/rounds";

export const RoundStart = ({roundType}:{roundType : GameType})=>{
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

    const roundStartButton = roundType === GameType.firstType ? "first-round" : "second-round";

    return (
        <Button onClick={()=>{
            startSessionRequest()
            nav(`/${roundStartButton}`)
        }}>Start</Button>
    );
}