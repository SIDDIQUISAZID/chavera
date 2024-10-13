import React from 'react';
import TableCell from '@mui/material/TableCell';

const CustomTableCell = ({ children, ...props }) => {
  return (
    <TableCell
      className="listTable"
      style={{ fontSize: '12px', color: '#565656' }}
      {...props}
    >
      {children}
    </TableCell>
  );
};

export default CustomTableCell;
