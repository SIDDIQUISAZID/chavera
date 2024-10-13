import React, { useEffect, useState } from 'react'
import useNetworkStatus from '../../hooks/useNetworkStatus'
import { Id, toast } from 'react-toastify'
import { WifiOffIcon, WifiOnIcon } from '../../assets/icons'

const NetConnection = ({ children }: any) => {
    const [toastId, setToastId] = useState<Id | null>(null);
    const handleCustomOnline = () => {
        if (toastId) {
            toast.update(toastId, {
                render: "You are online",
                type: toast.TYPE.SUCCESS,
                icon: () => {
                    return <WifiOnIcon className='text-blue-dark w-6 h-6' />
                },
                pauseOnFocusLoss: false,
                toastId: toastId,
            });
        } else {
            const SToastId = toast.success("You are online", {
                icon: () => {
                    return <WifiOnIcon className='text-blue-dark w-6 h-6' />
                },
                pauseOnFocusLoss: false,
            });
            setToastId(SToastId)
        }
    }
    const handleCustomOffline = () => {
        if (toastId) {
            toast.update(toastId, {
                render: "You are offline",
                type: toast.TYPE.ERROR,
                icon: () => <WifiOffIcon className='text-blue-dark w-6 h-6' />,
                pauseOnFocusLoss: false,
                toastId: toastId
            });
        } else {
            const EToastId = toast.error("You are offline", {
                icon: () => <WifiOffIcon className='text-blue-dark w-6 h-6' />,
                pauseOnFocusLoss: false,
            });
            setToastId(EToastId);
        }
    }
    useEffect(() => {
        if (toastId) {
            toast.onChange(({ id, status }) => {
                if (id && id === toastId && status === 'removed') {
                    // console.log("Toast is closed");
                    // toastId.current = null;
                    setToastId(null)
                }
            });
        }
    }, [toastId])



    const { isOffline } = useNetworkStatus({ handleCustomOnline, handleCustomOffline }) || {};
    return (
        <>
            {isOffline && <div data-testid="offlineIcon" className='fixed top-0   right-0 z-50 p-2' style={{ zIndex: 51 }} title='Check your internet connection'><WifiOffIcon className='text-blue-dark w-6 h-6' /></div>}
            {children}
        </>
    )
}

export default NetConnection