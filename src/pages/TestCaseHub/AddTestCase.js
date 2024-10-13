import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  LeftArrow,
  IV_COMMENT,
  IV_DELETE,
  IV_CONF_CALL,
  IV_CALL,
  IV_THROUGH_PUT,
  IV_SMS,
  IV_RCS,
  IV_IMS,
  IV_SWITCH,
  DRAG_ICON,
} from "../../assets/icons";
import Input from "../../components/Input/Input";
import { Select } from "../../components/Select";
import {
  useAddTestCaseMutation,
  useGetCategoryQuery,
  useUpdateTestCaseMutation,
  useGetServerListQuery,
} from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { CircleLoader } from "../../components/Loader";
import dragula from "dragula";

import { ROUTES } from "../../Router";
import "dragula/dist/dragula.css";

import { Table } from "antd";

import "./DraggableTable.css";

import { z } from "zod";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
// import { set } from "date-fns";

const getIndexInParent = (el) => Array.from(el.parentNode.children).indexOf(el);
const AddTestCase = () => {
  const { addTestCase } = useParams();
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const directionFilter = [
    { value: "UPLINK", label: "UPLINK" },
    { value: "DOWNLINK", label: "DOWNLINK" },
    { value: "BIDIRECTIONAL", label: "BIDIRECTIONAL" },
  ];
  const protocolFilter = [
    { value: "TCP", label: "TCP" },
    { value: "UDP", label: "UDP" },
  ];

  const { data: categoriesData, isFetching: isFetchingCategories } =
    useGetCategoryQuery({ page: 0, size: 50 });

  const {
    isLoading: isLoadingHost,
    data: dataHost,
    isFetching,
  } = useGetServerListQuery();

  const commandsList = useMemo(() => {
    if (!categoriesData?.data?.commands) {
      return [];
    }
    return categoriesData?.data?.commands?.map((item) => ({
      ...item,
      isSelect: false,
    }));
  }, [categoriesData?.data?.commands]);

  const [commandsAllList, setCommandsAllList] = useState(commandsList);
  const updatedCommands = commandsList.map((command) => {
    const isMatch = state?.item?.commands.some(
      (item) => item.commandId === command.commandId
    );
    if (isMatch) {
      return { ...command, isSelect: false };
    }
    return command;
  });

  useEffect(() => {
    setCommandsAllList(
      addTestCase !== "edit-test-cases" ? commandsList : updatedCommands
    ); // Update the commands state when commandsList changes
  }, [commandsList]);

  const filterOptionsHostName = useMemo(() => {
    if (!dataHost?.data?.servers) {
      return [];
    }
    return dataHost?.data?.servers.map(({ serverName, serverId }) => ({
      label: serverName,
      value: serverName,
    }));
  }, [dataHost]);

  const filterOptionsHostPort = useMemo(() => {
    if (!dataHost?.data?.servers) {
      return [];
    }
    return dataHost?.data?.servers.map(({ portRangeEnd, serverId }) => ({
      label: portRangeEnd,
      value: portRangeEnd,
    }));
  }, [dataHost]);

  // Add test case mutation
  const [addTestCaseMutation, { isLoading }] = useAddTestCaseMutation();

  const [UpdateTestCase, { isLoading: isLoadingUpdate }] =
    useUpdateTestCaseMutation();

  const initialValues =
    addTestCase !== "edit-test-cases"
      ? {
          tcName: "",
          tcDescription: "",
          commandId: "",
          commandIterationDuration: "",
          tcDevicesRequired: state?.item?.tcDevicesRequired || "",
          message_text: "",
          throughput_hostname: "",
          throughput_port: "",
          throughput_bitrate: "",
          throughput_direction: "",
          throughput_protocol: "",

          throughput_username: "",
          throughput_password: "",
          contact_number: "",
        }
      : {
          tcName: state?.item?.tcName || "",
          tcDescription: state?.item?.tcDescription || "",
          commandIterationDuration: state?.item?.tcDuration || "",
          tcDevicesRequired: state?.item?.tcDevicesRequired || "",
          message_text: "",
          throughput_hostname: "",
          throughput_port: "",
          throughput_bitrate: "",
          throughput_direction: "",
          throughput_protocol: "",

          throughput_username: "",
          throughput_password: "",
          contact_number: "",
        };
  const [formData, setFormData] = useState(initialValues);

  const groupCommandsByOrderNo = (commands) => {
    return commands.reduce((acc, commands) => {
      // If there isn't already a commandList for this `commandOrderNo`, initialize it
      if (!acc[commands?.commandOrderNo]) {
        acc.push({ commands: [] });
      }
      // Push the current command into the array for the respective commandOrderNo group
      acc[commands.commandOrderNo]?.commands.push(commands);
      return acc;
    }, []);
  };

  const editCommands = useMemo(() => {
    if (!state?.item?.commands) {
      return [];
    }
    return state?.item?.commands?.map((item) => ({
      ...item,
      commandOrderNo: item.commandOrderNo - 1,
      orderNo: item.commandOrderNo - 1,
    }));
  }, [state?.item?.command]);

  const [selectedCommands, setSelectedCommands] = useState(
    addTestCase === "edit-test-cases"
      ? groupCommandsByOrderNo(editCommands) || []
      : []
  );

  const [selectedCommandDetails, setSelectedCommandDetails] = useState();
  const [selectedCommandPosition, setSelectedCommandPosition] = useState(1);

  const [selectedCommandPositionChild, setSelectedCommandPositionChild] =
    useState(0);

  const tableStyle =
    "w-full truncate text-theme-grey text-xs font-poppins_cf  font-normal mx-2 w-fit";

  const removeSelectedCommand = (indexParent, indexChild) => {
    const newData = [...selectedCommands];
    newData[indexParent].commands.splice(indexChild, 1);
    const cleanedData = newData.filter((item) => item.commands.length > 0);
    setSelectedCommands(cleanedData);
  };

  const onClickCommand = (item, index, indexChild) => {
    if (
      selectedCommands[index]?.commands[indexChild].commandParamInfo !==
      undefined
    ) {
      setValue(
        "commandIterationDuration",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.commandIterationDuration || ""
      );

      setValue(
        "devicesRequired",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.devicesRequired || ""
      );

      setValue(
        "numberOfIterations",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.numberOfIterations || ""
      );

      setValue(
        "commandIterationDelay",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.commandIterationDelay || ""
      );

      setValue(
        "message_text",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.message_text || ""
      );

      setValue(
        "throughput_hostname",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_hostname || ""
      );

      setFormData({
        throughput_hostname:
          JSON.parse(
            selectedCommands[index]?.commands[indexChild].commandParamInfo
          )?.throughput_hostname || "",
      });

      setValue(
        "throughput_port",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_port || ""
      );

      setValue(
        "throughput_bitrate",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_bitrate || ""
      );

      setValue(
        "throughput_direction",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_direction || ""
      );

      setValue(
        "throughput_protocol",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_protocol || ""
      );

      setFormData({
        throughput_protocol:
          JSON.parse(
            selectedCommands[index]?.commands[indexChild].commandParamInfo
          )?.throughput_protocol || "",
        throughput_direction:
          JSON.parse(
            selectedCommands[index]?.commands[indexChild].commandParamInfo
          )?.throughput_direction || "",
        throughput_port:
          JSON.parse(
            selectedCommands[index]?.commands[indexChild].commandParamInfo
          )?.throughput_port || "",
        throughput_hostname:
          JSON.parse(
            selectedCommands[index]?.commands[indexChild].commandParamInfo
          )?.throughput_hostname || "",
      });

      setValue(
        "throughput_username",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_username || ""
      );

      setValue(
        "throughput_password",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.throughput_password || ""
      );

      setValue(
        "contact_number",
        JSON.parse(
          selectedCommands[index]?.commands[indexChild].commandParamInfo
        )?.contact_number || ""
      );
    }

    if (
      selectedCommands[index]?.commands[indexChild].commandParamInfo ===
      undefined
    ) {
      setValue("commandIterationDuration", "");

      if (item?.isDeviceCountFixed) {
        setValue("devicesRequired", item?.devicesRequired);
      }

      setValue("numberOfIterations", "");
      setValue("commandIterationDelay", "");
      setValue("message_text", "");
      setValue("throughput_hostname", "");
      setValue("throughput_port", "");
      setValue("throughput_bitrate", "");
      setValue("throughput_direction", "");
      setValue("throughput_protocol", "");
      setValue("throughput_username", "");
      setValue("throughput_password", "");
      setValue("contact_number", "");
    }

    setSelectedCommandDetails(item);
    setSelectedCommandPosition(index);
    setSelectedCommandPositionChild(indexChild);
  };

  // const handleReorder = (dragIndex, draggedIndex) => {

  //   console.log("dragIndex",dragIndex)
  //   console.log("draggedIndex",draggedIndex)

  //   setSelectedCommands((oldStateSwapable) => {
  //     const newState = [...oldStateSwapable];

  //     newState[draggedIndex].commands.push(...newState[dragIndex].commands);

  //     // if (dragIndex >= 0) {
  //     //   newState?.splice(dragIndex, 1);
  //     // }

  //     return newState?.filter((item,index) => index != dragIndex)
  //     ;
  //   });

  //   // Push it into the first object's commands array
  // };

  const handleReorder = (dragIndex, draggedIndex) => {
    setSelectedCommands((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      return newState;
    });
  };
  useEffect(() => {
    let start;
    let end;

    const container = document.querySelector(".ant-table-tbody");

    const drake = dragula([container], {
      moves: (el) => {
        start = getIndexInParent(el);

        return true;
      },
      passive: false,
    });

    drake.on("drop", (el) => {
      end = getIndexInParent(el);
      handleReorder(start, end);
    });
    return () => {
      drake.destroy();
    };
  }, []);

  const columns = useMemo(() => {
    return [
      {
        title: "",
        dataIndex: "title",
        key: "title",
        width: "5%",
        render: (_) => <DRAG_ICON className="draggable" type="swap" />,
      },
      {
        title: "Testcase Commands",
        dataIndex: "commands",
        key: "commands",

        render: (_, item, index) => (
          <div className=" flex flex-wrap gap-4">
            {item?.commands?.map((item, indexChild) => (
              <div
                id={"index"}
                className={
                  !item?.commandParamInfo
                    ? " flex  items-center rounded-md border-[1px] border-theme-dark px-1.5 py-1.5"
                    : " flex  items-center rounded-md border-[1px] border-theme-green px-1.5 py-1.5"
                }
                onClick={() => onClickCommand(item, index, indexChild)}
              >
                {item?.commandName?.includes("Call") ? (
                  <IV_CALL />
                ) : item?.commandName?.includes("Throughput") ? (
                  <IV_THROUGH_PUT />
                ) : item?.commandName?.includes("SMS") ? (
                  <IV_SMS />
                ) : item?.commandName?.includes("RCS") ? (
                  <IV_RCS />
                ) : item?.commandName?.includes("IMS") ? (
                  <IV_IMS />
                ) : item?.commandName?.includes("Conference Call") ? (
                  <IV_CONF_CALL />
                ) : (
                  <IV_CONF_CALL />
                )}
                <div className={tableStyle}>{item?.commandName}</div>{" "}
                <IV_DELETE
                  className=" cursor-pointer"
                  onClick={() => removeSelectedCommand(index, indexChild)}
                />
              </div>
            ))}
          </div>
        ),
      },
    ];
  });

  const AddTestCaseSchema = z.object(
    selectedCommandDetails?.commandName?.includes("Throughput IPerf")
      ? {
          tcName: z.string().nonempty("Please enter full name"),
          commandIterationDuration: z
            .string()
            .nonempty("Please enter test case Description"),

          throughput_hostname: z
            .string()
            .nonempty("Please enter throughput host name"),
          throughput_port: z
            .string()
            .nonempty("Please enter throughput port")
            .max(4),
          throughput_bitrate: z
            .string()
            .nonempty("Please enter throughput bitrate"),
          throughput_direction: z
            .string()
            .nonempty("Please enter throughput direction"),
          throughput_protocol: z
            .string()
            .nonempty("Please enter throughput protocol"),
        }
      : selectedCommandDetails?.commandName?.includes("Throughput Http")
      ? {
          tcName: z.string().nonempty("Please enter full name"),
          commandIterationDuration: z
            .string()
            .nonempty("Please enter test case Description"),
          throughput_direction: z
            .string()
            .nonempty("Please enter throughput direction"),
        }
      : selectedCommandDetails?.commandName?.includes("Verify Contacts")
      ? {
          tcName: z.string().nonempty("Please enter full name"),
          commandIterationDuration: z
            .string()
            .nonempty("Please enter test case Description"),
          contact_number: z.string().nonempty("Please enter contact number"),
        }
      : selectedCommandDetails?.commandName?.includes("Throughput Ftp")
      ? {
          tcName: z.string().nonempty("Please enter full name"),
          commandIterationDuration: z
            .string()
            .nonempty("Please enter test case Description"),
          throughput_hostname: z
            .string()
            .nonempty("Please enter throughput host name"),
          throughput_username: z.string().nonempty("Please enter user name"),
          throughput_password: z.string().nonempty("Please enter password"),
          throughput_direction: z
            .string()
            .nonempty("Please enter throughput direction"),
        }
      : selectedCommandDetails?.commandName?.includes("SMS")
      ? {
          tcName: z.string().nonempty("Please enter full name"),
          commandIterationDuration: z
            .string()
            .nonempty("Please enter test case Description"),
          message_text: z.string().nonempty("Please enter message text"),
        }
      : {
          tcName: z.string().nonempty("Please enter full name"),
          tcDescription: z.string().nonempty("Please enter description"),
          commandIterationDuration: z
            .string()
            .nonempty("Please enter test case Description"),
        }
  );

  const onSelectProtoAndDirectionChange = (name, selectedOption) => {
    if (
      name === "throughput_direction" ||
      name === "throughput_protocol" ||
      name === "throughput_hostname" ||
      name === "throughput_port"
    ) {
      setFormData({ ...formData, [name]: selectedOption?.value });
      setValue(name, selectedOption?.value);
    } else {
      setFormData({ ...formData, [name]: selectedOption?.value });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors: addTestCaseErrors, isDirty: bucketFormDirty },
    setValue,

    setError,
    reset,
    clearErrors,
  } = useForm({
    // resolver: zodResolver(AddTestCaseSchema),
    defaultValues: initialValues,
  });

  const handleSaveInputs = (values, selectedCommands) => {
    const updatedCommands = selectedCommands?.map(
      (command, index) =>
        index === selectedCommandPosition
          ? {
              ...command,
              commands: command?.commands?.map(
                (childCommand, childIndex) =>
                  childIndex === selectedCommandPositionChild
                    ? {
                        ...childCommand,
                        //orderNo: addTestCase !== "edit-test-cases"?selectedCommandPosition+1:selectedCommandPosition,
                        // Updating the commandParamInfo of the nested command
                        commandParamInfo: JSON.stringify(values), // Add your values to the nested command

                        devicesRequired: values?.devicesRequired || 0,
                        numberOfIterations: values?.numberOfIterations || 0,
                        commandIterationDuration:
                          values?.commandIterationDuration
                            ? values.commandIterationDuration
                            : 0,
                        commandIterationDelay: values?.commandIterationDelay
                          ? values.commandIterationDelay
                          : 0,
                      }
                    : childCommand // Keep other child commands unchanged
              ),
            }
          : command // Keep other objects unchanged
    );

    setSelectedCommands(updatedCommands);

    if (!selectedCommands || selectedCommands.length === 0) {
      toast.error("At least one command must be selected to save inputs.");
      return;
    }
    toast.success("Inputs saved successfully!");
  };

  const handleAddTestCase = async (values) => {
    const updatedCommands = selectedCommands.reduce(
      (acc, group, groupIndex) => {
        const updatedGroupCommands = group.commands.map(
          (command, commandIndex) => ({
            ...command,
            commandOrderNo: groupIndex + 1,
            orderNo: groupIndex + 1,
          })
        );
        return [...acc, ...updatedGroupCommands];
      },
      []
    );

    const payload = {
      tcName: values.tcName || "",
      tcDescription: values.tcDescription || "",
      commands: updatedCommands,
    };

    try {
      let response;
      if (addTestCase !== "edit-test-cases") {
        response = await addTestCaseMutation(payload).unwrap();
      } else {
        response = await UpdateTestCase({
          ...payload,
          tcId: state?.item?.tcId, // Use existing tcId for update
        }).unwrap();
      }

      if (response?.status === 200) {
        toast.success(response.message);
        navigate(ROUTES.TEST_CASE_LIST);
      } else {
        toast.error(
          `Failed to update test case: ${response?.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update test case");
    }
  };

  const goBack = () => {
    if (
      selectedCommands[selectedCommandPosition]?.commands[
        selectedCommandPositionChild
      ].commandParamInfo !== undefined
    ) {
      setValue("commandIterationDuration", "");

      setValue("numberOfIterations", "");
      setValue("commandIterationDelay", "");
      setValue("message_text", "");
      setValue("throughput_hostname", "");
      setValue("throughput_port", "");
      setValue("throughput_bitrate", "");
      setValue("throughput_direction", "");
      setValue("throughput_protocol", "");
      setValue("throughput_username", "");
      setValue("throughput_password", "");
      setValue("contact_number", "");
    }
  };

  const onReset = () => {
    if (
      selectedCommands[selectedCommandPosition]?.commands[
        selectedCommandPositionChild
      ].commandParamInfo !== undefined
    ) {
      setValue("commandIterationDuration", "");

      setValue("numberOfIterations", "");
      setValue("commandIterationDelay", "");
      setValue("message_text", "");
      setValue("throughput_hostname", "");
      setValue("throughput_port", "");
      setValue("throughput_bitrate", "");
      setValue("throughput_direction", "");
      setValue("throughput_protocol", "");
      setValue("throughput_username", "");
      setValue("throughput_password", "");
      setValue("contact_number", "");
    }
  };

  const onCommandItem = (item, index) => {
    setCommandsAllList((prevCommands) =>
      prevCommands.map((command) =>
        command.commandId === item.commandId
          ? { ...command, isSelect: !command.isSelect }
          : command
      )
    );
  };

  const onSwitchAllItem = () => {
    if (commandsAllList?.filter((command) => command.isSelect)?.length == 0) {
      toast.error("Please select commands");
      return;
    }

    const updatedCommands = commandsAllList?.filter(
      (command) => command.isSelect
    ); // Filter based on isSelect being true
   

    let switchedCommands = {
      index:selectedCommands?.length,
      commands: updatedCommands,
    };
    setSelectedCommands([...selectedCommands, switchedCommands]);

    console.log('selectedCommandsselectedCommands',selectedCommands)


    const updatedCommandsRefresh = commandsAllList.map((command) => ({
      ...command,
      isSelect: false, // Set 'isSelect' to false
    }));

    setCommandsAllList(updatedCommandsRefresh);
    //setSelectedCommands([]);
  };

  const onCancel = () => {
    setSelectedCommandDetails(undefined);
    setSelectedCommands([]);
  };

  return (
    <>
      <div className="flex-cols w-full">
        <div className="flex items-center">
          {(addTestCase === "add-test-cases" ||
            addTestCase === "edit-test-cases") && (
            <LeftArrow onClick={goBack} className="mr-2 cursor-pointer" />
          )}
        </div>

        <div className="w-full flex-col">
          <div className="mb-2 text-lg font-medium text-theme-black">
            {addTestCase !== "edit-test-cases"
              ? "Add/Create Testcase"
              : "Edit Testcase"}
          </div>

          <div>
            <form
              novalidate="novalidate"
              onSubmit={handleSubmit(handleAddTestCase)}
            >
              <div className="flex justify-between gap-2">
                <div className=" w-60 min-w-60 rounded-sm border-[1px] bg-white p-3 pb-0">
                  <div className="mb-1 font-poppins_cf text-xs text-theme-black">
                    Testcase Commands
                  </div>

                  <div className="mb-3 w-full">
                    {commandsAllList?.map((item, index) => (
                      <div
                        className={`mx-2 mt-1 flex w-fit cursor-pointer gap-2 rounded-md border-[1px] 
          ${
            item.isSelect ? "border-green-500 bg-green-100" : "border-gray-300"
          } 
          px-2 py-1`}
                        // className="mx-2 mt-1 flex w-fit cursor-pointer gap-2 rounded-md border-[1px] border-gray-300  px-2 py-1"
                        onClick={() => {
                          onCommandItem(item, index);
                        }}
                      >
                        {item?.commandName?.includes("Call") ? (
                          <IV_CALL />
                        ) : item?.commandName?.includes("Throughput") ? (
                          <IV_THROUGH_PUT />
                        ) : item?.commandName?.includes("SMS") ? (
                          <IV_SMS />
                        ) : item?.commandName?.includes("RCS") ? (
                          <IV_RCS />
                        ) : item?.commandName?.includes("IMS") ? (
                          <IV_IMS />
                        ) : item?.commandName?.includes("Conference Call") ? (
                          <IV_CONF_CALL />
                        ) : (
                          <IV_CONF_CALL />
                        )}

                        <div className="font-poppins_cf text-xs text-theme-black">
                          {item?.commandName}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="absolute  z-50  ml-[215px] cursor-pointer self-center"
                  onClick={onSwitchAllItem}
                >
                  <IV_SWITCH />
                </div>

                <div className=" w-full rounded-sm border-[1px]  bg-white p-4 px-6 pt-0">
                  <div className="mt-10 flex  gap-3">
                    <Input
                      name="tcName"
                      type="text"
                      placeholder="Enter Testcase Name"
                      {...register("tcName")}
                      errors={addTestCaseErrors}
                      wrapperClass="mb-4"
                      wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                      required
                    >
                      Test Case Name
                    </Input>

                    <Input
                      name="tcDescription"
                      type="text"
                      placeholder="Testcase Description"
                      {...register("tcDescription")}
                      errors={addTestCaseErrors}
                      wrapperClass="mb-4"
                      wrapperAttr={{ className: "w-full" }}
                      autoComplete="off"
                      required
                      customLabel="Testcase Description"
                    >
                      Testcase Description
                    </Input>
                  </div>

                  <div className={"w-full"}>
                    <Table
                      className="border-blue-light    orderDetailsProduct overflow-auto border  text-xs font-normal  text-theme-grey"
                      dataSource={selectedCommands}
                      columns={columns}
                      rowKey={"index"}
                      pagination={false}
                      locale="Drag and Drop test commands here"
                      size="small"
                    ></Table>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      title="Close popup"
                      className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      className=" rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
                      disabled={!bucketFormDirty}
                    >
                      {isLoading || isLoadingUpdate ? (
                        <>
                          <div className="mr-2">Loading.....</div>
                          <CircleLoader className="ml-auto" />
                        </>
                      ) : (
                        <>
                          {addTestCase !== "edit-test-cases"
                            ? "Create"
                            : "Edit"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex h-fit w-96 flex-col items-center rounded-sm border-[1px] bg-white p-4 pb-0 pt-2 align-middle">
                  <div className="font-poppins_cf text-xs font-semibold text-theme-black">
                    {selectedCommandDetails
                      ? selectedCommandDetails?.commandName + " Parameters"
                      : "Command Parameters"}
                  </div>

                  {selectedCommandDetails ? (
                    <div className="mb-3 w-full mt-4">
                      <div className="mt-6">
                        <Input
                          name="commandIterationDuration"
                          type="number"
                          placeholder="Enter Value"
                          required
                          step={1}
                          min={1}
                          wrapperClass="border-[0.5px] border-theme-dark hits-theme-dark text-[10px]"
                          className="spinner sm:w-full"
                          {...register("commandIterationDuration")}
                        >
                          Duration (seconds)
                        </Input>

                        <Input
                          name="devicesRequired"
                          wrapperClass="mt-6"
                          type="number"
                          placeholder="Enter Value"
                          required
                          step={1}
                          min={1}
                          readOnly={selectedCommandDetails?.isDeviceCountFixed}
                          className="spinner sm:w-full"
                          // readOnly={addTestCase !== "edit-test-cases"}
                          // defaultValue={formData.tc_dut_required}
                          {...register("devicesRequired")}
                        >
                          Device Required
                        </Input>
                      </div>

                      <div className="mt-6 flex gap-4">
                        <Input
                          name="numberOfIterations"
                          type="number"
                          placeholder="Value"
                          className="spinner sm:w-full"
                          {...register("numberOfIterations")}
                        >
                          Iteration
                        </Input>

                        <Input
                          name="commandIterationDelay"
                          type="number"
                          placeholder="Value"
                          className="spinner sm:w-full"
                          {...register("commandIterationDelay")}
                        >
                          Delay
                        </Input>
                      </div>

                      <div>
                        {selectedCommandDetails?.commandName?.includes(
                          "Throughput IPerf"
                        ) && (
                          <div>
                            <Select
                              customLabel="Enter host name"
                              options={filterOptionsHostName}
                              value={filterOptionsHostName.find(
                                (option) =>
                                  option?.label ===
                                  formData?.throughput_hostname
                              )}
                              onChange={(selectedOption) => {
                                onSelectProtoAndDirectionChange(
                                  "throughput_hostname",
                                  selectedOption
                                );
                                clearErrors();
                              }}
                              placeholder="Select"
                              wrapperAttr={{
                                className: "h-[35px] w-full mt-4",
                              }}
                              clearable
                              required
                            />

                            <Select
                              customLabel="Throughput port"
                              options={filterOptionsHostPort}
                              value={filterOptionsHostPort.find(
                                (option) =>
                                  option?.label === formData?.throughput_port
                              )}
                              onChange={(selectedOption) => {
                                onSelectProtoAndDirectionChange(
                                  "throughput_port",
                                  selectedOption
                                );
                                clearErrors();
                              }}
                              placeholder="Select"
                              wrapperAttr={{
                                className: "h-[35px] w-full mt-8",
                              }}
                              clearable
                              required
                            />
                            <Input
                              name="throughput_bitrate"
                              type="text"
                              placeholder="Enter throughput bitrate"
                              {...register("throughput_bitrate")}
                              wrapperClass="mt-6"
                              wrapperAttr={{ className: "h-[35px] w-full " }}
                            >
                              Throughput bitrate
                            </Input>

                            <Select
                              customLabel="Throughput direction"
                              options={directionFilter}
                              value={directionFilter.find(
                                (option) =>
                                  option?.label ===
                                  formData?.throughput_direction
                              )}
                              onChange={(selectedOption) => {
                                onSelectProtoAndDirectionChange(
                                  "throughput_direction",
                                  selectedOption
                                );
                                clearErrors();
                              }}
                              placeholder="Select"
                              wrapperAttr={{
                                className: "h-[35px] w-full mt-8",
                              }}
                              clearable
                              required
                            />

                            <Select
                              customLabel="Throughput protocol"
                              options={protocolFilter}
                              value={protocolFilter.find(
                                (option) =>
                                  option?.value ===
                                  formData?.throughput_protocol
                              )}
                              onChange={(selectedOption) => {
                                onSelectProtoAndDirectionChange(
                                  "throughput_protocol",
                                  selectedOption
                                );
                                clearErrors();
                              }}
                              placeholder="Select"
                              wrapperAttr={{
                                className: "h-[35px] w-full mt-6",
                              }}
                              clearable
                              required
                            />
                          </div>
                        )}

                        {selectedCommandDetails?.commandName?.includes(
                          "Throughput Http"
                        ) && (
                          <div>
                            <div className="mt-3 grid grid-cols-1">
                              <Select
                                customLabel="Throughput direction"
                                options={directionFilter}
                                value={directionFilter.find(
                                  (option) =>
                                    option?.value ===
                                    formData?.throughput_direction
                                )}
                                onChange={(selectedOption) => {
                                  onSelectProtoAndDirectionChange(
                                    "throughput_direction",
                                    selectedOption
                                  );
                                  clearErrors();
                                }}
                                placeholder="Select"
                                wrapperAttr={{
                                  className: "h-[35px] w-full mt-8",
                                }}
                                clearable
                                required
                              />
                            </div>
                          </div>
                        )}

                        {selectedCommandDetails?.commandName?.includes(
                          "Throughput Ftp"
                        ) && (
                          <div>
                            <div className="my-6 grid grid-cols-1">
                              <Input
                                name="throughput_hostname"
                                type="text"
                                placeholder="Enter host name"
                                {...register("throughput_hostname")}
                                wrapperClass="mt-4"
                                wrapperAttr={{
                                  className: "h-[35px] w-full my-1",
                                }}
                                required
                              >
                                Throughput host name
                              </Input>
                              <Input
                                name="throughput_username"
                                type="text"
                                placeholder="Enter user name"
                                {...register("throughput_username")}
                                wrapperClass="mt-4"
                                wrapperAttr={{
                                  className: "h-[35px] w-full my-1",
                                }}
                                required
                              >
                                Throughput user name
                              </Input>
                              <Input
                                name="throughput_password"
                                type="password"
                                placeholder="Enter throughput password"
                                {...register("throughput_password")}
                                wrapperClass="mt-4"
                                required
                                wrapperAttr={{
                                  className: "h-[35px] w-full my-1",
                                }}
                              >
                                Throughput password
                              </Input>
                              <Select
                                customLabel="Throughput direction"
                                options={directionFilter}
                                value={directionFilter.find(
                                  (option) =>
                                    option?.value ===
                                    formData?.throughput_direction
                                )}
                                onChange={(selectedOption) => {
                                  onSelectProtoAndDirectionChange(
                                    "throughput_direction",
                                    selectedOption
                                  );
                                  clearErrors();
                                }}
                                placeholder="Select"
                                wrapperAttr={{
                                  className: "h-[35px] w-full mt-4",
                                }}
                                clearable
                                required
                              />
                            </div>
                          </div>
                        )}

                        {selectedCommandDetails?.commandName?.includes(
                          "Verify Contacts"
                        ) && (
                          <div>
                            <div className="my-6 grid grid-cols-1">
                              <Input
                                name="contact_number"
                                type="text"
                                placeholder="Enter contact number"
                                {...register("contact_number")}
                                wrapperClass="mb-4"
                                wrapperAttr={{
                                  className: "h-[35px] w-full my-1",
                                }}
                                required
                              >
                                Contact number
                              </Input>
                            </div>
                          </div>
                        )}

                        {selectedCommandDetails?.commandName?.includes(
                          "SMS"
                        ) && (
                          <div>
                            <div className="my-6 flex gap-3">
                              <Input
                                name="message_text"
                                type="text"
                                placeholder="Enter message"
                                {...register("message_text")}
                                wrapperClass="mb-4"
                                wrapperAttr={{
                                  className: "h-[35px] w-full my-1",
                                }}
                                required
                              >
                                Message
                              </Input>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex justify-between gap-2">
                        <Button
                          type="button"
                          onClick={() =>
                            handleSubmit((values) =>
                              handleSaveInputs(values, selectedCommands)
                            )()
                          }
                          className="rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
                          disabled={!bucketFormDirty}
                        >
                          {isLoading || isLoadingUpdate ? (
                            <>
                              <div className="mr-2">Loading.....</div>
                              <CircleLoader className="ml-auto" />
                            </>
                          ) : (
                            <>Save</>
                          )}
                        </Button>
                        <button
                          type="button"
                          title="Close popup"
                          className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
                          onClick={onReset}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 w-full">
                      <IV_COMMENT />
                      <div className="mt-4 font-poppins_cf text-xs text-theme-black">
                        Select any command to <br /> Add or edit parameters
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTestCase;
