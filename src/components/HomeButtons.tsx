import { Home } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const HomeButton = ()=>{
    const navigator = useNavigate();
    return(
        <Button onClick={() => {
            navigator("/")
        }}>
            <Typography>
                На главную
            </Typography>
            <Home />
        </Button>
    );
}