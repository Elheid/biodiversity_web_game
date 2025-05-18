import { useMinWidth } from "../hooks/useMinWidth"

export interface AnimalImageProps {
    minWidthToHide:number;
    img:string;
    className?:string;
    alt?:string;
    imageStyle?:object;
}

export const AnimalImage = ({minWidthToHide, img, imageStyle, alt, className}:AnimalImageProps)=>{
    const {isMinWidth : isMinWidth} = useMinWidth(minWidthToHide)
    return (
        <>
        {isMinWidth && <img className={className} style={imageStyle} src={img} alt={alt} /> /*меньше 900*/}
        </>
    )
}