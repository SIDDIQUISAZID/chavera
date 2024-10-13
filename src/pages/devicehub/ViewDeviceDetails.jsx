import React, { useState, useMemo, useEffect } from "react";
import { LeftArrow } from "../../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import moment from "moment";
import { toast } from "react-toastify";
import { CircleLoader } from "../../components/Loader";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";

import {
  useGetDeviceDetailsQuery,
  useSyncMutation,
} from "../../features/dashboard/dashboardAPI";

export default function ViewDeviceDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const [isSyncing, setIsSyncing] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const params = useMemo(() => {
    return {
      deviceId: deviceId,
    };
  }, [deviceId]);

  const { isLoading, data } = useGetDeviceDetailsQuery(params);
  const [SyncMutation, { isLoading: isLoadingSyn }] = useSyncMutation();

  const handleSyncNow = async () => {
    setIsSyncing(true);
    const payload = { deviceId: deviceId };

    try {
      const deleteRes = await SyncMutation(payload).unwrap();
      if (deleteRes.status === 200) {
        setTimeout(() => {
          dispatch(dishNetworkApi.util.invalidateTags(["syncedDeviceDetails"]));
          setIsSyncing(false);
          toast.success(deleteRes.message);
        }, 10000);
        // toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Sync not successfully");
    }
  };

  return (
    <div className="w-full flex-row">
      <div>
        <div className="flex items-center font-poppins_cf text-[10px]">
          <LeftArrow onClick={() => goBack()} className="mr-2 cursor-pointer" />
          Device Hub | Device List<div className="mx-1">|</div>
          <div className="font-poppins_cf text-[10px] text-theme-dark">
            Device Details
          </div>
        </div>
        <div className="mt-2 flex font-poppins_cf text-lg font-medium text-theme-black">
          <div className="flex gap-2">
            <div className="flex font-poppins_cf text-lg ">
              {" "}
              Device Details{" "}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex font-poppins_cf text-lg text-theme-dark">
              Last Synced :{" "}
              {data?.data?.DeviceDetails?.lastSynced 
                ? moment
                    .utc(data?.data?.DeviceDetails?.lastSynced).local()
                    .format("YYYY-MM-DD HH:mm:ss A")
                : "Not Synced Yet"}
            </div>

            <button
              className="rounded-sm border bg-theme-white px-4 py-2 font-poppins_cf text-xs text-theme-black"
              disabled={isSyncing}
              onClick={handleSyncNow}
            >
              {isSyncing ? (
                <div className="flex">
                  <div className="mr-2">Syncing....</div>
                  <div>
                    <CircleLoader className="ml-auto" />
                  </div>
                </div>
              ) : (
                "Sync Now"
              )}
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PageLoader
          containerAttr={{ className: "bg-blue-light/40" }}
          loaderColor={"#EC1944"}
        />
      ) : (
        <div className="mt-4 h-fit w-full bg-white p-4">
          <div>
            <div>
              <div className="p-3 pb-1 pt-1">
                <h2 className="pb-2 font-poppins_cf text-sm font-medium text-theme-black">
                  Basic Device Information
                </h2>
                <hr />
              </div>
              <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    IMEI
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.imei1}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Serial Number
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.serialNo}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Phone Number
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.phoneNo
                      ? data?.data?.DeviceDetails?.phoneNo
                      : "--"}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Device Network
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.deviceNetwork}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    MCC/MNC
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.apnMcc
                      ? data?.data?.DeviceDetails?.apnMcc
                      : "---"}
                    /
                    {data?.data?.DeviceDetails?.apnMnc
                      ? data?.data?.DeviceDetails?.apnMnc
                      : "---"}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Carrier Name
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.carrierName}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Battery Percentage
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.batteryPercentage}%
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Make
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.make}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Model
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.model}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    OS Version
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.osVersion}
                  </div>
                </div>
                <div>
                  <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                    Device Type
                  </div>
                  <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                    {data?.data?.DeviceDetails?.deviceType}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="p-3 pb-1 pt-1">
              <h2 className="pb-2 font-poppins_cf text-sm font-medium text-theme-black">
                Network Information
              </h2>
              <hr />
            </div>
            <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  State
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.state
                    ? data?.data?.DeviceDetails?.state
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Operator Name
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.operatorName}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Operator Code
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.operatorCode}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Country
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.country}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Roaming
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.raoming ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Sim Technology
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.simTechnology
                    ? data?.data?.DeviceDetails?.simTechnology
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Network State
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.networkState}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="p-3 pb-1 pt-1">
              <h2 className="pb-2 font-poppins_cf text-sm font-medium text-theme-black">
                APN Configuration
              </h2>
              <hr />
            </div>
            <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Name
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnName
                    ? data?.data?.DeviceDetails?.apnName
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  APN
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnUrl
                    ? data?.data?.DeviceDetails?.apnUrl
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Proxy
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnProxy
                    ? data?.data?.DeviceDetails?.apnProxy
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Port
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnPort
                    ? data?.data?.DeviceDetails?.apnPort
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Server
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnServer
                    ? data?.data?.DeviceDetails?.apnServer
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  MMSC
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnMmsc
                    ? data?.data?.DeviceDetails?.apnMmsc
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  MMS Proxy
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnMmsProxy
                    ? data?.data?.DeviceDetails?.apnMmsProxy
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  MMS Port
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.MmsPort
                    ? data?.data?.DeviceDetails?.MmsPort
                    : "---"}
                </div>
              </div>

              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  MCC
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnMcc
                    ? data?.data?.DeviceDetails?.apnMcc
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  MNC
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnMnc
                    ? data?.data?.DeviceDetails?.apnMnc
                    : "---"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  Authentication Type
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnAuthenticationType
                    ? data?.data?.DeviceDetails?.apnAuthenticationType
                    : "--"}
                </div>
              </div>
              <div>
                <div className="mt-1 font-poppins_cf text-xs font-medium text-theme-black">
                  APN type
                </div>
                <div className="mt-1 font-poppins_cf text-xs font-normal text-theme-grey">
                  {data?.data?.DeviceDetails?.apnType
                    ? data?.data?.DeviceDetails?.apnType
                    : "--"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
