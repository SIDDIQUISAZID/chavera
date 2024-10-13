import React, { useRef, useState } from 'react'
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as MaximizeIcon } from "../../assets/icons/maximize.svg";
// import useAnimation from '../../hooks/useAnimation';
import useKeyPress from '../../hooks/useKeyPress';
import { twMerge } from 'tailwind-merge'
const Modal = ({ show, onClose, children, closeButton, isWindow, modalClass }: { show: boolean, onClose?: () => void, children: React.ReactNode, closeButton?: React.ReactNode, isWindow?: boolean, modalClass?: string }) => {
    const [isMaximize, setMaximize] = useState(false)
    // const animation1 = useAnimation("linear", 100, 0);
    // const [height, setHeight] = useState(0)
    const dialogRef = useRef<HTMLDivElement>(null);


    const handleWindowStage = () => {
        setMaximize((b) => !b);
    }
    useKeyPress("Escape", () => {
        onClose?.()
    });
    // useEffect(() => {
    //     if (dialogRef.current) {
    //         setHeight(dialogRef.current.clientHeight)
    //     }
    // })

    if (!show) {
        return null;
    }
    return (
        <div ref={dialogRef} className='fixed bg-black/20 w-full   h-screen  left-0 top-0 flex z-50' onClick={onClose}  >
            <div
                className={twMerge(`bg-white m-auto md:p-8 p-4 pt-8  shadow-2xl flex relative  scrollbar-thin scrollbar-track-blue-lightest scrollbar-thumb-blue-dark overflow-auto transition-transform ${isMaximize ? "!h-full !w-full" : "max-h-[calc(100vh-150px)]"} `,modalClass)}
                onClick={(e) => e.stopPropagation()}
            // style={{
            //     marginTop: animation1 * (window.innerHeight / 2) - height / 3
            // }}
            >
                <div className='absolute right-0 top-0'>
                    {isWindow && <button data-testid="window-btn" title={isMaximize ? "Minimize" : 'Maximize'} onClick={handleWindowStage} className={` transition-all p-3 ${isMaximize ? "rotate-180 text-yellow-900 hover:bg-yellow-100" : "text-green-900 hover:bg-green-100"}`}>
                        <MaximizeIcon />
                    </button>}
                    {React.isValidElement(closeButton) ? closeButton : onClose && <button title='Close' data-testid={"close-button"} onClick={onClose} className="hover:bg-red-100 hover:text-red-700 text-gray-800 p-3" >
                        <CrossIcon />
                    </button>}
                </div>
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div >
    )
}

export default Modal