import React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import GetAppIcon from "@mui/icons-material/GetApp"; // Import the GetAppIcon component
import { useSelector, useDispatch } from "react-redux";
import { setOpenCurrentModal } from "../../features/modalManager";
import DeleteDevice from "../DeviceDetails/DeleteDevice";
import { setOpenCurrentTab } from "../../features/tabManager";
import TestCaseAdd from "../TestCaseDetails/TestCasesAdd";

function createData(
  id,
  testCaseId,
  testCaseName,
  categoryName,
  timestamp,
  status,
  downloadLogs,
  reason
) {
  return {
    id,
    testCaseId,
    testCaseName,
    categoryName,
    timestamp,
    status,
    downloadLogs,
    reason
  };
}

const rows = [
  createData(
    1,
    "TC001",
    "Sample Test Case 1",
    "Category 1",
    new Date(),
    "In Progress"
  ),
  // Add more data...
];

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "S.No", sort: true },
  {
    id: "testCaseId",
    numeric: false,
    disablePadding: true,
    label: "Test Case Id",
    sort: true
  },
  {
    id: "testCaseName",
    numeric: true,
    disablePadding: false,
    label: "TestCaseName"
  },
  {
    id: "categoryName",
    numeric: true,
    disablePadding: false,
    label: "Category Name"
  },
  {
    id: "timestamp",
    numeric: true,
    disablePadding: false,
    label: "Timestamp"
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Execution Status"
  },
  {
    id: "logs",
    numeric: true,
    disablePadding: false,
    label: "Download Logs"
  },
  {
    id: "reason",
    numeric: true,
    disablePadding: false,
    label: "Reason"
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ background: "rgb(240, 237, 237)" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#EC1944"
              }
            }}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
            colSpan={headCell.colSpan || 1}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  if (numSelected > 0)
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              )
          })
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>

        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function TestList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const currentModal = useSelector((state) => state.activeModal.currentModal);
  const currentTab = useSelector((state) => state.activeTab.currentTab);
  const dispatch = useDispatch();

  const handleButtonClick = (buttonLabel) => {
    dispatch(setOpenCurrentModal(buttonLabel));
  };

  const handleAddTestCaseClick = (tabLabel) => {
    dispatch(setOpenCurrentTab(tabLabel));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <div>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                const cellData = [
                  { value: row.id, id: labelId, padding: "none" },
                  { value: row.testCaseId, id: labelId, padding: "none" },
                  { value: row.testCaseName },
                  { value: row.categoryName },
                  { value: row.timestamp.toLocaleString() }, // Format timestamp
                  { value: row.status },
                  { value: <GetAppIcon /> }, // Download Logs with icon
                  { value: row.reason }
                ];

                return (
                  <TableRow
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#EC1944"
                          }
                        }}
                      />
                    </TableCell>
                    {cellData.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        component="th"
                        id={cell.id}
                        scope={cellIndex === 0 ? "row" : null}
                        padding={cell.padding}
                        className="listTable"
                      >
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          shape="rounded"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {currentModal === "Delete Device" && <DeleteDevice />}
      {currentTab === "testCreate" && <TestCaseAdd />}
    </Box>
  );
}
