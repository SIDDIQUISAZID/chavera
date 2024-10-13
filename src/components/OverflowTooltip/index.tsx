import React, { useRef } from 'react'
import { useIsOverflow } from '../../hooks/useIsOverflow';


interface OverflowTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string,
    tooltipProps?: React.ComponentProps<"div">;
    tooltip?: string
    // as?: Tags;
}
//if text get truncated then it will show tooltip
const OverflowTooltip = ({ text, tooltip, tooltipProps, ...divProps }: OverflowTooltipProps) => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const isOverflow = useIsOverflow(textRef)
    const tooltipConfig: React.ComponentProps<"div"> = {
        "data-tooltip-id": "my-tooltip",
        "data-tooltip-content": tooltip ? tooltip : text,
        ...tooltipProps
    }
    // const Tag = as && allowedTags.includes(as) ? as : 'div';
    return (
        <div ref={textRef} {...divProps} {...(isOverflow && tooltipConfig)}>
            {text}
        </div>
    )
}

export default OverflowTooltip