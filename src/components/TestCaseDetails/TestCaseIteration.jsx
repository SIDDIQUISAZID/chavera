import { useMemo } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useGetCasesIterationQuery,useGetMyProfileQuery } from "../../features/dashboard/dashboardAPI";
import PageLoader from "../../components/Loader/PageLoader";
import { AppTable } from "../../components/Table";
import moment from "moment";
import { TableContainer } from "@mui/material";
import { Table } from "antd";

import { IV_CheckMark, LeftArrow, IV_EXPAND } from "../../assets/icons";
const CommandTestCase = () => {
  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";

  const { tpScheduleId, tpName } = useParams();
  const navigate = useNavigate();

  const params = useMemo(() => {
    return {
      tcScheduleId: tpScheduleId,
    };
  }, [tpScheduleId]);
  const { data, isLoading } = useGetCasesIterationQuery(params);
 

  const columns = useMemo(() => {
    return [
      {
        title: "SN",
        dataIndex: "serialNumber",
        key: "serialNumber",
        width: "10%",
        render: (value, item, index) => (
          <div className={tableStyle}>{index + 1}</div>
        ),
      },

      {
        title: "Command(s)",
        dataIndex: "commands", // Using "commands" from the response
        key: "command",
        width: "10%",
        // filterIcon: (filtered) => <IC_STATUS />,  // Add your custom icon here
        render: (_, record) => {
          const commandLimit = 2;
          const commandNames = record?.commands?.length
            ? record.commands.map((cmd) => cmd.commandName)
            : [];
          console.log(commandNames, "commandNames");

          const displayedCommands = commandNames.slice(0, commandLimit);
          const remainingCommandsCount = commandNames.length - commandLimit;

          return (
            <div className="flex gap-1">
              <div className="flex space-x-2">
                {displayedCommands.map((command, index) => (
                  <div
                    key={index}
                    className="mx-2 items-center truncate rounded-xl bg-theme-headerColor px-2 py-1 text-center align-middle font-poppins_cf text-xs font-normal text-theme-grey"
                  >
                    {command}
                  </div>
                ))}

                {remainingCommandsCount > 0 && (
                  <div className="mx-2 w-10 items-center truncate rounded-xl bg-theme-headerColor px-2 py-1 text-center align-middle font-poppins_cf text-xs font-normal text-theme-grey">
                    +{remainingCommandsCount}
                  </div>
                )}
              </div>

              <IV_EXPAND className=" cursor-pointer"
                onClick={() =>
                  navigate(
                    `/testresultHub/commandList/${record?.tcIterationScheduleId}/${tpName}`
                  )
                }
              />
            </div>
          );
        },
      },

      {
        title: "Status",
        dataIndex: "commandResultStatus",
        key: "commandResultStatus",
        width: "12%",
        render: (_, e) => (
          <div className={tableStyle}>
            <div>{e?.commandResultStatus || "--"}</div>
          </div>
        ),
      },

      {
        title: "Timestamp",
        dataIndex: "commandStartDate",
        key: "commandStartDate",
        width: "12%",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>
              {moment(e?.commandStartDate)?.format("YYYY-MM-DD HH:mm")}
            </div>
          </div>
        ),
      },
    ];
  }, [data?.data?.TestCaseIteration]);

  const goBack = () => {
    navigate(-1);
  };
  return (
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
              (Test Plan id : TP-{tpScheduleId})
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <PageLoader
          containerAttr={{ className: "bg-blue-light/40" }}
          loaderColor={"#EC1944"}
        />
      ) : (
        <AppTable
          rowKey={"commandId"}
          className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
          columns={columns}
          dataSource={data?.data?.TestCaseIteration || []}
          pagination={false}
          size="small"
        />
      )}
    </div>
  );
};

export default CommandTestCase;
