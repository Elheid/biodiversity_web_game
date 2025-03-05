
// hooks/useFullscreen.ts
import { useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Button } from '@mui/material';

export const useFullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const fullscreenStyle = isFullscreen
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: 'white',
        }
        : {};

    const FullscreenButton = () => (
        <Button
            onClick={toggleFullscreen}
            style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 10000,
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                padding: 4,
            }}
        >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
    );

    return { isFullscreen, toggleFullscreen, fullscreenStyle, FullscreenButton };
};
