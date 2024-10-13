import { useRef } from 'react'
import { Tooltip  } from "react-tooltip";
import useTooltipStatus from './useTooltipStatus';

import { useIsMobileTouch } from '../../hooks/useIsMobile';
// interface AppTooltipProps extends React.ComponentProps<"div"> {
//     // isOpen?: boolean
//     // setIsOpen?: (value: boolean) => void
//     afterHide?: (() => void)
// }
const AppTooltip = () => {
    const divRef = useRef(null);
    // const handleHide = () => {
    //     if (divRef.current) {
    //         divRef.current.focus();
    //         divRef.current.click();
    //         console.log("clicked")
    //     }
    //     // console.log("Hide")
    //     //     // @ts-ignore
    //     //     document.activeElement?.blur?.();
    //     //     document.body.focus()
    // }
    return (
        <>
            <div ref={divRef} />
            <ReactTooltip id="my-tooltip"
                className='text-xs z-50 bg-blue-dark opacity-100'
            // afterHide={handleHide}

            />
            <ReactTooltip id='multiline-tooltip'
                className='text-xs z-50 bg-blue-dark opacity-100  w-[calc(100vw-50px)] max-w-sm sm:w-auto m-auto  h-max'
            // afterHide={handleHide}
            />
        </>
    )
}
const ReactTooltip = (props) => {
    const { id, ...rest } = props;
    const { isOpen, setIsOpen } = useTooltipStatus(id);
    const isMobile = useIsMobileTouch()
    return (
        <Tooltip
            id={id}
            isOpen={isOpen === id}
            setIsOpen={setIsOpen}
            {...rest}
            clickable={isMobile}
        />
    )
}

export default AppTooltip