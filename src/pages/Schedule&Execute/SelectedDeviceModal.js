import { useMemo, useState } from "react";
import { AppTable } from "../../components/Table";
import { TableContainer } from "@mui/material";

const SelectedDeviceModal = ({ selectedData, handleClose, onClickAt }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  const tableStyle =
    "w-full truncate text-theme-grey text-xs	font-normal mx-2 font-poppins_cf ";
  const columns = useMemo(
    () => [
      {
        title: "Mark",
        dataIndex: "mark",
        key: "mark",
        width: "10%",
        render: (_, e) => (
          <input type="radio"  checked={e?.isPrimary} name="markDevice" value={e.deviceName} />
        ),
      },
      {
        title: "Device Name",
        dataIndex: "deviceName",
        key: "deviceName",
        width: "20%",
        render: (_, e) => <div className={tableStyle}>{e?.deviceName}</div>,
      },
      {
        title: "Make & Model",
        dataIndex: "phoneNum",
        key: "phoneNum",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.make}</div>
          </div>
        ),
      },
      {
        title: "IMEI 1",
        dataIndex: "imei1",
        key: "imei1",
        render: (_, e) => <div className={tableStyle}>{e?.imei1}</div>,
      },
      {
        title: "IMEI 2",
        dataIndex: "imei2",
        key: "imei2",
        render: (_, e) => <div className={tableStyle}>{e?.imei2}</div>,
      },
    ],
    [selectedData, tableStyle]
  );

  return (
    <>
      <div>
        <div className="flex flex-1 flex-col">
          <AppTable
            rowKey={"serialNumber"}
            className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
            pagination={false}
            size="small"
            dataSource={selectedData}
            columns={columns}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                setSelectedItem(record);
              },
            })}
          />

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              title="Close popup"
              onClick={handleClose}
              className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
            >
              Close
            </button>
            <button
              type="button"
              title="Close popup"
              onClick={() => onClickAt(selectedItem)}
              className="w-[90px] cursor-pointer rounded-md  bg-theme-dark py-2 text-xs font-normal text-theme-white"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedDeviceModal;
