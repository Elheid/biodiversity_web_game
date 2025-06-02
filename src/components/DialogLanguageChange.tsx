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

/**
 * Props for the DialogLanguageChange component.
 */
interface DialogLanguageChangeProps {
    myStyle?: object;
    variant?: "default" | "less-back";
}

/**
 * DialogLanguageChange component renders a button that opens a dialog to change the language.
 * It displays the current language and uses LanguageChanger inside the dialog.
 */
export const DialogLanguageChange = ({
    myStyle,
    variant = "default"
}: DialogLanguageChangeProps) => {
    const [open, setOpen] = React.useState(false);

    /**
     * Opens the language change dialog.
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * Closes the language change dialog.
     * Prevents closing on backdrop click.
     * @param event - The synthetic event.
     * @param reason - The reason for closing.
     */
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
                    <DialogTitle>Select language</DialogTitle>
                    <DialogContent sx={{ paddingTop: "30px !important" }}>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <LanguageChanger />
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
