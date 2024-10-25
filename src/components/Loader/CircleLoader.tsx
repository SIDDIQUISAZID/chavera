import React from 'react'
import { cn } from '../../utils';

const CircleLoader = (props: React.SVGProps<SVGSVGElement>) => {
    const { className, ...rest } = props;
    return (
        <svg
            data-testid="circle-loader"
            className={cn(`animate-spin -ml-1  h-5 w-5 text-white ${className}`)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...rest}
        >
            <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="#ffffff"
                strokeWidth={4}
            />
            <path
                className="opacity-75"
                fill="#EC1944"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    )
}

export default CircleLoader