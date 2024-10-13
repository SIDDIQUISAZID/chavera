import { useCallback, useState } from "react";
import { SelectOption, SelectedOption } from "../Select";
import useDebounce from "../../hooks/useDebounce";
import Input, { InputProps } from "./Input";
import { cn } from "../../utils";
type SingleComboboxProps<T> = {
    label?: string;
    isActive?: boolean;
    options: SelectOption<T>[];
    value?: SelectOption<T>
    onSelect: (value: SelectedOption<T>) => void;
    customListItem?: ({ label, isActive }: { label: string, isActive?: boolean }) => React.ReactNode,
}

type ComboboxProps<T> = Omit<InputProps, "children"> & SingleComboboxProps<T>
const Combobox = <T,>({ label, options, onSelect, value, customListItem, ...inputProps }: ComboboxProps<T>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [searchTerm, setSearchTerm] = useState("");

    const queryTerm = useDebounce(searchTerm, 300)


    const selectOption = useCallback((option: SelectOption<T>) => {
        // if (multiple) {
        //     if (value.includes(option)) {
        //         onChange(value.filter(o => o !== option))
        //     } else {
        //         onChange([...value, option])
        //     }
        // } else {
        if (option !== value) onSelect(option)
        // }
    }, [onSelect, value])
    function isOptionSelected(option: SelectOption<T>) {
        return option === value
    }
    return <div className='relative'>
        <Input
            {...inputProps}
            onFocus={() => {
                setIsOpen(true)
            }}
            onBlur={() => {
                setIsOpen(false)
            }}
        >
            {label}
        </Input>
        <ul onClick={(e) => e.stopPropagation()} className={cn(`absolute hidden max-h-[7em] overflow-y-auto w-full bg-[white] z-[100] m-0 p-0 rounded-[0.25em] border border-blue-dark/50 left-0 
        top-[calc(100%)] text-sm `, {
            "!block": isOpen
        })}>
            {options.filter((op) => op.label?.toLowerCase().includes(queryTerm?.toLowerCase())).map((option, index) => (
                <li
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    key={`${option.value}${index}`}
                    className={cn(`cursor-pointer px-[0.5em] py-[0.25em]`, {
                        "bg-blue-lightest": index === highlightedIndex,
                        "!bg-blue-dark !text-white": isOptionSelected(option),
                    })}
                //  ${isOptionSelected(option) ? styles.selected : ""
                //     } ${index === highlightedIndex ? styles.highlighted : ""}`}
                >
                    {customListItem?.({ label: option.label, isActive: isOptionSelected(option) }) || option.label}
                </li>
            ))}
        </ul>
    </div>
}
export default Combobox