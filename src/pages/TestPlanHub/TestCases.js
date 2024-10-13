import { useState, useMemo, useCallback } from "react";

import { AppTable } from "../../components/Table";
import Modal from "../../components/Modal";
import { TableContainer, Button } from "@mui/material";
import { LeftArrow } from "../../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Test_Hub, Testcase } from "../../utils/commonTextFile";
import PageLoader from "../../components/Loader/PageLoader";
import { useGetTestPlanDetailsListQuery } from "../../features/dashboard/dashboardAPI";

const AccessManagement = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id,"id");

  const [openModal, setModal] = useState(false);
  const [openModalCreateBucket, setModalCreateBucket] = useState(false);
  const [openModalAssignBucket, setModalAssignBucket] = useState(false);
  const [openModalTestCase, setModalTestCase] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [openModalImport, setModalImport] = useState(false);
  const params = useMemo(() => {
    return {
      tpId: id.toString()
    };
  }, [id]);
  

  const { data, isLoading } = useGetTestPlanDetailsListQuery({ params });

  const tableStyle =
    "w-full truncate text-theme-grey text-xs	font-normal font-poppins_cf ";

    const columns = useMemo(() => {
      return [
        {
          title: "Test Plan ID",
          dataIndex: "tcTestcaseId",  // Using "tcTestcaseId" from the response
          key: "testcaseId",
          width: "10%",
          render: (_, e) => (
            
            <div
              className="mx-2 w-full cursor-pointer truncate text-xs font-normal text-theme-blue underline"
              onClick={() =>
                navigate(`/testresultHub/testPlanDetails`, {
                  state: {
                    testCaseDetails: e, // Pass the entire testcase details object as state
                  },
                })
              }
            >
              {e?.tcTestcaseId}  {/* Correcting the field to show "tcTestcaseId" */}
            </div>
          ),
        },
        {
          title: "Testcase Name",
          dataIndex: "tcName",  // Using "tcName" from the response
          key: "tcName",
          width: "20%",
          render: (_, e) => <div className={tableStyle}>{e?.tcName}</div>,
        },
        {
          title: "Command(s)",
          dataIndex: "commands",  // Using "commands" from the response
          key: "command",
          width: "10%",
          // filterIcon: (filtered) => <IC_STATUS />,  // Add your custom icon here
          render: (_, record) => {
       
            const commandLimit = 2; 
            const commandNames = record?.commands?.length
              ? record.commands.map((cmd) => cmd.commandName)
              : [];
              console.log(commandNames,"commandNames")
    
            const displayedCommands = commandNames.slice(0, commandLimit); 
            const remainingCommandsCount = commandNames.length - commandLimit;
    
            return (
              <div className="flex space-x-2">
                {displayedCommands.map((command, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 align-middle text-center items-center truncate text-theme-grey text-xs font-poppins_cf font-normal mx-2 bg-theme-headerColor rounded-xl"
                  >
                    {command}
                  </div>
                ))}
    
                {remainingCommandsCount > 0 && (
                  <div className="px-2 py-1 w-10 align-middle text-center items-center truncate text-theme-grey text-xs font-poppins_cf font-normal mx-2 bg-theme-headerColor rounded-xl">
                    +{remainingCommandsCount}
                  </div>
                )}
              </div>
            );
          },
        },
        {
          title: "Iteration",
          dataIndex: "tcIteration",  // Using "tcIteration" from the response
          key: "iteration",
          width: "15%",
          render: (_, e) => <div className={tableStyle}>{e.tcIteration}</div>,
        },
        {
          title: "Delay",
          dataIndex: "tcIterationDelay",  // Using "tcIterationDelay" from the response
          key: "iterationDelay",
          width: "15%",
          render: (_, e) => <div className={tableStyle}>{e.tcIterationDelay}</div>,
        },
      ];
    }, [data?.data?.testCases]);  // Watching for changes in testCases data
    

  const handleLogout = async () => {
    setModal(false);
    setModalCreateBucket(false);
    setModalAssignBucket(false);
    setModalTestCase(false);
    setDelete(false);
    setModalImport(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setModal(false);
    setModalCreateBucket(false);
    setModalAssignBucket(false);
    setModalTestCase(false);
    setDelete(false);
    setModalImport(false);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center font-poppins_cf text-[10px]">
          <LeftArrow onClick={() => goBack()} className="mr-2 cursor-pointer" />
          {Test_Hub} <div className="mx-2">|</div>
          <div className="font-poppins_cf text-[10px] text-theme-dark">
            {" "}
            {Testcase}
          </div>
        </div>
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-poppins_w text-lg font-medium text-theme-black">
                Test Plan Name
              </div>

             
              <div className="font-poppins_cf text-xs text-theme-dark">
                (Total Testcases : TP-{id})
              </div>
              <div className="font-poppins_cf text-xs text-theme-gray">
                Total Testcases : {data?.data?.testCases?.length}
              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <AppTable
              rowKey={"serialNumber"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
              dataSource={data?.data?.testCases || []}
              columns={columns}
              pagination={false}
              size="small"
            ></AppTable>
          )}
        </div>
      </div>

     

      {/*  Import Export testcase */}
      <Modal
        show={openModalImport}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal "
          className="flex  w-80 flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="text-left font-poppins_w  text-xl text-theme-black ">
            Import Testcase
          </div>

          <div className="my-2 flex items-center ">
            <Button
              variant="outlined"
              size="small"
              style={{
                borderColor: "#EC1944",
                color: "#EC1944",
              }}
              sx={{
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "400",
              }}
              className="  font-poppins_cf text-xs text-theme-black"
              // disabled={selectedItems.length === 0}
              onClick={() => {
                //setModalCreateBucket(true);
              }}
            >
              Choose File
            </Button>

            <div className="mx-2 font-poppins_cf text-xs font-normal text-theme-grey">
              No file Selected
            </div>
          </div>

          <hr />

          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md    p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Assign
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccessManagement;
