import React, { ComponentProps, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { IcSearch } from '../../assets/icons';
import { useSearchParams } from 'react-router-dom';
import { cn } from "../../utils";


import { consecutiveSpaces } from '../../utils';
type SearchInputProps = {
    setSearchName: React.Dispatch<React.SetStateAction<string>>,
    searchName: string, inputProps?: ComponentProps<"input">,
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
    placeholder?: string,
    wrapperAttr?: React.HtmlHTMLAttributes<HTMLDivElement>
}
const FILTER = "q"
const SearchInput = ({ searchName, setSearchName, inputProps, onSubmit, placeholder, wrapperAttr }: SearchInputProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSearch, setCurrentSearch] = useState(searchName);

    return (
        <form
            className="relative flex"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                // console.log("form submitted", e.currentTarget.searchName.value)
                const name = e.currentTarget.searchName.value
                setSearchName(name);
                onSubmit?.(e)
                if (name) {
                    searchParams.set(FILTER, name);
                } else {
                    searchParams.delete(FILTER);
                }
                setSearchParams(searchParams, { replace: true });
            }}
        >
            <input

                placeholder={placeholder}
                type="text"
                id="searchName"


                className={cn("block px-4 py-[12px] pb-2.5 w-[250px] text-xs text-theme-black rounded-[4px] border appearance-none dark:text-white border-[theme-border dark:border-theme-border dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-dark bg-white  placeholder:text-blue-dark  pr-12", wrapperAttr)}
                name="searchName"

                {...inputProps}

                value={currentSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.trimStart();
                    if (!consecutiveSpaces(value)) {
                        setCurrentSearch(value)
                    }
                }}
            />
            {searchName && <button
                type="reset"
                onClick={() => {
                    setSearchName("");
                    setCurrentSearch("");
                    searchParams.delete(FILTER);
                    setSearchParams(searchParams);
                }}
                title='clear'
                className='absolute p-1 px-2 right-6 top-1/2 pt-2 -translate-y-1/2 rounded-full z-10'>
                <AiOutlineClose />
            </button>}
            <button
                className="absolute p-2 px-3  right-0 top-1/2 -translate-y-1/2 rounded-full "
                title="search"
            >
                <IcSearch className="text-blue-dark " />
            </button>
        </form>
    )
}

export default SearchInput