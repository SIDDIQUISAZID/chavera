import { useState, useMemo, useCallback, useEffect } from "react";
import { TableContainer, Button } from "@mui/material";
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
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

import { addSErver } from "../../utils/commonTextFile";
import AppModal from "../../components/Modal/AppModal";
import DeleteServerModal from "./DeleteServerModal";
import AddServerModal from "./AddServerModal";
import AddConfigFilesModal from "./AddConfigFilesModal";
import DeleteConfigFileModal from "./DeleteConfigFileModal";

const ConfigFiles = () => {
  const [serverItem, setServerItem] = useState();
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

  const { isLoading, data, isFetching } = useGetServerListQuery();

  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 1);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });
  const [isActivate, setActivate] = useState(false);
  const [isDelete, setDelete] = useState(false);
  // const [serverItem, setServerItem] = useState();

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";
  const onDelete = (user) => {
    setDelete(true);
    setServerItem(user);
  };

  const getDropdownItems = () => {
    return [
      { key: "1", label: "Edit" },
      { key: "2", label: "Download" },
      { key: "3", label: "Delete" },
    ];
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDropdownItemClick = (item, serverData) => {
    console.log(serverData, "chechhhhh");
    if (item?.key === "1") {
      setActivate(true);
      setServerItem(serverData);
    } else if (item?.key === "3") {
      onDelete(serverData);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: "File Name",
        dataIndex: "fileName",
        key: "fileName",
        render: (_, e) => <div className={tableStyle}>{e?.serverName}</div>,
      },
      {
        title: "File Type",
        dataIndex: "serverIp",
        key: "serverIP",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.serverIP}</div>
          </div>
        ),
      },
      {
        title: "File size",
        dataIndex: "port",
        key: "port",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.portRangeEnd}</div>
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
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins_w text-xl font-medium text-theme-black">
              Config files
            </div>
            <div className="flex">
              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{
                  backgroundColor: "#EC1944",
                  color: "white",
                  marginLeft: "8px",
                  padding: "8px",
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setActivate(true);
                  setServerItem();
                }}
              >
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

          <div className="flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs mb-4">
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
        title={serverItem ? "Edit File" : "Add File"}
        show={isActivate}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-2/5 rounded-[4px]"}
      >
        <AddConfigFilesModal
          onDeleteSuccess={handleLogoutModalClose}
          serverItem={serverItem}
        />
      </AppModal>

      <AppModal show={isDelete}>
        < DeleteConfigFileModal
          onDeleteSuccess={handleLogoutModalClose}
          isDelete={isDelete}
          serverItem={serverItem}
        />
      </AppModal>
    </>
  );
};

export default ConfigFiles;
