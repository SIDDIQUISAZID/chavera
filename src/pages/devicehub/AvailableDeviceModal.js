import { useState, useMemo, useEffect } from "react";
import { TableContainer } from "@mui/material";
import { Collapse, Tooltip } from "antd";
import { AppTable } from "../../components/Table";
import PageLoader from "../../components/Loader/PageLoader";
import { EXCLATIONMARK } from "../../assets/icons";
import { useGetAllUserRolesQuery } from "../../features/dashboard/dashboardAPI";

const { Panel } = Collapse;

const AvailableDeviceModal = () => {
  const [isDescription, setIsDescription] = useState("");
  const params = useMemo(() => {
    return {};
  }, []);

  const { isLoading, data: userRoleList } = useGetAllUserRolesQuery({ params });
  const [rolesfilter, setRolesfilter] = useState(
    userRoleList?.data?.roleFeatures || []
  );

  useEffect(() => {
    setRolesfilter(userRoleList?.data?.roleFeatures);
  }, [userRoleList?.data?.roleFeatures]);

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2";

  const roleDescriptionTooltip = (desc) => {
    setIsDescription(desc.roleDescription.roleDescription);
  };

  // Columns shared across tables (you can modify columns per table)
  const columns = useMemo(() => [
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      width: "15%",
      render: (_, e) => <div className={tableStyle}>{e.roleName}</div>,
    },
    {
      title: "Permission",
      dataIndex: "permissions",
      key: "permissions",
      width: "20%",
      render: (_, e) => (
        <div className="mx-2 w-96 text-xs font-normal text-theme-grey">
          {e?.features.length > 0
            ? e?.features?.map((x) => x?.featureName).join(", ")
            : "......"}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "roleDescription",
      key: "roleDescription",
      width: "40%",
      render: (_, e) => (
        <div className="flex w-auto">
          {e?.roleDescription?.length > 100 ? (
            <div className="flex">
              <div className={tableStyle}>
                {e?.roleDescription?.substring(0, 9) + "..."}
              </div>
              <Tooltip title={e?.roleDescription}>
                <EXCLATIONMARK onClick={() => roleDescriptionTooltip(e)} />
              </Tooltip>
            </div>
          ) : (
            <div className={tableStyle}>{e?.roleDescription}</div>
          )}
        </div>
      ),
    },
  ], [userRoleList?.data]);

  return (
    <div>
      <div className="flex flex-1 flex-col">
        {isLoading ? (
          <PageLoader
            containerAttr={{ className: "bg-blue-light/40" }}
            loaderColor={"#EC1944"}
          />
        ) : (
          <Collapse defaultActiveKey={['1']} expandIconPosition="bottom">
            {/* First collapsible table */}
            <Panel header="Table 1 - Available Devices" key="1">
              <AppTable
                rowKey={"roleId"}
                className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal text-theme-grey"
                dataSource={rolesfilter}
                columns={columns}
                pagination={false}
                size="small"
              />
            </Panel>

            {/* Second collapsible table */}
            <Panel header="Table 2 - Assigned Devices" key="2">
              <AppTable
                rowKey={"roleId"}
                className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal text-theme-grey"
                dataSource={rolesfilter}
                columns={columns}
                pagination={false}
                size="small"
              />
            </Panel>

            {/* Third collapsible table */}
            <Panel header="Table 3 - Device History" key="3">
              <AppTable
                rowKey={"roleId"}
                className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal text-theme-grey"
                dataSource={rolesfilter}
                columns={columns}
                pagination={false}
                size="small"
              />
            </Panel>
          </Collapse>
        )}
      </div>
    </div>
    
  );
};

export default AvailableDeviceModal;
