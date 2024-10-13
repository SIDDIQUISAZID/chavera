import React, { HTMLAttributes } from 'react'
import PulseLoader from './PulseLoader'
import { twMerge } from 'tailwind-merge';
interface PageLoaderType {
    containerAttr?: React.ComponentProps<"div">;
    loaderAttr?: React.ComponentProps<"div">
    loaderColor?: string;
}
const PageLoader = (props: PageLoaderType) => {
    const { containerAttr, loaderAttr, loaderColor } = props;
    const { className: containerClass, ...restContainer } = containerAttr || {};
    const { className: loaderClass, style: loaderStyle, ...restLoader } = loaderAttr || {};

    const pulseLoadersStyle = {
        '--pulse-color': loaderColor || "#fff",
    } as HTMLAttributes<"className">;
    return (
        <div className={twMerge(`bg-coral flex w-full h-full justify-center items-center`, containerClass)} {...restContainer} >
            <h1 className='text-white'>
                <PulseLoader className={twMerge('bg-white', loaderClass)} style={{ ...pulseLoadersStyle, ...loaderStyle }} {...restLoader} />
            </h1>
        </div>
    )
}

export default PageLoader