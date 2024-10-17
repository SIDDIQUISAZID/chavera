import { useState, useMemo, useCallback, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppTable } from "../../components/Table";
import PageLoader from "../../components/Loader/PageLoader";
import SearchInput from "../../components/Input/SearchInput";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import DeleteUserModal from "../userdetails/DeleteUserModal";
import ActivateOrDeactivate from "../userdetails/ActivateOrDeactivate";
import { Radio } from "antd";
import { Ic_Action, EXCLATIONMARK } from "../../assets/icons";
import {
  useGetUserListQuery,
  useGetAllUserRolesQuery,
} from "../../features/dashboard/dashboardAPI";
import { IC_STATUS } from "../../assets/icons";
import { Dropdown, Space, Tooltip } from "antd";
import {
  Ic_Active,
  Ic_InActive,
  LeftChevIcon,
  RightChevIcon,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

import { addUser } from "../../utils/commonTextFile";
import AppModal from "../../components/Modal/AppModal";
import AssignToBucketModal from "../devicehub/AssignToOthers";
import Button from "../../components/Button";

const BaxterViewList = () => {
  const navigate = useNavigate();
  const [userItem, setUserItem] = useState();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });

  const {
    page,
    setPage,
    perPage,
    setPerPage,
    lastPage,
    goNext,
    goPrev,
    canNext,
    canPrev,
    setTotalDataCount,
  } = useMultiStep(initialPagination({ searchParams }));

  const params = useMemo(() => {
    return {
      page: (page - 1)?.toString(),
      size: perPage?.toString(),
      searchText: searchName,
      filterRole: role,
      filterStatus: status,
    };
  }, [page, perPage, searchName, role, status]);
  const { isLoading, data, isFetching } = useGetUserListQuery({ params });

  const { data: userRoleList } = useGetAllUserRolesQuery({ params: {} });

  const filterOptionsRoleName = useMemo(() => {
    if (!userRoleList?.data?.roles) {
      return [];
    }
    return userRoleList?.data?.roles?.map(({ roleName, roleId }) => ({
      text: roleName,
      value: roleId.toString(),
    }));
  }, [userRoleList?.data?.roles]);

  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 1);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });

  const [logoutModal, setLogoutModal] = useState(false);
  const [isActivate, setActivate] = useState(false);
  const [assignToBucket, setAssignToBucket] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const handleAddUserClick = (user) => {
    navigate(`/user/userList/${user}`);
  };

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";
  const onDelete = (user) => {
    setLogoutModal(true);
    setDelete(true);
    setUserItem(user);
  };

  const getDropdownItems = (user) => {
    return [
      {
        key: "1",
        label: user.status === true ? "Deactivate User" : "Activate User",
      },
      { key: "2", label: "Edit" },
      { key: "3", label: "Delete" },
    ];
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDropdownItemClick = (item, userData) => {
    if (item?.key === "1") {
      setActivate(true);
      setUserItem(userData);
    } else if (item?.key === "2") {
      navigate(`/user/userList/edit-user`, {
        state: { item: userData },
      });
    } else if (item?.key === "3") {
      onDelete(userData);
    }
  };

  const handleFilterChange = (filters) => {
    if (filters.roleName) {
      setRole(filters.roleName.join(","));
    }
    if (filters.status) {
      const statusValues = filters.status.map((status) =>
        status === "true" ? true : false
      );
      setStatus(statusValues.join(","));
    }
    if (!filters.roleName?.length) {
      setRole("");
    }
    if (!filters.status?.length) {
      setStatus("");
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Product Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, e) => (
          <div className="flex w-auto">
            {e?.userName?.length > 30 ? (
              <div className="flex">
                <div className={tableStyle}>
                  {e?.userName?.substring(0, 29) + "..."}
                </div>

                <Tooltip title={e?.userName}>
                  <EXCLATIONMARK />
                </Tooltip>
              </div>
            ) : (
              <div className={tableStyle}>{e?.userName}</div>
            )}
          </div>
        ),
      },
      {
        title: "Make",
        dataIndex: "roleName",
        key: "roleName",
        width: "5%",
        filterIcon: (filtered) => <IC_STATUS className="mr-32" />,
        filters: [...filterOptionsRoleName],
        render: (_, e) => (
          <div className={tableStyle}>
            <div>{e.roleName}</div>
          </div>
        ),
      },
      {
        title: "Models",
        dataIndex: "email",
        key: "email",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.email}</div>
          </div>
        ),
      },
      {
        title: "Model Name/Number",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      
      {
        title: "Accuracy",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Syringe size",
        dataIndex: "status",
        key: "status",
        width: "4%",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div className="flex justify-center p-2">
            <Radio.Group
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e?.target?.value] : [true]);
                confirm(); // Triggers the filter
              }}
              value={selectedKeys[0]} // Selects the current filter value
            >
              <Radio value="true" style={{ display: "block" }}>
                Active
              </Radio>
              <Radio value="false" style={{ display: "block" }}>
                Inactive
              </Radio>
            </Radio.Group>
          </div>
        ),
        filterIcon: (filtered) => <IC_STATUS />,
        onFilter: (value, record) => {
          // Filters based on status, converting string to boolean
          return record.status === (value === "true");
        },
        render: (_, e) => (
          <div className="flex items-center justify-center">
            {e.status === true ? <Ic_Active /> : <Ic_InActive />}
          </div>
        ),
      },
      {
        title: "Increment",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Height",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: "Width",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            {e?.isAuthenticatedDate ? (
              <div className={tableStyle}>{e.isAuthenticatedDate}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: <div className="flex items-center justify-center">Action</div>,
        dataIndex: "action",
        key: "action",
        render: (_, e) => (
          <Space size="small" className="flex items-center justify-center">
            <Dropdown
              className="cursor-pointer"
              menu={{
                items: getDropdownItems(e),
                onClick: (index) => handleDropdownItemClick(index, e),
              }}
            >
              <Ic_Action />
            </Dropdown>
          </Space>
        ),
      },
    ];
  }, [filterOptionsRoleName, handleDropdownItemClick]);

  const handleLogoutModalClose = useCallback(() => {
    setLogoutModal(false);
    setActivate(false);
    setAssignToBucket(false);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins_cf text-xl font-medium text-theme-black">
              Users
            </div>
            <div className="flex gap-3">
              <SearchInput
                searchName={searchName}
                setSearchName={setSearchName}
                placeholder={"Search user by name.."}
              />

              <Button
                className="rounded border-[1px] bg-theme-dark px-3 font-poppins_cf text-xs font-medium text-theme-white sm:px-2"
                onClick={() => {
                  handleAddUserClick("add-user");
                }}
              >
                <AddIcon className="" />
                {addUser}
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
              rowKey={"userId"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
              columns={columns}
              onChange={(sort, filters) => {
                handleFilterChange(filters);
              }}
              dataSource={data?.data?.userDetails || []}
              pagination={false}
              size="small"
            />
          )}
          <div className="flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs">
            <div className="flex items-center justify-end space-x-2 text-[10px] xs:text-xs">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Total count {data?.data?.totalCounts || 0}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Results per page
              </div>
              <select
                className="rounded border-[1px] border-theme-border p-2"
                value={perPage}
                onChange={(e) => {
                  setPerPage(+e.target.value);
                  setPage(1);
                }}
                disabled={false}
              >
                {paginationList.map((pageV) => {
                  return (
                    <option key={pageV} value={pageV}>
                      {pageV}
                    </option>
                  );
                })}
              </select>

              <div className="flex items-center space-x-2 rounded border-[1px] border-theme-border bg-white p-1.5">
                <button
                  onClick={goPrev}
                  className={`${canPrev ? "" : "opacity-50"}`}
                  disabled={!canPrev || isFetching}
                >
                  <div className="flex">
                    {" "}
                    <LeftChevIcon />
                    <IV_LeftArrow_Single />
                  </div>
                </button>
                <div
                  className="flex items-center gap-2 text-[10px] xs:text-xs"
                  data-testid="pageCount"
                >
                  {/* Page {page} of{" "} */}
                  {isFetching ? (
                    <span className="inline-block animate-pulse rounded-md bg-gray-300 text-gray-300">
                      00
                    </span>
                  ) : (
                    (() => {
                      const elements = [];
                      for (let i = 1; i < lastPage + 1; i++) {
                        elements.push(
                          i == page ? (
                            <div className="flex flex-row gap-2 rounded-[2px] bg-theme-dark px-1.5 py-0.5 text-theme-white">
                              <span className="gap-2" key={i}>
                                {i}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2 text-black">
                              <span className="gap-2" key={i}>
                                {i}
                              </span>
                            </div>
                          )
                        );
                      }
                      return elements;
                    })()
                  )}{" "}
                </div>
                <button
                  onClick={goNext}
                  className={`${canNext ? "" : "opacity-50"}`}
                  disabled={!canNext || isFetching}
                >
                  <div className="flex">
                    <IV_RIGHT_SINGLE />
                    <RightChevIcon className="text-black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppModal show={logoutModal}>
        <DeleteUserModal
          onDeleteSuccess={handleLogoutModalClose}
          userItem={userItem}
          isDelete={isDelete}
        />
      </AppModal>

      <AppModal show={isActivate}>
        <ActivateOrDeactivate
          onDeleteSuccess={handleLogoutModalClose}
          userItem={userItem}
          isDelete={isDelete}
        />
      </AppModal>

      <AppModal
        show={assignToBucket}
        onClose={handleLogoutModalClose}
        title="Assign to Bucket"
      >
        <AssignToBucketModal onDeleteSuccess={handleLogoutModalClose} />
      </AppModal>
    </>
  );
};

export default BaxterViewList;
