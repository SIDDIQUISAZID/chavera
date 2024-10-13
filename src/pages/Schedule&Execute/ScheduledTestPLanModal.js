import { useState, useMemo } from "react";
import { AppTable } from "../../components/Table";

import { IV_SCHEDULE, IV_DELETE } from "../../assets/icons";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import PageLoader from "../../components/Loader/PageLoader";
const ScheduledTestPlanModal = ({
  selectedDate,
  selectedEvent,
  modalDismiss,
  onDelete,
  allEventSameDate,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const tableStyle = "w-full truncate text-theme-grey text-xs font-normal mx-2";
  const gotoDetails = (event) => {
    modalDismiss();
    navigate(
      `/scheduleExecute/ScheduleTestPlan/${event?.tpScheduleId}/2024-10-03T07:00:00.000Z/2024-10-03T07:30:00.000Z`
    );
  };

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
        title: "Test Plan",
        dataIndex: "tpName",
        key: "tpName",

        render: (_, e) => <div className={tableStyle}>TP-{e?.tpId}</div>,
      },
      {
        title: "Testplan name",
        dataIndex: "tpName",
        key: "tpName",

        render: (_, e) => <div className={tableStyle}>{e?.tpName}</div>,
      },

      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        width: "10%",
        render: (_, e) => (
          <div className={tableStyle}>
            {" "}
            {moment(e?.tpStartDate)?.format("HH:mm")}
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "Reason",
        key: "Reason",
        width: "5%",
        render: (_, item, index) => (
          <div className="flex items-center gap-2">
            <IV_SCHEDULE
              className="cursor-pointer"
              onClick={() => gotoDetails(item)}
            />

            <IV_DELETE
              className="cursor-pointer"
              onClick={() => onDelete(item, index)}
            />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div data-testid="logoutModal">
      <div data-testid="openModal ">
        <div className="flex flex-1 flex-col">
          <div className={tableStyle}>
            {""}
            {moment(selectedEvent?.sameDate[0]?.tpStartDate)?.format(
              "YYYY-MM-DD [at] HH:mm"
            )}
            {" -"}
            {moment(selectedEvent?.sameDate[0]?.tpStartDate)
              .add(30, "minutes")
              ?.format(" HH:mm")}
          </div>
          <AppTable
            rowKey={"serialNumber"}
            className="border-blue-light orderDetailsProduct overflow-auto border text-xs font-normal text-theme-grey"
            pagination={false}
            size="small"
            dataSource={allEventSameDate || []}
            columns={columns}
          />
        </div>
      </div>
      {/* <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          title="Close popup"
          onClick={modalDismiss}
          className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
        >
          Close
        </button>
        <button
          type="button"
          title="Close popup"
          onClick={modalDismiss}
          className="w-[90px] cursor-pointer rounded-md  bg-theme-dark py-2 text-xs font-normal text-theme-white"
        >
          OK
        </button>
      </div> */}

      {/* <AppModal title="Schedule Test Plan" show={open}>

      </AppModal> */}
    </div>
  );
};

export default ScheduledTestPlanModal;
