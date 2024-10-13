import { useState } from "react";

const useMultiStep = ({
  totalCount,
  initialPage,
  initialPerPage,
}: {
  totalCount: number;
  initialPage?: number;
  initialPerPage?: number;
}) => {
  const [page, setPage] = useState(initialPage || 1);
  const [perPage, setPerPage] = useState(initialPerPage || 15);
  const [totalDataCount,setTotalDataCount]=useState(totalCount);
  const goNext = () => {
    if (page <= Math.ceil(totalDataCount / perPage)) {
      setPage((curPage) => curPage + 1);
    }
  };
  const goPrev = () => {
    if (page > 1) {
      setPage((curPage) => curPage - 1);
    }
  };
  function goTo(index: number) {
    setPage(index);
  }

  return {
    page,
    setPage,
    lastPage: Math.ceil(totalDataCount / perPage) || 1,
    perPage,
    setPerPage,
    goTo,
    goPrev,
    goNext,
    canNext: page < Math.ceil(totalDataCount / perPage),
    canPrev: page > 1,
    totalDataCount,
    setTotalDataCount
  };
};

export default useMultiStep;
