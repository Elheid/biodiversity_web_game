import { useMinWidth } from "../hooks/useMinWidth"

/**
 * Props for the AnimalImage component.
 * @property minWidthToHide - The minimum screen width at which the image should be shown.
 * @property img - The source URL of the image to display.
 * @property className - Optional CSS class name(s) to apply to the image.
 * @property alt - Optional alt text for the image.
 * @property imageStyle - Optional inline styles to apply to the image.
 */
export interface AnimalImageProps {
    minWidthToHide:number;
    img:string;
    className?:string;
    alt?:string;
    imageStyle?:object;
}

/**
 * AnimalImage component conditionally renders an image based on the screen width.
 * It uses the custom hook useMinWidth to determine if the current screen width
 * is greater than or equal to the specified minWidthToHide prop.
 * 
 * @param props - AnimalImageProps
 * @returns JSX.Element or null
 */
export const AnimalImage = ({minWidthToHide, img, imageStyle, alt, className}:AnimalImageProps)=>{
    // Determine if the screen width is at least minWidthToHide
    const {isMinWidth : isMinWidth} = useMinWidth(minWidthToHide)

    return (
        <>
        {/* Render the image only if the screen width is at least minWidthToHide */}
        {isMinWidth && <img className={className} style={imageStyle} src={img} alt={alt} />}
        </>
    )
}
