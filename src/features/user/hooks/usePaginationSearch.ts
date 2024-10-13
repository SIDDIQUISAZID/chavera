import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { paginationList } from '../utils/pagination';

const usePaginationSearch = ({ perPage, page }: { perPage: number, page: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        searchParams.set("page", page?.toString());
        if (paginationList.includes(perPage)) {
            searchParams.set("per_page", perPage?.toString());
        } else {
            searchParams.set("per_page", paginationList[0]?.toString());
        }
        setSearchParams(searchParams,{replace:true})
    }, [page, perPage])
}

export default usePaginationSearch