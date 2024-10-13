import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetScheduleCommandQuery } from "../../features/dashboard/dashboardAPI";
import PageLoader from "../../components/Loader/PageLoader";
import { AppTable } from "../../components/Table";
import moment from "moment";
import { IV_CheckMark, LeftArrow } from "../../assets/icons";
const CommandTestCase = () => {
  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";
  const { tpScheduleId, tpName } = useParams();
  const navigate = useNavigate();
  const params = useMemo(() => {
    return {
      tcIterationScheduleId: tpScheduleId,
    };
  }, [tpScheduleId]);
  const { data, isLoading } = useGetScheduleCommandQuery(params);

  const columns = useMemo(() => {
    return [
      {
        title: "SN",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (value, item, index) => (
          <div className={tableStyle}>{index + 1}</div>
        ),
      },
      {
        title: "Command(s)",
        dataIndex: "commands",
        key: "commands",

        render: (_, record) => {
          return <div className={tableStyle}>{record?.commandName}</div>;
        },
      },
      {
        title: "Devices",
        dataIndex: "commandIterations",
        key: "commandIterations",
        render: (_, record) => {
          return (
            <div className={tableStyle}>
              <div className="flex flex-wrap gap-2">
                {record?.commandIterations[0]?.devices?.map((item, index) =>
                  item?.isPrimary ? (
                    <div className="flex items-center justify-center rounded-full border bg-green-100 px-3 py-1 text-xs text-green-600">
                      <IV_CheckMark className="mr-2" /> {item[0]?.deviceName}
                    </div>
                  ) : (
                    <div className="flex cursor-pointer items-center justify-center rounded-full border bg-purple-100 px-3  py-1 text-xs text-theme-black">
                      {item?.deviceName}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        },
      },
      {
        title: "Iteration",
        dataIndex: "commands",
        key: "commands",
        width: "11%",
        render: (_, record) => {
          return (
            <div className={tableStyle}>
              {record?.commandIterations?.length}
            </div>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "commandResultStatus",
        key: "commandResultStatus",
        width: "11.4%",
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
  }, []);

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
          dataSource={data?.data?.commands || []}
          pagination={false}
          size="small"
          expandable={{
            expandedRowRender: (record) =>
              record?.commandIterations?.map((item, index) => (
                <div className="m-0 h-6 flex-row items-center justify-center">
                  <div className="flex items-center justify-around">
                    <div className="flex w-full"></div>
                    <div className="flex w-full"></div>
                    <div className="w-full">
                      <div className="flex  items-center">
                        <div className={tableStyle}>{index + 1}</div>
                        <div className={tableStyle}>
                          {item?.commandExecutionResultStatus || "--"}
                        </div>

                        <div className={tableStyle}>
                          {moment(item?.commandExecutionStartDate)?.format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              )),
          }}
        />
      )}
    </div>
  );
};

export default CommandTestCase;
