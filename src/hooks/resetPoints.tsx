import { useEffect } from "react"
import { setFirstRoundFromStorage, setSecondRoundFromStorage, useGamePointsContext } from "../context/GamePointsProvider"

export const useResetPoints = ()=>{
    const {setFirstRoundPoints, setSecondRoundPoints}= useGamePointsContext()
    
    useEffect(()=>{
        setFirstRoundFromStorage(0) 
        setSecondRoundFromStorage(0)
        setFirstRoundPoints(0)
        setSecondRoundPoints(0)
    },[])
    return;
}