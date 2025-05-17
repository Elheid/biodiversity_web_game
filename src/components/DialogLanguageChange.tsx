import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { LanguageChanger } from './LanguageChanger';
import { Container, Typography } from '@mui/material';
import { useLanguageContext } from '../context/LanguageProvider';

export const DialogLanguageChange = ({
    myStyle,
    variant = "default"
}: {
    myStyle?: object;
    variant?: "default" | "less-back";
}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (event && reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const { language } = useLanguageContext();


    return (
        <Container
            className={variant === "default" ? "description-container" : undefined}
            sx={{ marginBottom: "8vh", ...myStyle }}
        >
            <div className={
                variant === "default"
                    ? "lang-container"
                    : "container-less-back"
            }>
                <Typography>{language}</Typography>
                <Button variant='outlined' sx={{ color: "white" }} onClick={handleClickOpen}>
                    Change language
                </Button>

                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle >Select language</DialogTitle>
                    <DialogContent sx={{ paddingTop: "30px !important" }}>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <LanguageChanger></LanguageChanger>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>

            </div>
        </Container>
    );
};