import React, { ComponentProps, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button'
import Input from './Input'
import { cn } from '../../utils';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const DateRangeSchema = z.object({
    fromDate: z.string().nonempty({ message: "required" }),
    toDate: z.string().nonempty({ message: "required" }),
})
type DateRangeFormType = z.infer<typeof DateRangeSchema>;
// interface DateRangeType extends React.ComponentProps<"div"> {
//     defaultFormValues?: DateRangeFormType,
//     placeholder: string;
//     onSubmit: (data: DateRangeFormType) => void,
//     toMax?: string,
//     popupClass?: string
// }

interface DateRangeType {
    defaultFormValues?: DateRangeFormType;
    placeholder: string;
    name: string;
    onSubmit: (data: DateRangeFormType) => any;
    children?: React.ReactNode | string;
    toMax?: string;
    required?: boolean;
    popupClass?: string;
    divAttr?: ComponentProps<"div">;
}

const DatePicker = ({ name, onSubmit, placeholder, children, defaultFormValues, toMax, popupClass, divAttr, ...props }: DateRangeType) => {
    const dateRangeRef = useRef<HTMLDivElement>(null);
    const [dateRangeModal, setDateRangeModal] = useState(false)
    const { register, watch, handleSubmit, formState: { errors }, clearErrors, reset } = useForm<DateRangeFormType>({
        resolver: zodResolver(DateRangeSchema),
        defaultValues: defaultFormValues
    })
    const fromDate = watch("fromDate");
    const currentDate = useMemo(() => {
        return format(new Date(), "yyyy-MM-dd")
    }, []);
    const onFormSubmit = (data: DateRangeFormType) => {
        onSubmit(data)
        setDateRangeModal(false)
    }
    useOnClickOutside(dateRangeRef, () => {
        setDateRangeModal(false)
    })

    const { className, ...restAttr } = divAttr || {};

    return (
        <div className={cn('relative text-sm w-full', className)} ref={dateRangeRef} {...restAttr} >
            {/* <Button type="button" theme="primary_outline" className="rounded-full w-48 sm:px-3 py-1 h-full border-blue-light "
                onClick={() => {
                    setDateRangeModal((b) => !b)
                    clearErrors()
                }}
            >{placeholder} </Button> */}

            <form onSubmit={
                handleSubmit(onFormSubmit)
            }>

               

                <Input
                    {...register("fromDate")}
                    type="date"
                    placeholder="From Date"
                    className="   px-6 py-[10px] pb-2.5 text-xs font-poppins_cf "
                    wrapperClass="mb-0"
                    max={currentDate}
                    errors={errors}
                    
                >
                    {children && <label
                        htmlFor={name}
                        className="text-theme-black  font-medium font-poppins_cf"
                    >
                        {children}
                        {props?.required && <span className="text-red-600">*</span>}
                        {/* Your E-mail <span className="text-danger">*</span> */}
                    </label>}
                </Input>
            </form>
        </div>
    )
}

export default DatePicker