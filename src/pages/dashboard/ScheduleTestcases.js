import { useState, useMemo } from "react";

import { userdata } from "../../components/userdata";
import { AppTable } from "../../components/Table";
import { TableContainer } from "@mui/material";

import { IC_STATUS } from "../../assets/icons";

import {
  IC_Player,
  Ic_Action
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  initialPagination,
} from "../../features/user/utils/pagination";

const ScheduleTestcases = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


 

  const [openModal, setModal] = useState(false);
  const [openModalCreateBucket, setModalCreateBucket] = useState(false);
  const [openModalAssignBucket, setModalAssignBucket] = useState(false);
  const [openModalTestCase, setModalTestCase] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [openModalImport, setModalImport] = useState(false);

  const [isFetching, setFetching] = useState(false);

  const {
    page,
    setPage,
    perPage,
    setPerPage,
    lastPage,
    goNext,
    goPrev,
    canNext,
    canPrev,
  } = useMultiStep(initialPagination({ searchParams }));

  const [selectedItems, setSelectedItems] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState(userdata);

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2 ";


  const columns = useMemo(() => {
    return [
      {
        title: "S.No",
        dataIndex: "serialNumber",
        key: "serialNumber",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>{e.serialNumber}</div>,
      },
      {
        title: "Testcase ID",
        dataIndex: "testcaseId",
        key: "testcaseId",
        width: "12%",

        render: (_, e) => <div className={tableStyle}>{e.testcaseId}</div>,
      },
      {
        title: "Testcase Name",
        dataIndex: "testcaseName",
        key: "testcaseName",
        width: "20%",

        render: (_, e) => <div className={tableStyle}>{e.testcaseName}</div>,
      },
      {
        title: (
          <div className="flex items-center">
             User Role<IC_STATUS className="mr-2" />
          </div>
        ),
        dataIndex: "userRole",
        key: "userRole",
        width: "20%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.userRole}</div>
          </div>
        ),
      },
      {
        title: (
          <div className="flex items-center">
             User Name<IC_STATUS className="mr-2" />
          </div>
        ),
        dataIndex: "userName",
        key: "userName",
        width: "15%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.userName}</div>
          </div>
        ),
      },
      {
        title: "DUT Required",
        dataIndex: "DUTRequired",
        key: "DUTRequired",
        width: "15%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.DUTRequired}</div>
          </div>
        ),
      },
      {
        title: (
          <div className="flex items-center">
             Category<IC_STATUS className="mr-2" />
          </div>
        ),
        dataIndex: "category",
        key: "category",
        width: "20%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.category}</div>
          </div>
        ),
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        width: "10%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.duration}</div>
          </div>
        ),
      },
      {
        title: "Execution",
        dataIndex: "description",
        key: "description",
        width: "25%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <IC_Player
              onClick={() =>
                navigate(`/testCaseHub/iterationList/${e.serialNumber}`)
              }
              className="cursor-pointer"
            />
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "20%",
        //filterIcon: () => <IC_Filter />,

        render: (_) => (
          <div className="flex">
          <Ic_Action/>
            {/* <IC_Edit
              className="cursor-pointer"
              onClick={() =>
                navigate(`/testCaseHub/testCaseList/edit-test-cases`)
              }
            />
            <IC_Small_Delete
              className="mx-2 cursor-pointer"
              onClick={() => setDelete(true)}
            />
            <IC_Eye
              className="cursor-pointer"
              onClick={() => setModalTestCase(true)}
            /> */}
          </div>
        ),
      },
    ];
  }, [userData]);

 

  return (
    <>
      <div>
       
        <div className="my-1">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="text-lg font-medium text-theme-black">
            Schedule Testcases
            </div>

            <div className="flex  justify-between gap-2">
             <div className="text-xs font-poppins_w text-theme-dark underline">View All</div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <AppTable
            rowKey={"tracking_id"}
            className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
            dataSource={userData?.splice(0,5)}
            columns={columns}
            pagination={false}
            size="small"
          ></AppTable>
        </div>
      </div>
     
    
    </>
  );
};

export default ScheduleTestcases;
