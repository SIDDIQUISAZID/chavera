import React, { } from 'react'
import "./index.scss"
const PulseLoader = (props: React.HTMLAttributes<HTMLDivElement>) => {
    const { className, ...rest } = props;
    return (
        <div className={`dot-pulse ${className}`} {...rest} />
    )
}

export default PulseLoader