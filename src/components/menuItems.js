
import {
  InActiveIcon,
  InActiveProfileIcon,
  activeIcon,
  activeProfileIcon,
  IC_Active_Test_CASE_Hub,
  IC_InActive_Test_CASE_Hub,
  ICActiveHub,
  ICInActiveHub,
  IV_SERVER_UNSELECT,IV_SERVER_SELECT} from "../assets/icons";

export let sideBarData = [
  {
    name: "BAXTER",
    node: "user",
    img: activeProfileIcon,
    imgActive: InActiveProfileIcon,
    children: [
      {
        name: "BAXTER",

        url: "user/userList",
        type: "list",
        clickable: true,
      },
      {
        name: "Roles",

        url: "user/roleList",
        type: "list",
        clickable: true,
      },
      
     
    ],
  },
  
  {
    name: "Device Hub",
    node: "deviceHub",
    img: activeIcon,
    imgActive: InActiveIcon,
    children: [
      {
        name: "Device List",
        url: "deviceHub/deviceList",
        type: "list",
        clickable: true,
      },
     
      {
        name: "Check Device Availability",
        url: "deviceHub/checkDeviceAvailability",
        type: "form",
        clickable: true,
      },
     
    ],
  },
  {
    name: "Test Case Hub",
    node: "testCaseHub",
    img: IC_Active_Test_CASE_Hub,
    imgActive: IC_InActive_Test_CASE_Hub,
    children: [
      {
        name: "Test Case List",
        url: "testCaseHub/testCaseList",
        type: "list",
        clickable: true,
      },
      {
        name: "Add Test Case",
        url: "testCaseHub/addTestCase",
        type: "list",
        clickable: true,
      },
     
    ],
  },

  {
    name: "Test Plan Hub",
    node: "testPlanHub",
    img: ICActiveHub,
    imgActive: ICInActiveHub,
    children: [
      {
        name: "Test Plan List",
        url: "testPlanHub/testPlanList",
        type: "list",
        clickable: true,
      },
      {
        name: "Add Test plan",
        url: "testPlanHub/addTestPlan",
        type: "list",
        clickable: true,
      },
    ],
  },
  
];

export let settingsData=[
  {
    name: "Settings",
    node: "serverConfig",
    img: IV_SERVER_SELECT,
    imgActive: IV_SERVER_UNSELECT,
    children: [
      {
        name: "Config Server",
        url: "serverConfig/serverList",
        type: "list",
        clickable: true,
      },
      {
        name: "Config files",
        url: "serverConfig/configFiles",
        type: "list",
        clickable: true,
      },
    ],
  }
]



export let sideBarDataDeviceEngineer = [
  {
    name: "Device Hub",
    node: "deviceHub",
    img: activeIcon,
    imgActive: InActiveIcon,
    children: [
      {
        name: "Device List",
        url: "deviceHub/deviceList",
        type: "list",
        clickable: true,
      },
      {
        name: "Device Request",
        url: "deviceHub/access-management",
        type: "list",
        clickable: true,
      },
  
      // {
      //   name: "Check Device Availability",
      //   url: "deviceHub/checkDeviceAvailability",
      //   type: "form",
      //   clickable: true,
      // },
     
    ],
  },
 

  
];
