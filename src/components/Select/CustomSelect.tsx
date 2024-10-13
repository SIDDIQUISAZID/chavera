import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx";
import { DropDownIcon } from "../../assets/icons";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useDebounce from "../../hooks/useDebounce";
import { cn } from "../../utils";
export type SelectOption<ValueType = string | number> = {
    label: string
    value: ValueType
}
export type SelectedOption<T = string | number> = SelectOption<T> | undefined

type MultipleSelectProps<T> = {
    multiple: true
    value: SelectOption<T>[]
    onChange: (value: SelectOption<T>[]) => void
}

type SingleSelectProps<T = string | number> = {} & {
    multiple?: false
    value?: SelectOption<T>
    onChange: (value: SelectedOption<T>) => void
} | {
    multiple?: false
    value?: SelectOption<T>
    onChange: (value: SelectedOption<T>) => void
}

interface SelectPropsI<T> {
    customIcon?: React.ComponentType;
    options: SelectOption<T>[]
    placeholder?: string;
    labelKey?: string
    wrapperAttr?: React.HTMLAttributes<HTMLDivElement>,
    customListItem?: ({ label, isActive }: { label: string, isActive?: boolean }) => ReactNode,
    searchable?: boolean;
    clearable?: boolean;
    customLabel?: React.ReactNode;
    labelAttr?: React.HTMLAttributes<HTMLDivElement>
    isLoading?: boolean;
    required?: boolean;
    searchTest?: (v: string) => boolean;
    listWrapperClass?: string;
}
type SelectProps<T> = SelectPropsI<T> & (SingleSelectProps<T> | MultipleSelectProps<T>)
function Capsules<T>({ value, selectOption }: { value: SelectOption<T>[], selectOption: (option: SelectOption<T>) => void }) {
    return <>
        {value?.length === 0 ? "Select..." : value.map((v, i) => (
            <button
                key={i}
                onClick={e => {
                    e.stopPropagation()
                    selectOption(v)
                }}
                // className={styles["option-badge"]}
                className="flex font-poppins_cf items-center gap-[0.25em] cursor-pointer px-[0.25em] py-[0.15em] rounded-[2px] border border-solid border-gray-dark bg-transparent outline-none hover:bg-red-100 hover:text-red-700 hover:border-red-700"
            >
                {v.label}
                <span className={"text-[1.25em] text-[#777]"}>&times;</span>
            </button>

        ))
        }
    </>
}

function Select<T>(props: SelectProps<T>) {
    const { multiple, value, onChange, options, placeholder, wrapperAttr, customListItem, searchable, clearable, customLabel, labelAttr, isLoading, searchTest, customIcon: CaretIcon, listWrapperClass } = props
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const [searchTerm, setSearchTerm] = useState("");

    const { className: wrapperClassName, ...restWrapperAttr } = wrapperAttr || {};

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (!searchTest || (typeof searchTest === "function" && searchTest(inputValue))) {
            setSearchTerm(inputValue);
        }
        // if (!searchRegex) {
        //     setSearchTerm(inputValue)
        //     // console.log("noraml")
        // } else if (!searchRegex.test(inputValue)) {
        //     setSearchTerm(inputValue)
        // }
    }
    const queryTerm = useDebounce(searchTerm, 300)

    const selectOption = useCallback((option: SelectOption<T>) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
    }, [multiple, onChange, value])

    function isOptionSelected(option: SelectOption<T>) {
        return multiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const containerRefVal = containerRef.current
        const handler = (e: KeyboardEvent) => {
            if (e.target !== containerRefVal) return
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }

                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                }
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        containerRefVal?.addEventListener("keydown", handler)

        return () => {
            containerRefVal?.removeEventListener("keydown", handler)
        }
    }, [isOpen, highlightedIndex, options, selectOption])

    useOnClickOutside(containerRef, () => setIsOpen(false))
    return (
        <div
            data-testid="select-wrapper"
            ref={containerRef}
            // onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            // onClick={() => setIsOpen(true)}
            tabIndex={0}
            className={cn("relative w-full min-h-[2.5em] flex items-center gap-[0.5em]  px-3  bg-white border-[1px] border-solid border-theme-border focus:border-blue-dark outline-none rounded-[4px]", wrapperClassName)}
            {...restWrapperAttr}
        // {...props}
        >

            {/* <div
                // htmlFor="email-address-icon"
                className="absolute bg-white px-2 -top-2 sm:bottom-14 left-3 block mb-2 font-medium text-blue-dark text-xs"
            > */}
            {customLabel && <div className=" absolute -top-5 text-xs font-poppins_w  px-2 rounded-full text-theme-black -left-2" {...labelAttr}>
                {customLabel}
                {props?.required && <span className="text-red-600">*</span>}
            </div>}
            {/* </div> */}
            {isLoading ? <span className=" bg-gray-200  rounded-full h-4 grow flex gap-[0.5em] flex-wrap whitespace-nowrap text-ellipsis overflow-hidden w-full animate-pulse" /> :
                <span className={"grow flex gap-[0.5em] flex-wrap whitespace-nowrap text-ellipsis overflow-auto scrollbar-none w-full"}>
                    {multiple
                        ? <Capsules value={value} selectOption={selectOption} />
                        : value === undefined ? <div className="text-blue-dark text-xs text-theme-grey font-poppins_cf">{placeholder || "Select"}</div> : customListItem?.({ label: value.label }) || <div className=" text-xs text-theme-black" title={value.label}
                        >{value.label}</div>}
                </span>}
            {clearable && value &&
                <button
                    onClick={e => {
                        e.stopPropagation()
                        clearOptions()
                    }}
                    className={"text-[#777] cursor-pointer text-[1.25em] p-0 border-[none]"}
                // className={"text-[#777] cursor-pointer text-[1.25em]  text-base border-[none] bg-white rounded-full  hover:bg-gray-100 w-4 h-4 pb-[2px]  flex justify-center items-center "}
                // title={`Clear ${placeholder}`}
                >
                    &times;
                </button>
            }
            {/* <div className={"bg-[#777] self-stretch w-[0.05em]"}></div> */}
            {/* <div className={"border-t-[#777] border-[0.25em] border-solid border-transparent translate-x-0 translate-y-[20%]"}></div> */}
            {/* <ArrowBottomIcon className={clsx("transition-all text-gray-dark", {
                "rotate-180": isOpen
            })} /> */}
            {CaretIcon ? <CaretIcon /> : <div className="pt-1"><DropDownIcon /></div>}
            {!isLoading && <ul
                onClick={(e) => e.stopPropagation()}
                className={cn(`absolute hidden max-h-[10em] overflow-y-auto w-full bg-[white] z-[100] m-0 p-0 rounded-[0.25em] border border-blue-dark/50 left-0 top-[calc(100%_+_0.25em)] text-sm `, {
                    "!block": isOpen
                }, listWrapperClass)}
            >
                {searchable && <li
                    className={`cursor-pointer px-[0.5em] py-[0.25em] font-poppins_cf  text-theme-grey flex items-center  `}
                >
                    <input type="text" placeholder={placeholder ? `Search ${placeholder}` : "Search"} className="w-full h-full border-theme-grey  text-theme-grey" onChange={handleSearch} value={searchTerm} />
                </li>}
                {options.filter((op) => op.label?.toLowerCase().includes(queryTerm?.toLowerCase())).map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={`${option.value}${index}`}
                        className={clsx(`cursor-pointer px-[0.5em] py-[0.25em] font-poppins_cf text-xs  text-theme-black text-left`, {
                            "bg-blue-lightest": index === highlightedIndex,
                            "!bg-blue-dark !text-theme-dark": isOptionSelected(option),
                        })}

                    >
                        {customListItem?.({ label: option.label, isActive: isOptionSelected(option) }) || option.label}
                    </li>
                ))}
            </ul>}

        </div>
    )
}
export default Select;