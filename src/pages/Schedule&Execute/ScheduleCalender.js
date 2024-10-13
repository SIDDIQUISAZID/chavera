import { useState, useMemo, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card } from "antd";
import { SCHEDULE_CALENDER } from "../../utils/commonTextFile";
import AppModal from "../../components/Modal/AppModal";
import ScheduledTestPLanModal from "./ScheduledTestPLanModal";
import DeleteScheduledModal from "./DeleteScheduledModal";
import { useNavigate } from "react-router-dom";
import "../../../src/css/TableList.css";
import { useGetScheduleListQuery } from "../../features/dashboard/dashboardAPI";
const ScheduleCalender = () => {
  const localizer = momentLocalizer(moment);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toFromDate, setToDate] = useState(new Date());
  const [selectedView, setView] = useState("day");
  const [selectedEvent, setSelectedEvent] = useState();
  const [isDelete, setDelete] = useState(false);
  const [scheduledItem, setScheduledItem] = useState();
  const [allEventSameDate, setAllEventSameDate] = useState([]);

  const params = useMemo(() => {
    return {
      page: 0,
      size: 10,
      searchText: "",
      filterStatus: "",
      filterCreatedBy: "",
      filterFromDate: moment(
        fromDate,
        "ddd MMM DD YYYY HH:mm:ss [GMT]Z"
      ).format("YYYY-MM-DD 00:00:00.000"),
      filterToDate: moment(toFromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]Z")
        .add(1, "days")
        .format("YYYY-MM-DD 00:00:00.000"),
    };
  }, [toFromDate, toFromDate]);

  const { data, isLoading } = useGetScheduleListQuery(params);

  const addSeconds = (date, seconds) => {
    const newDate = new Date(date); // Create a copy of the date object
    newDate.setSeconds(newDate.getSeconds() + seconds); // Add seconds
    return newDate;
  };

  const events = useMemo(() => {
    let groupedTestPlans = [];
    if (!data?.data?.TestPlans) {
      return [];
    }

    data?.data?.TestPlans?.forEach((plan) => {
      // Check if there's already an entry with the same tpStartDate
      let existingGroup = groupedTestPlans.find(
        (group) => group.tpStartDate === plan.tpStartDate
      );

      if (existingGroup) {
        // If found, add the current plan to the sameDate array
        existingGroup.sameDate.push(plan);
      } else {
        groupedTestPlans.push({
          tpStartDate: plan?.tpStartDate,
          tpScheduleId: plan?.tpScheduleId,
          start: new Date(plan?.tpStartDate),
          end: addSeconds(new Date(plan?.tpStartDate), plan?.tpDuration),
          tpId: plan.tpId,
          sameDate: [plan],
        });
      }
    });

    return groupedTestPlans;
  }, [data?.data?.TestPlans]);

  const navigate = useNavigate();
  // Current calendar date
  const [open, setOpen] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null); // State to store selected slot info (date)

  // Handle event clicks
  const handleEventClick = (event) => {
    console.log("setAllEventSameDatesetAllEventSameDate", setAllEventSameDate);
    setAllEventSameDate(event.sameDate || []);
    setSelectedEvent(event);
    if (event?.sameDate?.length > 1) {
      setOpen(true);
    } else {
      navigate(
        `/scheduleExecute/ScheduleTestPlan/${event?.tpScheduleId}/${event?.tpStartDate}/${event?.tpStartDate}`
      );
    }
  };
  // Handle empty slot clicks (when a user selects a date without an event)
  const handleSlotClick = (slotInfo) => {
    console.log(slotInfo);

    // navigate(`/testPlanHub/testPlanList/testCases/${e?.tpId}`)
    navigate(
      `/scheduleExecute/ScheduleTestPlan/addSchedule/${slotInfo?.start}/${slotInfo?.end}`
    );

    setSlotInfo(slotInfo); // Save the selected slot's info (start date)
    //setOpen(true); // Open the modal
  };

  // Handle modal close
  const handleLogoutmodal = () => {
    setOpen(false);
    setDelete(false);
    setSlotInfo(null); // Reset slot info when closing modal
  };

  const handleRangeChange = (range, view) => {
    if (view !== undefined) {
      setView(view);

      if (view === "week") {
        const start = range[0];
        const end = range[range.length - 1];

        setFromDate(start);
        setToDate(end);

        return;
      }

      if (view === "month") {
        const start = range?.start;
        const end = range?.end;

        setFromDate(start);
        setToDate(end);

        return;
      }

      if (view === "day") {
        const start = range[0];
        const end = range[0];

        setFromDate(start);
        setToDate(end);
        return;
      }
      return;
    }
    if (selectedView === "week") {
      const start = range[0];
      const end = range[range.length - 1];

      setFromDate(start);
      setToDate(end);

      return;

      // setWeekRange({ start, end });
    }

    if (selectedView === "month") {
      const start = range?.start;
      const end = range?.end;

      setFromDate(start);
      setToDate(end);

      return;
    }

    if (selectedView === "day") {
      const start = range[0];
      const end = range[0];

      setFromDate(start);
      setToDate(end);
      return;
    }
  };

  const calendarStyle = () => {
    return {
      style: {
        backgroundColor: "white", //this works
        color: "black", //but why doesn't this work?
      },
    };
  };

  const modalDismiss = () => {
    setOpen(false);
  };

  const onDelete = (itemDelete, index) => {
    setScheduledItem(itemDelete);
    setDelete(true);
    setAllEventSameDate((prevItems) =>
      prevItems.filter((item) => item.tpScheduleId !== itemDelete?.tpScheduleId)
    );
  };

  return (
    <div className="h-fit w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex">
          <h1 className="font-poppins text-lg font-medium">
            {SCHEDULE_CALENDER}
          </h1>
        </div>
      </div>
      <Card className="h-fit p-2">
        <Calendar
          localizer={localizer}
          events={events || []}
          defaultView={Views.DAY}
          views={["day", "week", "month"]}
          date={selectedDate}
          //showAllEvents={false}
          onRangeChange={handleRangeChange}
          onNavigate={(date) => setSelectedDate(date)}
          startAccessor="start"
          endAccessor="end"
          formats={{ timeGutterFormat: "HH:mm" }}
          components={{
            event: ({ event }) => (
              <div>
                {event?.sameDate?.length > 1 ? (
                  <div className="flex gap-2">
                    <span className="font-poppins_cf text-xs">
                      TP-{event?.tpId}
                    </span>
                    <div className="flex items-center rounded-md bg-[#29CC39] px-1 text-center font-poppins_cf text-xs">
                      <div>{"+" + event?.sameDate.length}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <span className="font-poppins_cf text-xs">
                      TP-{event?.tpId}
                    </span>
                  </div>
                )}
              </div>
            ),
          }}
          eventPropGetter={(myEventsList) => {
            const backgroundColor = myEventsList.colorEvento
              ? "white"
              : "#29CC390D";
            const color = myEventsList.color ? myEventsList.color : "black";
            return {
              style: {
                backgroundColor,
                color,
                borderRadius: "0px",
                borderColor: "#29CC39",
                borderRadius: "4px",
              },
            };
          }}
          dayPropGetter={calendarStyle}
          onSelectEvent={handleEventClick} // Click on event
          selectable
          onSelectSlot={handleSlotClick} // Click on empty slot
        />
      </Card>
      {/* Pass selected date (slotInfo) to the modal */}
      <AppModal
        show={open}
        onClose={handleLogoutmodal}
        title="Scheduled Test Plans"
        modalClass={"w-[calc(100%-90px)] md:w-[calc(50%)] rounded-[4px]"}
      >
        {/* Pass selected slot date to modal */}
        <ScheduledTestPLanModal
          selectedDate={slotInfo?.start}
          selectedEvent={selectedEvent}
          allEventSameDate={allEventSameDate}
          modalDismiss={modalDismiss}
          onDelete={onDelete}
        />
      </AppModal>

      <AppModal show={isDelete}>
        <DeleteScheduledModal
          onDeleteSuccess={handleLogoutmodal}
          scheduledItem={scheduledItem}
        />
      </AppModal>
    </div>
  );
};
export default ScheduleCalender;
