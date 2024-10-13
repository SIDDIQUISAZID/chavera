import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';

const CustomTableHeaderCell = ({ headCell, orderBy, order, createSortHandler }) => {
  const visuallyHidden = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  };

  return (
    <TableCell
      key={headCell.id}
      padding="none"
      sortDirection={orderBy === headCell.id ? order : false}
      sx={{ fontWeight: 'bold' , paddingLeft: '10px'  }}
      colSpan={headCell.colSpan || 1}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

export default CustomTableHeaderCell;
