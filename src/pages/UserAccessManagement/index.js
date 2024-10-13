import { useState, useMemo, useCallback, useEffect } from "react";
import { TableContainer} from "@mui/material";
import { AppTable } from "../../components/Table";
import SearchInput from "../../components/Input/SearchInput";
import AppModal from "../../components/Modal/AppModal";
import { Dropdown, Space, Tooltip } from "antd";
import PageLoader from "../../components/Loader/PageLoader";
import DeleteUserRoleModal from "./DeleteUserRoleModal";
import { Ic_Action, EXCLATIONMARK } from "../../assets/icons";
import { useSearchParams } from "react-router-dom";
import { Role_List } from "../../utils/commonTextFile";
import { useGetAllUserRolesQuery } from "../../features/dashboard/dashboardAPI";
import AddRoleModal from "./AddRoleModal";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../components/Button";


const AccessManagement = () => {
  const [searchParams] = useSearchParams();
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });

  const [openModal, setModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [roleItem, setRoleItem] = useState();
  const [isEditRole, setIsEditRole] = useState(false);
  const [isDescription, setIsDEscription] = useState("");
  const [viewRole, setViewRole] = useState(false);

  const params = useMemo(() => {
    return {};
  }, []);

  function handleSearchClick(e) {
    e.preventDefault();
    const searchVal = e.target.searchName.value.trim();

    // If the search value is empty, reset to the full list
    if (!searchVal) {
      setRolesfilter(userRoleList?.data?.roleFeatures);
      return;
    }

    // Filter role features based on the search value
    const filterBySearch = userRoleList?.data?.roles.filter((item) =>
      item.roleName.toLowerCase().includes(searchVal.toLowerCase())
    );

    setRolesfilter(filterBySearch);
  }

  const {
    isLoading,
    data: userRoleList,
    isFetching,
  } = useGetAllUserRolesQuery({ params });
  const [rolesfilter, setRolesfilter] = useState(
    userRoleList?.data?.roles || []
  );
  useEffect(() => {
    setRolesfilter(userRoleList?.data?.roles);
  }, [userRoleList?.data?.roles]);

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";

  const items = [
    { key: "2", label: "Edit" },
    { key: "3", label: "View" },
    { key: "4", label: "Delete" },
  ];

  const handleDropdownItemClick = (item) => {
    setRoleId(item?.roleId);
    setRoleItem(item);
    if (item?.index === "2") {
      setModal(true);
      setIsEditRole(true);
      setViewRole(false);
    } else if (item?.index === "3") {
      setViewRole(true);
      setModal(true);
      setIsEditRole(true);
    } else if (item?.index === "4") {
      setViewRole(false);
      setDeleteModal(true);
      setIsEditRole(false);
    }
  };

  const roleDescriptionTooltip = (desc) => {
    setIsDEscription(desc.roleDescription.roleDescription);
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Role Name",
        dataIndex: "roleName",
        key: "roleName",
        // width: "15%",

        render: (_, e) => <div className={tableStyle}>{e.roleName}</div>,
      },
      {
        title: "Permission",
        dataIndex: "permissions",
        key: "permissions",
        // width: "20%",

        render: (_, e) => (
          <div className=" text-xs	font-normal text-theme-grey">
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
        // width: "40%",

        render: (_, e) => (
          <div className="flex w-auto">
            {e?.roleDescription?.length > 50 ? (
              <div className="flex">
                <div className={tableStyle}>
                  {e?.roleDescription?.substring(0, 49) + "..."}
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

      {
        title: "Action",
        dataIndex: "Action",
        key: "Action",
        // width: "10%",
        render: (_, item) => (
          <Space size="small">
            <Dropdown
              className="cursor-pointer"
              menu={{
                items,
                onClick: (index) =>
                  handleDropdownItemClick({ ...item, index: index?.key }),
              }}
            >
              <div>
                <Ic_Action />
              </div>
            </Dropdown>
          </Space>
        ),
      },
    ];
  }, [userRoleList?.data]);

  const handleLogoutModalClose = useCallback(() => {
    setModal(false);
    setDeleteModal(false);
  }, []);

  const onEditModal = () => {
    setViewRole(false);
  };

  return (
    <>
      <div className="w-full mb-10">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="text-xl font-medium font-poppins_cf text-theme-black">
              {Role_List}
            </div>

            <div className="flex  justify-between gap-3">
              <SearchInput
                onSubmit={(e) => {
                  handleSearchClick(e);
                }}
                searchName={searchName}
                setSearchName={(val) => {
                  setSearchName(val);
                  if (val.trim() === "") {
                    setRolesfilter(userRoleList?.data?.roles);
                  }
                }}
                placeholder={"Search.."}
              />
              <Button
                 className="bg-theme-dark text-theme-white font-poppins_cf text-xs font-medium px-3 sm:px-2 rounded border-[1px]"
                onClick={() => {
                  setModal(true);
                  setViewRole(false);
                  setIsEditRole(false);
                }}
              >
                <AddIcon /> Add
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <AppTable
              rowKey={"roleId"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey mb-4"
              dataSource={rolesfilter}
              columns={columns}
              pagination={false}
              size="small"
            />
          )}
        </div>
      </div>

      <AppModal
        show={openModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <AddRoleModal
          onRoleAddSuccess={handleLogoutModalClose}
          isEditRole={isEditRole}
          roleId={roleId}
          roleItem={roleItem}
          viewRole={viewRole}
          onEditModal={onEditModal}
          // bucketItem={bucketItem}
        />
      </AppModal>

      <AppModal
        show={openDeleteModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <DeleteUserRoleModal
          onRoleAddSuccess={handleLogoutModalClose}
          roleId={roleId}
          roleItem={roleItem}
        />
      </AppModal>
    </>
  );
};

export default AccessManagement;
