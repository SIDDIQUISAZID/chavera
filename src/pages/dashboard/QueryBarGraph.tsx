import { PieChart } from "react-minimal-pie-chart";

import Card from "@mui/material/Card";
import { Select } from "../../components/Select";


const genderData = [
  {
    value: "Resolve",
    color: "#EC1944",
  },
  {
    value: "Pending",
    color: "#222222",
  },

  {
    value: "Ongoing",
    color: "#606060",
  },
];

const pieData = [
  {
    color: "#606060",
    range: "22-29",
    value: 10,
  },
  {
    color: "#222222",
    range: "30-39",
    value: 33,
  },
  {
    color: "#E45842",
    range: "30-39",
    value: 33,
  },
];
const statusFilter = [
    { value: true, label: "Jan" },
    { value: false, label: "Feb" },
    { value: false, label: "Mar" },
    { value: false, label: "Apr" },
    { value: false, label: "May" },
    { value: false, label: "Jun" },
    { value: false, label: "Jul" },
    { value: false, label: "Aug" },
    { value: false, label: "Sep" },
    { value: false, label: "Oct" },
    { value: false, label: "Nov" },
    { value: false, label: "Dec" },
  ];

const QueryBarGraph = ({ title }: { title: string }) => {
  
  return (
    <Card
      variant="outlined"
      className=" flex  w-full flex-col   p-4 "
    >
      <div className="flex justify-between">
        <div className="font-poppins_cf text-base text-theme-black">
          {title}
        </div>
        <Select
            options={statusFilter}
            onChange={(selectedOption) => {
              
            }}
            placeholder="Months"
            wrapperAttr={{ className: "h-[25px] w-[110px] my-1" }}
            clearable
            required
          />
      </div>
     
        
        
        <div className="flex items-center justify-center gap-10 mt-10">
          <div className="h-36 w-36 ">
            <PieChart
              //lineWidth={90}
              animate={true}
              animationDuration={500}
              labelPosition={65}
              data={pieData}
              label={(props) => {
                return `${props.dataEntry.value}%`;
            }}
            labelStyle={{
                fontSize: 8,
                fontFamily: "Poppins W",
                color: "#ffffff",
                fontStyle: "normal",
                textAlign: 'center',
                fill: "white",
            }}

            />
          </div>

          <div>
            {genderData?.map((data,index) => {
              return (
                <div className="flex items-center gap-2">
                  <div
                    className={index!=0? "bg-theme-grey h-2 w-5":" h-2 w-5 bg-gradient-to-b from-theme-gradientTop to-theme-gradientBottom"}
                   
                  ></div>

                  <div className="font-poppins_cf text-xs text-theme-grey">
                    {data.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
     
    </Card>
  );
};

export default QueryBarGraph;
