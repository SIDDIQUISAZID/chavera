import { useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "antd";
import { CHECK_DEVICE_AVAILABILITY } from "../../utils/commonTextFile";
import Input from "../../components/Input/Input";
import "./availity.css";
import { useGetDeviceAvailabilityQuery } from "../../features/dashboard/dashboardAPI";
const localizer = momentLocalizer(moment);
import PageLoader from "../../components/Loader/PageLoader";

const CheckdeviceAvailability = () => {
  const [date, setDate] = useState("2024-09-29 21:00:00.000");
  const params = useMemo(() => {
    return {
      date: date,
    };
  }, [date]);
  const { isLoading, data, isFetching } = useGetDeviceAvailabilityQuery({
    params,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = useMemo(() => {
    if (!data?.data?.deviceAvailability) {
      return [];
    }
    return data?.data?.userDetails?.map(
      ({ timeFrom, timeTo, scheduledCount, availableCount }) => ({
        start: new Date(timeFrom),
        end: new Date(timeTo),
        scheduledCount: scheduledCount,
        availableCount: availableCount,
      })
    );
  }, [data?.data?.deviceAvailability]);

  const CalendarToolbar = () => {
    return <div className="toolbar-container"></div>;
  };

  const calendarStyle = (date) => {
    let currentDate = `${new Date().getDate()} ${
      new Date().getMonth() + 1
    } ${new Date().getFullYear()}`;
    let allDate = `${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}`;

    if (allDate === currentDate)
      return {
        style: {
          backgroundColor: "white",
        },
      };
  };
  return (
    <>
      {isLoading ? (
        <PageLoader
          containerAttr={{ className: "bg-blue-light/40" }}
          loaderColor={"#EC1944"}
        />
      ) : (
        <div className="h-fit w-full">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between">
              <div className="justify-start">
                <h1 className="font-poppins text-xl font-medium text-theme-black">
                  {CHECK_DEVICE_AVAILABILITY}
                </h1>
              </div>
              <div className="flex  gap-4">
                <div className=" flex h-[35px]  w-fit items-center justify-between gap-1  rounded-[4px] bg-[#FAF1DD] px-2">
                  <div className=" font-poppins_w text-xs  text-theme-black">
                    Total No. of Devices - {}
                  </div>
                  <div className=" font-poppins_w text-xl  text-theme-black">
                    {data?.data?.totalCounts}
                  </div>
                </div>
                <div className="w-44">
                  <Input
                    type="date"
                    wrapperAttr="h-[35px]"
                    defaultValue={moment(date).format("YYYY-MM-DD")}
                    onChange={(e) =>
                      setDate(
                        moment(e.target.value).format(
                          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                        )
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <Card className="mt-3 h-full ">
            <Calendar
              localizer={localizer}
              events={events}
              defaultView={Views.DAY}
              views={["day"]}
              date={selectedDate}
              onNavigate={(date) => setSelectedDate(date)}
              startAccessor="start"
              endAccessor="end"
              formats={{ timeGutterFormat: "HH:mm" }}
              dayPropGetter={calendarStyle}
              eventPropGetter={(myEventsList) => {
                const backgroundColor = myEventsList.colorEvento
                  ? "white"
                  : "#D3F6E1";
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
              components={{
                toolbar: CalendarToolbar,
                event: ({ event }) => (
                  <div className=" font-poppins_cf text-[10px] text-theme-black">
                    {/* <strong>{event.title}</strong> */}
                    Free Devices : 234
                  </div>
                ),
              }}
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default CheckdeviceAvailability;
