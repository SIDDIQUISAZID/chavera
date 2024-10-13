export const initialPerPage = 10;
export const initialPage = 1;
export const initialFakeCount = 10;
export const paginationList = [10, 20, 50, 100];
//pagination initial state for table
export const initialPagination = ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  let perPage = Number(searchParams.get("per_page") ?? initialPerPage);
  if (!paginationList.includes(perPage)) {
    perPage = paginationList[0];
  }
  return {
    totalCount: initialFakeCount,
    initialPerPage: perPage,
    initialPage: Number(searchParams.get("page") ?? initialPage),
  };
};
