// Sidebar imports
import {
  UilEstate,
  // UilClipboardAlt,
  UilChart,

  // UilSetting,
} from "@iconscout/react-unicons";

// Analytics Cards imports

import { TfiCup} from "react-icons/tfi";
import { GoZap } from "react-icons/go";
import { GoGoal } from "react-icons/go";
// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/dashboard", // Add path for navigation
  },
  // {
  //   icon: UilClipboardAlt,
  //   heading: "Summary",
  //   path: "/summary",
  // },
  {
    icon: UilChart,
    heading: "Accounts",
    path: "/ParenDashboard",
  },
  // {
  //   icon: UilSetting,
  //   heading: "Settings",
  //   path: "/settings",
  // },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    
    value: "Overall Progress",
    png: GoGoal ,
    series: [
      {
        name: "Overall Progress",
        data: [50 , 90 , 50, 70, 100],
       
      },
    ],
  },
  {
    title: " ",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    
    value: "Engagement & Focus",
    png: GoZap  ,
    series: [
      {
        name: "Engagement & Focus",
        data: [10, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: " ",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    
    value: "Accuracy & Learning Improvement",
    png: TfiCup ,
    series: [
      {
        name: "Accuracy & Learning Improvement",
        data: [10, 25, 15, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Magic Match",
    status: "Improved",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "Potion Sequence",
    status: "Good",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Story Recall",
    status: "Bad",
    time: "2 hours ago",
  },
];
