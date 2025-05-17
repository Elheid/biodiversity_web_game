import { CircularProgress, CircularProgressProps } from "@mui/material"

export const Loading = (props: CircularProgressProps) => {
    return (
        <div style={{
            position:"absolute",
            width:"fit-content",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 50%)"
        }}>
            <CircularProgress {...props}></CircularProgress>
        </div>
    )
}