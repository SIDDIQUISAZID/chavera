import { useState, useMemo, useCallback } from "react";
import { AppTable } from "../../components/Table";
import Modal from "../../components/Modal";
import { TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IC_Accept, IC_Reject, LeftArrow } from "../../assets/icons";
import { useLocation } from "react-router-dom";
import Input from "../../components/Input/Input";
import PageLoader from "../Loader/PageLoader";
import Button from "../Button";
import { useGetResultDetailsQuery } from "../../features/dashboard/dashboardAPI";
import TotalTestCase from "./TotalTestCase";

const TestingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tpName, tp_id } = location.state || {};
  const [openModal, setModal] = useState(false);
  const [isPermission, setPermission] = useState(false);

  const params = useMemo(() => {
    return {
      tpScheduleId: tp_id,
    };
  }, [tp_id]);
  const { data: scheduledTestCase, isLoading } = useGetResultDetailsQuery({
    params,
  });

  const tableStyle =
    "w-full truncate text-theme-grey text-xs font-poppins_cf 	font-normal mx-2";

  const permissionData = [
    {
      name: "Manage Test Account",
      isActive: false,
    },
    {
      name: "Test Features – Android , IOS",
      isActive: false,
    },
    {
      name: "Device Monitoring",
      isActive: true,
    },
    {
      name: "Test Case Hub, Test Plan Hub, Test Schedule Hub",
      isActive: false,
    },
    {
      name: "Results and Reports",
      isActive: false,
    },
    {
      name: "Network KPI’s",
      isActive: false,
    },
    {
      name: "Test Case Execution History",
      isActive: false,
    },
  ];

  const columns = useMemo(() => {
    return [
      {
        title: "Test Case ID",
        dataIndex: "tcId",
        key: "tcId",
        width: "10%",
        render: (_, e) => (
          <div
            className={
              "mx-2 w-full cursor-pointer truncate text-xs font-normal text-theme-blue underline"
            }
            onClick={() =>
              navigate(
                `/testresultHub/casesIteration/${e?.tcScheduleId}/${tpName}`
              )
            }
          >
            TC-{e?.tcId}
          </div>
        ),
      },
      {
        title: "Testcase Name",
        dataIndex: "tcName",
        key: "tcName",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>{e?.tcName}</div>,
      },
      {
        title: "Command(s)",
        dataIndex: "Category",
        key: "Category",
        width: "10%",
        render: (_, record) => {
          console.log(record, "record");
          const commandLimit = 2;
          const commandNames = record?.commands?.length
            ? record.commands.map((cmd) => cmd.commandName)
            : [];
          console.log(commandNames, "commandNames");

          const displayedCommands = commandNames.slice(0, commandLimit);
          const remainingCommandsCount = commandNames.length - commandLimit;

          return (
            <div className="flex space-x-2">
              {displayedCommands.map((command, index) => (
                <div
                  key={index}
                  className="mx-2 items-center truncate rounded-xl bg-[#FFE9ED] px-3 py-1 text-center align-middle font-poppins_cf text-[10px] font-normal text-theme-grey"
                >
                  {command}
                </div>
              ))}

              {remainingCommandsCount > 0 && (
                <div className="mx-2 w-10 items-center truncate rounded-xl bg-[#FFE9ED] px-3 py-1 text-center align-middle font-poppins_cf text-[10px] font-normal text-theme-grey">
                  +{remainingCommandsCount}
                </div>
              )}
            </div>
          );
        },
      },

      {
        title: "Iteration",
        dataIndex: "tcIteration",
        key: "tcIteration",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>{e?.tcIteration}</div>,
      },
      {
        title: "Timestamp",
        dataIndex: "Timestamp",
        key: "Timestamp",
        width: "10%",
        render: (_, e) => (
          <div className={tableStyle}>{e?.tcStartDate?.split("T")[0]}</div>
        ),
      },

      {
        title: "Status",
        dataIndex: "tcResultStatus",
        key: "tcResultStatus",
        width: "5%",
        render: (_, e) => (
          <div className={tableStyle}>{e?.tcResultStatus || "--"}</div>
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
          Testcase Result <div className="mx-2">|</div>
          <div className="text-[10px] text-theme-dark"> Iteration</div>
        </div>
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="flex items-baseline justify-between gap-2">
              <div className="font-poppins_cf text-xl ">{tpName}</div>

              <div className=" font-poppins_cf text-xs text-theme-dark">
                (Test Plan id : TP-{tp_id})
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              className=" rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
            >
              Download Summary
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <div>
              <TotalTestCase
                totalCounts={scheduledTestCase?.data?.totalCounts}
                totalPass={scheduledTestCase?.data?.totalPass}
                totalFails={scheduledTestCase?.data?.totalFails}
              />
              <AppTable
                rowKey={"tcScheduleId"}
                className="border-blue-light orderDetailsProduct mt-4 overflow-auto border  text-xs font-normal	text-theme-grey"
                dataSource={scheduledTestCase?.data?.TestCases || []}
                columns={columns}
                pagination={false}
                size="small"
              ></AppTable>
            </div>
          )}
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

            {permissionData.map((item) => (
              <div className="flex  items-center justify-between border-b-[1px] border-l-[1px] border-r-[1px] px-2">
                <div className="h-8  w-[71%] content-center  self-center  border-r-[1px] text-left text-xs font-medium">
                  {item.name}
                </div>
                <div className=" flex w-[29%] justify-center self-center">
                  {item.isActive ? (
                    <IC_Accept className="bg-center" />
                  ) : (
                    <IC_Reject />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <Input
              name="patient"
              type="text"
              placeholder="Write something here..."
              //value={searchTerm}
              onChange={(e) => {
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

export default TestingDetails;
