import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils';
const themeConfig = {
    primary: "bg-theme-dark hover:bg-theme-dark/90 text-white",
    secondary: "bg-coral hover:bg-coral/90 text-white",
    primary_outline: "border border-blue-dark text-blue-dark hover:bg-blue-lightest rounded",
    secondary_outline: "border border-coral text-coral hover:bg-coral/10 rounded"
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    theme?: keyof typeof themeConfig
}

const Button = ({ children, className, theme, ...buttonProps }: ButtonProps) => {
    return (
        <button
            {...buttonProps}
            className={cn(theme ? themeConfig[theme] : "", "flex justify-around items-center px-3 sm:px-6 disabled:opacity-50", className)} >
            {children}
        </button>
    )
}

export default Button