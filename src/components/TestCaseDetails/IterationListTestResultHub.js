import { useState, useMemo, useCallback } from "react";
import { userdata } from "../../components/userdata";
import { AppTable } from "../../components/Table";
import Modal from "../../components/Modal";
import { TableContainer} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageLoader from "../Loader/PageLoader";
import { useGetIterationListQuery } from "../../features/dashboard/dashboardAPI";
import {
  IC_Download,
  LeftArrow,
} from "../../assets/icons";
import Input from "../../components/Input/Input";
import { useLocation } from "react-router-dom";

const IterationListTestResultHub = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schedule_TP_DETAILS_ID, tp_TC_MAP_ID,tc_TESTCASE_ID } = location.state || {};

  const [openModal, setModal] = useState(false);
  const [isPermission, setPermission] = useState(false);

  const params = useMemo(() => {
    return {
      scheduled_tp_id: schedule_TP_DETAILS_ID, 
      tp_tc_map_id: tp_TC_MAP_ID,
    };
  }, [ schedule_TP_DETAILS_ID, tp_TC_MAP_ID
  ]);
  const {data:iterationList} = useGetIterationListQuery(params)

  
  const [userData, setUserData] = useState(userdata);

  const tableStyle =
    "w-full truncate text-theme-grey text-xs font-poppins_cf 	font-normal mx-2";

    const toolTips =
    "w-full truncate text-theme-white text-[10px] font-poppins_cf 	font-normal mx-2";

  const columns = useMemo(() => {
    return [
     
      {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.tc_iteration_id}</div>
          </div>
        ),
      },
      {
        title: "Est. Time(Sec)",
        dataIndex: "estTime",
        key: "estTime",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.tc_duration}</div>
          </div>
        ),
      },
      {
        title: "Devices",
        dataIndex: "estTime",
        key: "estTime",
        render: (_,e) => (
          <div>
            <div class="group relative flex ">
              <div
                className={[
                  "mx-2 w-full cursor-pointer truncate font-poppins_cf text-xs 	font-normal text-theme-blue underline",
                ]}
              >
                {e?.deviceList?.length}
              </div>
              <div className="absolute  scale-0 z-50 top-3 rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">

              <div className="flex w-fill justify-between gap-3	">
              <div className={toolTips}>Device IMEI</div>
              <div className={toolTips}>Location</div>
              <div className={toolTips}>Make</div>
              <div className={toolTips}>Model</div>
              </div>

              {/* <div >
                {deviceData.map((item)=>
                <div className="flex justify-between border-t my-1 bottom-[1px] border-[#524B4B]">
                <div className={toolTips}>{item.emi}</div>
                <div className={toolTips}>{item.location}</div>
                <div className={toolTips}>{item.make}</div>
                <div className={toolTips}>{item.modal}</div>

                </div>
                
                )}
              </div> */}


              </div>
            </div>

            {/* <div className={ [ "text-theme-blue underline w-full truncate text-xs font-poppins_cf 	font-normal mx-2 cursor-pointer"]}>4</div> */}
          </div>
        ),
      },
      {
        title: "Timestamp",
        dataIndex: "estTime",
        key: "estTime",
        render: (_) => (
          <div>
            <div className={tableStyle}>---</div>
          </div>
        ),
      },
      {
        title: <div className="flex items-center">Status</div>,
        dataIndex: "status",
        key: "status",
        render: (_, e) => (
          <div>
            <div className="mx-2 w-full truncate font-poppins_cf  text-xs text-theme-green">
              {e.status}
            </div>
          </div>
        ),
      },
      {
        title: "Download",
        dataIndex: "action",
        key: "action",
        render: (_) => (
          <div className="flex">
            <IC_Download className="mx-2" />
          </div>
        ),
      },
    ];
  }, []);

  const handleLogout = async () => {
    setModal(false);
    setPermission(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setModal(false);
    setPermission(false);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <div className="flex items-center text-[10px]">
          <LeftArrow onClick={() => goBack()} className="mr-3 cursor-pointer" />
          Test Result Hub <div className="mx-2">|</div>
          Testcase Result  <div className="mx-2">|</div>
          <div className="text-[10px] text-theme-dark"> Iteration</div>
        </div>
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="flex justify-between gap-2 items-center">
            <div className="text-lg font-medium text-theme-black">
              Iteration List 
            </div>
            <div className=" text-theme-dark text-xs font-poppins_cf">Testcase id : {tc_TESTCASE_ID}</div>
            </div>

            
          </div>
        </div>
        <div className="flex flex-1 flex-col">
        {false? <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />:
          <AppTable
            rowKey={"tracking_id"}
            className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
            dataSource={iterationList?.data?.scheduledIterationsDetails||[]}
            columns={columns}
            pagination={false}
            size="small"
          ></AppTable>}
        </div>
      </div>
      <Modal
        show={openModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          <div className="flex items-center justify-between ">
            <div className="text-xl font-medium text-theme-black">
              View Role Permission
            </div>
            {!isPermission && (
              <div
                className="text-xs font-medium text-theme-dark underline"
                onClick={() => setPermission(true)}
              >
                Permission
              </div>
            )}
          </div>

          <div className="my-6 w-[500px]">
            <div className="flex items-end justify-between">
              <div className="h-12 w-[70%] content-center items-center rounded-t-lg  bg-theme-dark text-sm font-medium text-white ">
                Permission
              </div>

              <div className="ml-[0.5px] h-16 w-[30%]  content-center items-center rounded-t-lg bg-theme-purple text-sm font-medium text-white ">
                Test Engineer
              </div>
            </div>

            
         
          </div>

          <div>
            <Input
              name="patient"
              type="text"
              placeholder="Write something here..."
              //value={searchTerm}
              onChange={() => {
                // setSearchTerm(e.target.value)
              }}
              wrapperClass="mb-4"
              onFocus={() => {
                // if (!isOpen && patientList.length > 0) {
                //     setIsOpen(true)
                // }
              }}
              autoComplete="off"
              wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
            >
              Description
            </Input>
          </div>

          {isPermission && (
            <div className="flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
              <button
                title="Close popup"
                onClick={handleLogoutModalClose}
                className="w-[90px] cursor-pointer rounded-md border-[1px] border-theme-dark   bg-white p-1 text-xs font-normal text-theme-dark"
              >
                Cancel
              </button>
              {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
              <button
                title="Decline"
                onClick={handleLogout}
                className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
              >
                {"Done"}
              </button>
              {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default IterationListTestResultHub;
