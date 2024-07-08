import { element } from "prop-types";
import React from "react";

// dashboard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// register
const Register = React.lazy(() => import("./pages/auth/Register"));

//login
const Login = React.lazy(() => import("./pages/auth/Login"));

//logout
//const LogoutPage = React.lazy(() => import("./pages/auth/LogoutPage"));

// reservation group
const ReservationGroupList = React.lazy(() =>
  import("./pages/reservationManagement/ReservationGroupList")
);
const CreateReservationGroup = React.lazy(() =>
  import("./pages/reservationManagement/CreateReservationGroup")
);
const ReservationGroupOverview = React.lazy(() =>
  import("./pages/reservationManagement/ReservationGroupOverview")
);

//company
const Companies = React.lazy(() => import("./pages/company/Companies"));
const CreateCompany = React.lazy(() => import("./pages/company/CreateCompany"));
const CompanyOverview = React.lazy(() =>
  import("./pages/company/CompanyOverview")
);

//users
const CreateUsers = React.lazy(() =>
  import("./pages/userManagement/CreateUser")
);
const UserList = React.lazy(() => import("./pages/userManagement/UserList"));
const UserOverview = React.lazy(() =>
  import("./pages/userManagement/UserOverview")
);
const UserProfile = React.lazy(() =>
  import("./pages/userManagement/UserProfile")
);
//reservation
const ReservationCreation = React.lazy(() =>
  import("./pages/reservation/ReservationCreation")
);

const ResevationTImeSlots = React.lazy(() =>
  import("./pages/reservation/ReservationTimeslots")
);
// reservation item
const ReservationItemTabView = React.lazy(() =>
  import("./pages/reservationManagement/ReservationItemManagement")
);
const ReservationItemOverview = React.lazy(() =>
  import("./pages/reservationManagement/ReservationItemTimeSlotManagement")
);
const ReservationItemList = React.lazy(() =>
  import("./pages/reservationManagement/ReservationItemList")
);

// card layout
const QuickNavigation = React.lazy(() =>
  import("./components/QuickNavigation")
);

//customers
const CustomerCreation = React.lazy(() =>
  import("./pages/customerManagement/CustomerCreation")
);
const CustomerList = React.lazy(() =>
  import("./pages/customerManagement/CustomerList")
);
const CustomerOverview = React.lazy(() =>
  import("./pages/customerManagement/CustomerOverview")
);

//Resevation Overview
const ReservationOverview = React.lazy(() =>
  import("./pages/reservationOverviewPart/ReservationOverview")
);
const ReservationList = React.lazy(() =>
  import("./pages/reservationOverviewPart/ReservationList")
);

//roles
const CreateRole = React.lazy(() =>
  import("./pages/roleManagement/CreateRole")
);
const RoleList = React.lazy(() => import("./pages/roleManagement/RoleList"));
const RoleOverview = React.lazy(() =>
  import("./pages/roleManagement/RoleOverview")
);

const routes = [
  // dashboard
  {
    path: "/",
    name: "Dashboard",
    element: Dashboard,
  },

  // register
  {
    path: "/register",
    name: "Register",
    element: Register,
  },

  // login
  {
    path: "/login",
    name: "Login",
    element: Login,
  },

  //logout
  // {
  //   path: "/logout",
  //   name: "Logout",
  //   element: LogoutPage,
  // },

  // company
  {
    path: "/company/createCompany",
    name: "Create Company",
    element: CreateCompany,
  },
  {
    path: "/company/companies",
    name: "Companies",
    element: Companies,
  },
  {
    path: "/company/companyOverview",
    name: "Company Overview",
    element: CompanyOverview,
  },

  // reservation group
  {
    path: "/reservationManagement/reservation/reservationGroup/reservationGroups",
    name: "Reservations",
    element: ReservationGroupList,
  },
  {
    path: "/reservationManagement/reservation/reservationGroup/createReservationGroup",
    name: "Create Reservation Group",
    element: CreateReservationGroup,
  },
  {
    path: "/reservationManagement/reservation/reservationGroup/reservationGroups/reservationGroupOverview",
    name: "Manage Reservation",
    element: ReservationGroupOverview,
  },

  //users
  {
    path: "/userManagement/createUsers",
    name: "createUsers",
    element: CreateUsers,
  },
  {
    path: "/userManagement/Userlist",
    name: "Userlist",
    element: UserList,
  },
  {
    path: "/userManagement/UserOverview",
    name: "UserOverview",
    element: UserOverview,
  },
  {
    path: "/UserProfile",
    name: "UserOverview",
    element: UserProfile,
  },

  //reservation
  {
    path: "/reservations",
    name: "createResevation",
    element: QuickNavigation,
  },
  {
    path: "/reservations/createReservation",
    name: "createResevation",
    element: ReservationCreation,
  },
  {
    path: "/reservations/timeSlots",
    name: "reservationTimeSlots",
    element: ResevationTImeSlots,
  },
  {
    path: "/reservations/ReservationOverview",
    name: "ReservationOverview",
    element: ReservationOverview,
  },
  {
    path: "/reservations/ReservationList",
    name: "ReservationList",
    element: ReservationList,
  },

  // reservation item
  {
    path: "/reservationManagement/reservation/reservationItem/createReservationItem",
    name: "Create Reservation Item",
    element: ReservationItemTabView,
  },
  {
    path: "/reservationManagement/reservation/reservationItem/reservationItems/reservationItemOverview",
    name: "Manage Reservation",
    element: ReservationItemOverview,
  },
  {
    path: "/reservationManagement/reservation/reservationItem/reservationItems",
    name: "Reservation Items",
    element: ReservationItemList,
  },

  //customers
  {
    path: "/customerManagement/CustomerCreation",
    name: "CustomerCreation",
    element: CustomerCreation,
  },
  {
    path: "/customerManagement/Customerlist",
    name: "CustomerList",
    element: CustomerList,
  },
  {
    path: `/customerManagement/CustomerOverview`,
    name: "CustomerOverview",
    element: CustomerOverview,
  },

  //Reservation Overview

  //roles
  {
    path: "/rolesManagement/CreateRole",
    name: "CreateRole",
    element: CreateRole,
  },
  {
    path: "/rolesManagement/Rolelist",
    name: "RoleList",
    element: RoleList,
  },
  {
    path: `/rolesManagement/RoleOverview`,
    name: "RoleOverview",
    element: RoleOverview,
  },

  // card layouts
  {
    path: "/company",
    name: "Company",
    element: QuickNavigation,
  },
  {
    path: "/todoManagement",
    name: "Todo Management",
    element: QuickNavigation,
  },
  {
    path: "/customerManagement",
    name: "customer Management",
    element: QuickNavigation,
  },
  {
    path: "/reservationOverviewPart",
    name: "Reservation Overview",
    element: QuickNavigation,
  },
  {
    path: "/reservationOverviewPart",
    name: "Reservation List",
    element: QuickNavigation,
  },
  {
    path: "/reservationManagement",
    name: "Reservations Management",
    element: QuickNavigation,
  },
  {
    path: "/reservationManagement/reservation",
    name: "Reservation",
    element: QuickNavigation,
  },
  {
    path: "/reservationManagement/reservation/reservationGroup",
    name: "Reservation Group",
    element: QuickNavigation,
  },
  {
    path: "/reservationManagement/reservation/reservationItem",
    name: "Reservation Item",
    element: QuickNavigation,
  },
  {
    path: "/userManagement",
    name: "User",
    element: QuickNavigation,
  },
  {
    path: "/rolesManagement",
    name: "Roles",
    element: QuickNavigation,
  },
];

export default routes;
