import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import IterationDirectionalData from "../TestResults/IterationDirectionalData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import CustomTableHeaderCell from "../common/CustomTableHeader";
import CustomTableCell from "../common/CustomTableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { visuallyHidden } from "@mui/utils";
import HandlePagination from "../HandlePagination";
import { Api } from "../Api";
import { useSelector, useDispatch } from "react-redux";
import { setOpenCurrentModal } from "../../features/modalManager";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { setOpenCurrentTab } from "../../features/tabManager";

import "../../css/TestCase.css";

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const buttonData = ["Download Log"];

const headCellsiperf = [
  {
    id: "iteration",
    numeric: true,
    disablePadding: false,
    label: "Iteration",
  },
  {
    id: "estTimeInterval",
    numeric: true,
    disablePadding: false,
    label: "Est. Time Interval(sec)",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "reason",
    numeric: true,
    disablePadding: false,
    label: "Response",
  },
  {
    id: "chart",
    numeric: true,
    disablePadding: false,
    label: "Throughput Chart",
  },
  {
    id: "download",
    numeric: true,
    disablePadding: false,
    label: "Download",
  },
];

const headCells = [
  {
    id: "iteration",
    numeric: true,
    disablePadding: false,
    label: "Iteration",
  },
  {
    id: "estTimeInterval",
    numeric: true,
    disablePadding: false,
    label: "Est. Time Interval(sec)",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "reason",
    numeric: true,
    disablePadding: false,
    label: "Response",
  },
  {
    id: "download",
    numeric: true,
    disablePadding: false,
    label: "Download",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    dataByExeId,
  } = props;
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
                color: "#EC1944", // Change color after checkbox is checked
              },
            }}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        {dataByExeId?.testcase?.feature === "THROUGHPUT_IPERF"
          ? headCellsiperf.map((headCell) => (
              <CustomTableHeaderCell
                key={headCell.id}
                headCell={headCell}
                orderBy={orderBy}
                order={order}
                createSortHandler={createSortHandler}
              />
            ))
          : headCells.map((headCell) => (
              <CustomTableHeaderCell
                key={headCell.id}
                headCell={headCell}
                orderBy={orderBy}
                order={order}
                createSortHandler={createSortHandler}
              />
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
  rowCount: PropTypes.number.isRequired,
};

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
              ),
          }),
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
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const SelectedTestCase = useSelector(
    (state) => state.testcaseManager.SelectedTestCase
  );
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [selectedIteratedRow, setSelectIteratedRow] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalData, setTotalData] = React.useState([]);
  const [iperfCase, setIperfCase] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [dataByExeId, setDataExe] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [isfetching, setIsFetching] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isIterationDataSelected, setIsIterationDataSelected] =
    React.useState(false); // New state
  const dispatch = useDispatch();

  const handleButtonClick = (buttonLabel) => {
    const fetchedData = selected.map((index) => {
      const { iteration } = rows[index - 1];
      return { iteration };
    });
    const transformedData = fetchedData.reduce(
      (acc, { iteration }) => {
        acc.iterationId.push(iteration);
        acc.executionId.push(SelectedTestCase.execId);
        acc.testCaseId.push(dataByExeId?.testcase?.testcaseId);

        return acc;
      },
      { testCaseId: [], executionId: [], iterationId: [] }
    );

    if (buttonLabel === "summary") {
      Api.downloadIterationExcel(transformedData);
    } else {
      Api.downloadIterationLogs(transformedData);
    }
    dispatch(setOpenCurrentModal(buttonLabel));
    dispatch(setOpenCurrentModal(buttonLabel));
  };
  const fetchExecutedTestCase = async () => {
    let resId = await Api.getDetailsByExecutionId(SelectedTestCase.execId);
    setDataExe(resId.data);
    let estTimeInterval =
      resId?.data?.testcase?.duration;
    let iperfBitrateUnit = resId?.data?.testcase?.iperf?.bitrateUnit;
    let bitrate = resId?.data?.testcase?.iperf?.bitrate
    let res = await Api.fetchIterationData(
      SelectedTestCase.execId,
      page,
      rowsPerPage
    );
    const processedData =
      res !== undefined &&
      res.data.map((item, index) => ({
        id: page >= 1 ? (page) * 10 + index + 1 : index + 1,
        iteration: item?.iterationId,
        status: item?.status,
        testResult: item?.result,
        estTimeInterval: estTimeInterval,
        iperfBitrateUnit: iperfBitrateUnit,
        bitrate : bitrate
      }));

    const allStatusesPassOrFail = processedData.every(
      (item) => item.status === "Pass" || item.status === "Fail"
    );
    if (allStatusesPassOrFail) setIsFetching(!allStatusesPassOrFail);
    let pageCount = res.totalRecords / rowsPerPage;
    let roundedNumber = parseInt(pageCount);
    if (roundedNumber < 1) {
      roundedNumber = 1;
    } else {
      setTotalPage(roundedNumber);
    }
    console.log("----------------", rows);
    setTotalData(res.totalRecords);
    setRows(processedData);
  };

  React.useEffect(() => {
    console.log(isfetching, rows);
    fetchExecutedTestCase();
    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(() => {
      if (isfetching) {
        fetchExecutedTestCase();
      } else {
        clearInterval(intervalId);
      }
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [isfetching, page]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      setIsIterationDataSelected(newSelected.length > 0);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    setIsIterationDataSelected(newSelected.length > 0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <>
      <div className="tableListHeader">
        <div
          style={{
            margin: "0.8em 0.3em 0em 1em",
            cursor: "pointer",
            color: "rgba(236, 25, 68, 1)",
          }}
          onClick={() => {
            dispatch(setOpenCurrentTab("excutedTestCase"));
          }}
        >
          <ArrowBackOutlinedIcon style={{ fontSize: "20px" }} />
        </div>
        <div className="tableListHeading">
          Iteration List{" "}
          <div style={{ color: "#EC1944" }}>
            (ID :{SelectedTestCase.execId})
          </div>
        </div>

        <div className="buttonContainer">
          {buttonData.map((button) => (
            <Button
              className={
                !isIterationDataSelected
                  ? "headerDisableButtons"
                  : "headerButtons"
              }
              key={button}
              onClick={() => handleButtonClick(button)}
              variant="outlined"
              disabled={!isIterationDataSelected}
            >
              {button}
            </Button>
          ))}
          <Button
            className={
              !isIterationDataSelected ? "headerDisableButtons" : "headerButtons"
            }
            onClick={() => handleButtonClick("summary")}
            variant="outlined"
            disabled={!isIterationDataSelected}
          >
            Download Summary
          </Button>
        </div>
      </div>
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
            dataByExeId={dataByExeId}
          />
          <TableBody>
            {rows && rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  //  hover

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
                        "aria-labelledby": labelId,
                      }}
                      sx={{
                        "&.Mui-checked": {
                          color: "#EC1944", // Change color after checkbox is checked
                        },
                      }}
                    />
                  </TableCell>
                  <CustomTableCell>
                    {`${SelectedTestCase.execId}_${row.iteration}`}
                  </CustomTableCell>
                  <CustomTableCell sx={{ paddingLeft: "80px" }}>
                    {row.estTimeInterval}
                  </CustomTableCell>
                  <CustomTableCell>{row.status}</CustomTableCell>
                  <CustomTableCell>{row.testResult}</CustomTableCell>
                  {dataByExeId?.testcase?.feature === "THROUGHPUT_IPERF" && (
                    <CustomTableCell>
                      <button
                        className="actionButtons"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setIperfCase(true);
                          setSelectIteratedRow(row);
                        }}
                      >
                        <Tooltip title="Throughput Chart">
                          <ShowChartIcon className="actionIcon" />
                        </Tooltip>
                      </button>
                    </CustomTableCell>
                  )}
                  <CustomTableCell>
                    <button
                      className="actionButtons"
                      onClick={(e) => {
                        console.log(dataByExeId, SelectedTestCase);
                        e.stopPropagation();
                        e.preventDefault();
                        let body = {
                          iterationId: [row.iteration],
                          executionId: [SelectedTestCase.execId],
                          testCaseId: [dataByExeId?.testcase?.testcaseId],
                        };
                        Api.downloadIterationLogs(body);
                      }}
                    >
                      <Tooltip title="Download Logs">
                        <FileDownloadOutlinedIcon className="actionIcon" />
                      </Tooltip>
                    </button>
                  </CustomTableCell>
                </TableRow>
              );
            })}
            {/* {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </div>

      <HandlePagination
        count={totalData}
        rowsPerPage={rowsPerPage}
        page={page}
        setPage={(val) => {
          setPage(val);
        }}
        totalPage={totalPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {iperfCase && (
        <IterationDirectionalData
          selectedIteratedRow={selectedIteratedRow}
          selectedExecuId={SelectedTestCase.execId}
          testCaseDetails={dataByExeId.testcase}
        />
      )}
    </>
  );
}
