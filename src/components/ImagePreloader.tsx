// Preloader.js
import { useEffect } from 'react';

import background from "../assets/img/background.png";

import backgroundTiger from '../assets/img/backgroundTiger.jpg';
import backgroundMain from '/src/assets/img/backgroundMain.png';
import backgroundRound1 from '../assets/img/backgroundRoundStart1_2.png';
import backgroundRound2 from '../assets/img/backgroundRoundStart2_2.png';
import backgroundEnd from '../assets/img/endBack.png';


const preloadImages = (urls:string[]) => {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

const ImagePreloader = () => {
    useEffect(() => {
        const imageUrls = [
            //'/src/assets/img/background.png',
            background,
            backgroundTiger,
            backgroundMain,
            backgroundRound1,
            backgroundRound2,
            backgroundEnd,
            /*'/src/assets/img/backgroundTiger.jpg',
            '/src/assets/img/backgroundMain.png',
            '/src/assets/img/backgroundRoundStart1_2.png',
            '/src/assets/img/backgroundRoundStart2_2.png',
            '/src/assets/img/endBack.png'*/
        ];

        preloadImages(imageUrls);
    }, []);

    return null;
};

export default ImagePreloader;