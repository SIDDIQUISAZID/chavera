import { forwardRef } from "react";
import { cn } from "../../utils";
import "./input.css"
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type?: React.HTMLInputTypeAttribute;
    errors?: any;
    children?: React.ReactNode | string;
    required?: boolean;
    wrapperClass?: string;
    isLoading?: boolean;
    prefix?: string;
    wrapperAttr?: React.HtmlHTMLAttributes<HTMLDivElement>
}
//reusable input component for form
const Input = forwardRef(
    ({ name, type, errors, children, wrapperClass = "", isLoading, className, prefix, wrapperAttr, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {

        // if (isLoading) {
        //     return <InputLoadin name={name} {...props}>{children}</InputLoadin >
        // }
        return (
            <div {...wrapperAttr} className={cn("mb-3 w-full", wrapperClass)} >
                <div className="relative h-full">
                    {prefix && <div className='text-sm left-4 absolute top-1/2 z-10 -translate-y-1/2 pt-[2px]'>{prefix}</div>}
                    <input
                        {...(ref && { ref })}
                        // ref={ref}
                        {...props}
                        type={type || "text"}
                        id={name}
                        min={new Date().toISOString().split("T")[0]}
                       
                      
                        className={cn("block px-6 py-[12px] pb-2.5 w-full text-xs text-theme-grey bg-transparent rounded-[4px] border  appearance-none dark:text-white border-blue-light dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-dark  bg-white  placeholder:tracking-widest placeholder-gray-light", wrapperAttr)}

                        name={name}
                    />
                    {children && <label
                        htmlFor={name}
                        className="absolute  rounded-2xl font-poppins_cf text-base   font-medium  text-theme-black duration-300 transform -translate-y-4 scale-75 -top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-dark text-blue-dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 -left-2"
                    >
                        {children}
                        {props?.required && <span className="text-red-600">*</span>}
                        {/* Your E-mail <span className="text-danger">*</span> */}
                    </label>}
                    <span className="absolute  left-0 top-10 text-red-600 text-[9px] xs:text-xs">{errors?.[name]?.message}</span>
                </div>
            </div>
        );
    }
);
export default Input