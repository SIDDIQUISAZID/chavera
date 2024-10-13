import { useState } from "react";
// ImgHTMLAttributes<HTMLImageElement>
interface ImagIeFallbackI extends React.ComponentProps<"img"> {
    fallbackIcon: React.ReactElement
    src?: string;
}
const ImageFallback = (props: ImagIeFallbackI) => {
    const { fallbackIcon:Fallback, src, ...imgProps } = props;
    const [isError, setError] = useState(false);
    if (isError || !src) {
        return Fallback
    }
    return <img alt="" src={src} {...imgProps} onError={(e) => {
        setError(true)
    }} />
}
export default ImageFallback