import { Alert, Container, Typography } from '@mui/material';
import React from 'react';
import { HomeButton } from '../HomeButtons';

export const NotFound: React.FC = () => {
    return (
        <Container style={{ textAlign: 'center', display:"grid", gap:"4vh"}}>
            <Alert icon={false} color="error" sx={{justifyContent:"center"}}>
                <Typography variant='h5' >404 - Page Not Found</Typography>
            </Alert>
            <Typography>The page you are looking for does not exist.</Typography>
            <HomeButton></HomeButton>
        </Container>
    );
};
