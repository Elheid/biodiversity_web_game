import { useEffect, useState } from "react";

export const useMinWidth = (width:number) => {
    const [isMinWidth, setIsMinWidth] = useState(false);
    
    
        useEffect(() => {
        const checkWidth = () => {
            setIsMinWidth(window.innerWidth > width);
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        
        return () => window.removeEventListener('resize', checkWidth);
    }, [width]);
    return { isMinWidth };
}