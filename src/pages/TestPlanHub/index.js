import { useState, useMemo, useCallback, useEffect } from "react";
import { AppTable } from "../../components/Table";
import SearchInput from "../../components/Input/SearchInput";
import { TableContainer} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Dropdown, Space } from "antd";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import PageLoader from "../../components/Loader/PageLoader";
import AppModal from "../../components/Modal/AppModal";
import DeleteTestPlanModal from "./DeleteTestPlanModal";
import ExecuteTestPlan from "./ExecuteTestPlan";
import ImportModal from "./ImportModal";
import Button from "../../components/Button";
import {
  LeftChevIcon,
  RightChevIcon,
  IC_Player,
  ICExport,
  ICImport,
  Ic_Action,
  IC_STATUS,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import {
  useGetTestPlanListQuery,
  useCloneTestPlanMutation,
} from "../../features/dashboard/dashboardAPI";
import { el } from "date-fns/locale";

const AccessManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });

  const [isDelete, setDelete] = useState(false);
  const [isExecute, setExecute] = useState(false);
  const [openModalImport, setModalImport] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

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
    };
  }, [page, perPage, searchName]);
  const { data, isLoading, isFetching } = useGetTestPlanListQuery({ params });
  const [cloneTestPlan, { loading, error }] = useCloneTestPlanMutation();

  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCount)) {
      setTotalDataCount(data?.data?.totalCount || 1);
    }
  }, [data?.data?.totalCount, setTotalDataCount]);
  usePaginationSearch({ page, perPage });

  const convertSecondsToMMSS = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const tableStyle =
    "w-full truncate text-theme-grey text-xs	font-normal  font-poppins_cf";
  const handleCloneTestPlan = async (testPlanId) => {
    const payload = {
      tpId: testPlanId,
    };

    try {
      const response = await cloneTestPlan(payload);
      if (response?.data?.status === 200) {
        toast.success(
          response?.data?.message || "Test case cloned successfully!"
        );
        dispatch(dishNetworkApi.util.invalidateTags(["testPlanList"]));
      } else {
        toast.error(response?.data?.message || "Failed to clone test case.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const items = [
    { key: "3", label: "Clone" },
    { key: "4", label: "View" },
    { key: "1", label: "Edit" },
    { key: "2", label: "Delete" },
  ];

  const handleDropdownItemClick = (index, item) => {
    console.log(item);
    if (index.key === "3") {
      handleCloneTestPlan(item?.tpId);
    }
    if (index.key === "1") {
      navigate(`/testPlanHub/testPlanList/edit-test-plan/${item?.tpId}`, {
        state: { item: item },
      });
    } else if (index.key === "2") {
      setSelectedItem(item);
      setDelete(true);
    } else if (index.key === "4") {
      navigate(`/testPlanHub/testPlanList/testCases/${item?.tpId}`);
    }
  };

  const execute = (item) => {
    setSelectedItem(item);
    setExecute(true);
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Test Plan ID",
        dataIndex: "tpTestPlanId",
        key: "tpTestPlanId",

        render: (_, e) => (
          <div
            className="mx-2 w-full cursor-pointer truncate font-poppins_cf	text-xs font-normal text-theme-blue underline"
            onClick={() =>
              navigate(`/testPlanHub/testPlanList/testCases/${e?.tpId}`)
            }
          >
            {e?.tpTestPlanId}
          </div>
        ),
      },
      {
        title: <div className="flex items-center">Test Plan Name</div>,
        dataIndex: "tpName",
        key: "tpName",

        render: (_, e) => <div className={tableStyle}>{e.tpName}</div>,
      },
      {
        title: "No. of  Testcases",
        dataIndex: "noOfTestcases",
        key: "noOfTestcases",

        render: (_, e) => <div className={tableStyle}>{e?.tcCount}</div>,
      },

      {
        title: "Duration(mm:ss)",
        dataIndex: "tpDuration",
        key: "tpDuration",

        render: (_, e) => (
          <div>
            <div className={tableStyle}>
              {convertSecondsToMMSS(e?.tpDuration || 0)}
            </div>
          </div>
        ),
      },
      {
        title: "Devices Required",
        dataIndex: "devicesRequired",
        key: "devicesRequired",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.tpDeviceRequired}</div>
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",

        render: (_, item) => (
          <Space size="small">
            <Dropdown
              className="cursor-pointer"
              menu={{
                items,
                onClick: (index) => handleDropdownItemClick(index, item),
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
  }, [data?.data?.testPlanDetails]);

  const handleLogoutModalClose = useCallback(() => {
    setDelete(false);
    setModalImport(false);
    setExecute(false);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins_cf text-xl font-medium text-theme-black">
              Test Plan
            </div>

            <div className="flex  justify-between gap-2">
              <SearchInput
                searchName={searchName}
                setSearchName={setSearchName}
                placeholder={"Search.."}
                wrapperAttr={"h-[38px]"}
              />
              <Button
                className="bg-theme-dark text-theme-white font-poppins_cf text-xs font-medium px-3 sm:px-2 rounded border-[1px]"
                onClick={() => {
                  navigate(`/testPlanHub/addTestPlan/`);
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
              rowKey={"serialNumber"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
              dataSource={data?.data?.testPlanDetails || []}
              columns={columns}
              pagination={false}
              size="small"
            ></AppTable>
          )}

          <div className="flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs mb-4">
            <div className="flex items-center justify-end space-x-2 text-[10px] xs:text-xs">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Total count {data?.data?.totalCount || 0}
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
      <AppModal show={isDelete}>
        <DeleteTestPlanModal
          onDeleteSuccess={handleLogoutModalClose}
          bucketItem={selectedItem}
        />
      </AppModal>
      <AppModal
        show={isExecute}
        modalClass={"w-[calc(100%-90px)] md:w-[calc(55%)] rounded-[4px]"}
      >
        <ExecuteTestPlan
          onDeleteSuccess={handleLogoutModalClose}
          testPlanItem={selectedItem}
        />
      </AppModal>

      <AppModal
        show={openModalImport}
        title="Import test plan"
        onClose={handleLogoutModalClose}
      >
        <ImportModal onDeleteSuccess={handleLogoutModalClose} />
      </AppModal>
    </>
  );
};

export default AccessManagement;
