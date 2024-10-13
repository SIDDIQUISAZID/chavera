import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded(props) {

  console.log(props,'props');
  const handlePageChange = (event, page) => {
    props.setPage(page-1);
  };
 
  return (
    <div
    style = {{display: 'flex', justifyContent: 'flex-end',}}
    >
    <Stack spacing={10}>
      <Pagination
        count={props.totalPage}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        siblingCount={0}
        boundaryCount={1}
        onChange={handlePageChange}
        sx={{
          root: {
            color: "white",
            backgroundColor: "#EC1944",
            // Apply custom styles to the root element
          },
          "& .MuiPaginationItem-root": {
            "&:hover": {
              color : 'white',
              backgroundColor: "#EC1944",
            },
          },
        }}
      />
    </Stack>
    </div>
  );
}
