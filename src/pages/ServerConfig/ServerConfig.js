import { useState, useMemo, useCallback, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppTable } from "../../components/Table";
import PageLoader from "../../components/Loader/PageLoader";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import { useGetServerListQuery } from "../../features/dashboard/dashboardAPI";
import { Dropdown, Space } from "antd";
import {
  LeftChevIcon,
  RightChevIcon,
  Ic_Action,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";
import { addSErver } from "../../utils/commonTextFile";
import AppModal from "../../components/Modal/AppModal";
import DeleteServerModal from "./DeleteServerModal";
import AddServerModal from "./AddServerModal";
import Button from "../../components/Button";

const ServerConfig = () => {
  const [serverItem, setServerItem] = useState();
  const [searchParams] = useSearchParams();
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

  const { isLoading, data, isFetching } = useGetServerListQuery();

  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 1);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });
  const [isActivate, setActivate] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";
  const onDelete = (user) => {
    setDelete(true);
    setServerItem(user);
  };

  const getDropdownItems = () => {
    return [
      { key: "1", label: "Edit" },
      { key: "2", label: "Delete" },
    ];
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDropdownItemClick = (item, serverData) => {
    console.log(serverData, "chechhhhh");
    if (item?.key === "1") {
      setActivate(true);
      setServerItem(serverData);
    } else if (item?.key === "2") {
      onDelete(serverData);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Server Name",
        dataIndex: "serverName",
        key: "serverName",
        render: (_, e) => <div className={tableStyle}>{e?.serverName}</div>,
      },
      {
        title: "Server IP",
        dataIndex: "serverIp",
        key: "serverIP",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.serverIP}</div>
          </div>
        ),
      },
      {
        title: "Port/Range",
        dataIndex: "port",
        key: "port",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.portRangeEnd}</div>
          </div>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.description}</div>
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, e) => (
          <Space size="small">
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
  }, [handleDropdownItemClick]);

  const handleLogoutModalClose = useCallback(() => {
    setActivate(false);
    setDelete(false);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins_w text-xl font-medium text-theme-black">
              List of Servers
            </div>
            <div className="flex">
              <Button
                className="h-10 rounded border-[1px] bg-theme-dark px-3  font-poppins_cf text-xs font-medium text-theme-white sm:px-2"
                onClick={() => {
                  setActivate(true);
                  setServerItem();
                }}
              >
                <AddIcon />
                {addSErver}
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
              dataSource={data?.data?.servers || []}
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

      <AppModal
        title={serverItem ? "Edit Server Details" : "Add New Server"}
        show={isActivate}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-2/5 rounded-[4px]"}
      >
        <AddServerModal
          onDeleteSuccess={handleLogoutModalClose}
          serverItem={serverItem}
        />
      </AppModal>
      <AppModal show={isDelete}>
        <DeleteServerModal
          onDeleteSuccess={handleLogoutModalClose}
          isDelete={isDelete}
          serverItem={serverItem}
        />
      </AppModal>
    </>
  );
};

export default ServerConfig;
