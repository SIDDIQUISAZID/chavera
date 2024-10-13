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
    onSubmit: (data: DateRangeFormType) => any;
    toMax?: string;
    popupClass?: string;
    divAttr?: ComponentProps<"div">;
}

const DateRange = ({ onSubmit, placeholder, defaultFormValues, toMax, popupClass, divAttr }: DateRangeType) => {
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
        <div className={cn('relative text-sm', className)} ref={dateRangeRef} {...restAttr}>
            <Button type="button" theme="primary_outline" className="rounded-full w-48 sm:px-3 py-1 h-full border-blue-light "
                onClick={() => {
                    setDateRangeModal((b) => !b)
                    clearErrors()
                }}
            >{placeholder} </Button>

            <form onSubmit={
                handleSubmit(onFormSubmit)
            }>

                <div
                    className={cn("absolute top-full z-10 bg-white px-3 py-4 border shadow-md mt-1 hidden", {
                        "block": dateRangeModal
                    }, popupClass)}
                >
                    <div className="flex gap-2">
                        <Input
                            {...register("fromDate")}
                            type="date"
                            placeholder="From Date"
                            className=" h-8 px-4"
                            wrapperClass="mb-0"
                            max={currentDate}
                            errors={errors}
                        >
                            From
                        </Input>
                        <Input
                            {...register("toDate")}
                            type="date"
                            placeholder="To Date"
                            className="h-8 px-4"
                            wrapperClass="mb-0"
                            max={typeof toMax === "string" ? toMax : currentDate}
                            min={fromDate}
                            errors={errors}

                        >
                            To
                        </Input>
                        <Button type='submit' theme="primary" className="rounded-full">Submit</Button>
                        <Button type="button" theme="secondary" className="rounded-full" onClick={() => {
                            reset({ fromDate: "", toDate: "" })
                            onSubmit({ fromDate: "", toDate: "" })
                            setDateRangeModal(false)
                        }}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DateRange