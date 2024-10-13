import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Typography } from "@mui/material";
import { Api } from "../Api";

export const IterationDirectionalData = (props) => {
  const { testCaseDetails } = props;
  const [dataDl, setDataDl] = React.useState([]);
  const [dataUl, setDataUl] = React.useState([]);
  const [bitrateUnit, setBitarteUnit] = React.useState("");
  React.useEffect(() => {
    fetchGraphData();
  }, [props]);

  // Function to convert bitrate to kilobits per second (mbps)
  function bitrateToKbps(bitrate) {
    return bitrate / 1000;
  }

  // Function to convert bitrate to megabits per second (Mbps)
  function bitrateToMbps(bitrate) {
    return bitrate / 1000000;
  }

  const fetchGraphData = async () => {
    let res = await Api.fetchGraphPerIteration(
      props?.selectedExecuId,
      props?.selectedIteratedRow?.iteration
    );
    let bitrateUnit = props?.selectedIteratedRow?.iperfBitrateUnit;
    {
      bitrateUnit === "Mb" ? setBitarteUnit("Mbps") : setBitarteUnit("kbps");
    }
    const ulprocessedData = res?.data?.ulThroughputs.map((entry) => ({
      ...entry,
      interval: entry.interval.split("-")[1].trim(), // Only keep the second part of the interval
      // bitrate: res?.data?.bitrateUnit === 'Mb' ? entry.bitrate : bitrateToMbps(entry.bitrate) ,

      // avgUL : res?.data?.bitrateUnit === 'Mb' ? res?.data?.avgUl :bitrateToMbps(res?.data?.avgUl)// Convert bitrate to kilobits per second
      bitrate:
        res?.data?.bitrateUnit === "Mb"
          ? bitrateToMbps(entry.bitrate).toFixed(4)
          : bitrateToKbps(entry.bitrate).toFixed(4),
      ul: props?.selectedIteratedRow?.bitrate,
      avgUL:
        res?.data?.bitrateUnit === "Mb"
          ? bitrateToMbps(res?.data?.avgUl).toFixed(4)
          : bitrateToKbps(res?.data?.avgUl).toFixed(4),
    }));

    const dlprocessedData = res?.data?.dlThroughputs.map((entry) => ({
      ...entry,
      interval: entry.interval.split("-")[1].trim(), // Only keep the second part of the interval
      // bitrate: res?.data?.bitrateUnit === 'Mb' ? entry.bitrate : bitrateToMbps(entry.bitrate),

      // avgDL : res?.data?.avgDl// Convert bitrate to kilobits per second
      bitrate:
        res?.data?.bitrateUnit === "Mb"
          ? bitrateToMbps(entry.bitrate).toFixed(4)
          : bitrateToKbps(entry.bitrate).toFixed(4),
      dl: props?.selectedIteratedRow?.bitrate,
      avgDL:
        res?.data?.bitrateUnit === "Mb"
          ? bitrateToMbps(res?.data?.avgDl).toFixed(4)
          : bitrateToKbps(res?.data?.avgDl).toFixed(4),
    }));
    ulprocessedData.unshift({
      "id": 9,
      "interval": "0",
      "bitrate": "0",
      "transfer": null,
      "retr": null,
      "cwnd": null,
      "throughputType": "UL",
      "iperfThroughputResultId": 2,
      "ul": 0,
      "avgUL": "0"
  });
  dlprocessedData.unshift({
    "id": 9,
    "interval": "0",
    "bitrate": "0",
    "transfer": null,
    "retr": null,
    "cwnd": null,
    "throughputType": "DL",
    "iperfThroughputResultId": 1,
    "dl": 0,
    "avgDL": "0"
});
    setDataDl(dlprocessedData);
    setDataUl(ulprocessedData);
  };

  const getMaxBitrate = (data) => {
    if (data.length === 0) return 0;
    const maxBitrate = Math.max(...data.map((entry) => parseFloat(entry.bitrate)));
    let roundedValue = Math.round(maxBitrate);
    return roundedValue; // Round off the maximum bitrate value
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Test case result summary Iteration :{" "}
        {props.selectedIteratedRow.iteration}
      </Typography>
      <div style={{ display: "flex" }}>
        {testCaseDetails?.iperf?.throughPutdirection === "UPLINK" ||
        testCaseDetails?.iperf?.throughPutdirection === "BI-DIRECTIONAL" ? (
          <div style={{ display: "grid" }}>
            <Typography> UL Graph</Typography>
            {dataUl !== undefined ? (
              <LineChart
                width={500}
                height={250}
                data={dataUl}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="interval"
                  label={{
                    value: "Interval (sec)",
                    position: "insideBottomRight",
                    dy: 15,
                    margin: 20,
                  }}
                />
                <YAxis
                  label={{
                    value: `(Bitrate : ${bitrateUnit})`,
                    angle: -90,
                    dy: 20,
                    dx: -20
                  }}
                  domain={[0, getMaxBitrate(dataUl) + 5]}
                />
                <Tooltip />
                <Legend 
    wrapperStyle={{ marginBottom: '-20px', marginLeft : '30px' }} />

                <Line
                  type="monotone"
                  dataKey="bitrate"
                  name={`Birate(${bitrateUnit})`}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="ul"
                  name={`Expected UL(${bitrateUnit})`}
                  stroke="#EC1944"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="avgUL"
                  name="Average UL"
                  stroke="#42b883"
                  strokeWidth={2}
                />
              </LineChart>
            ) : (
              <Typography>No data found</Typography>
            )}
          </div>
        ) : null}

        {testCaseDetails?.iperf?.throughPutdirection === "DOWNLINK" ||
        testCaseDetails?.iperf?.throughPutdirection === "BI-DIRECTIONAL" ? (
          <div style={{ display: "grid", marginLeft: "85px" }}>
            <Typography> DL Graph</Typography>
            {dataUl !== undefined ? (
              <LineChart
                width={500}
                height={250}
                data={dataDl}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="interval"
                  label={{
                    value: "Interval (sec)",
                    position: "insideBottomRight",
                    dy: 15,
                    margin: 20,
                  }}
                />
                <YAxis
                  label={{
                    value: `(Bitrate : ${bitrateUnit})`,
                    angle: -90,
                    position: "insideBottomCenter",
                    dy: 40,
                    dx: -20
                  }}
                  domain={[0, getMaxBitrate(dataDl) + 5]}
                />
                <Tooltip />
                <Legend
                wrapperStyle={{ marginBottom: '-20px' , marginLeft : '30px' }}
                />
                <Line
                  type="monotone"
                  dataKey="bitrate"
                  name={`Birate(${bitrateUnit})`}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="dl"
                  name={`Expected DL(${bitrateUnit})`}
                  stroke="#EC1944"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="avgDL"
                  name="Average DL"
                  stroke="#42b883"
                  strokeWidth={2}
                />
              </LineChart>
            ) : (
              <Typography>No data found</Typography>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IterationDirectionalData;
