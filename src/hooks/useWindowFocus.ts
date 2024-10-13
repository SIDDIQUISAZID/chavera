import { useState, useEffect } from 'react';

const useWindowFocus = ({ onFocus, onBlur, }: { onFocus?: () => void, onBlur?: () => void }): boolean => {
    const [isFocused, setIsFocused] = useState<boolean>(true);

    const handleFocus = (): void => {
        onFocus?.();
        setIsFocused(true);
    };

    const handleBlur = (): void => {
        onBlur?.();
        setIsFocused(false);
    };

    useEffect(() => {
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    return isFocused;
};
export default useWindowFocus;
