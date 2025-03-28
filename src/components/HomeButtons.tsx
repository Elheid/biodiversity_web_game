import { Home } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { HOME_BUTTON_TEXT } from "../config";

export const HomeButton = ()=>{
    const navigator = useNavigate();
    return(
        <Button onClick={() => {
            navigator("/")
        }}>
            <Typography>
                {HOME_BUTTON_TEXT}
            </Typography>
            <Home />
        </Button>
    );
}