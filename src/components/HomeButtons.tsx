import { Home } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import { useTextLang } from "../hooks/useTextLang";

export const HomeButton = ()=>{
    const navigator = useNavigate();
    const { text:HOME_BUTTON_TEXT } = useTextLang('HOME_BUTTON_TEXT');
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