import React from "react";

// dashboard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// reservation group
const ReservationsList = React.lazy(() =>
  import("./pages/reservationManagement/ReservationGroupList")
);
const CreateReservationGroup = React.lazy(() =>
  import("./pages/reservationManagement/CreateReservationGroup")
);
const ReservationGroupOverview = React.lazy(() =>
  import("./pages/reservationManagement/ReservationGroupOverview")
);

const Companies = React.lazy(() => import("./pages/company/Companies"));
const CreateCompany = React.lazy(() => import("./pages/company/CreateCompany"));
const CompanyOverview = React.lazy(
  () => import("./pages/company/CompanyOverview")
);
const ReservationItemOverview = React.lazy(() =>
  import("./pages/reservationManagement/ReservationItemTimeSlotManagement")
);
const ReservationItemList = React.lazy(() =>
  import("./pages/reservationManagement/ReservationItemList")
);
// todo
const ToDoManagement = React.lazy(
  () => import("./pages/common/ToDoManagement")
);

// card layout
const QuickNavigation = React.lazy(
  () => import("./components/QuickNavigation")
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
 

const routes = [
  // dashboard
  {
    path: "/",
    name: "Dashboard",
    element: Dashboard,
  },
  {
    path: "/company/companies",
    name: "Companies",
    element: Companies,
  },
  {
    path: "/company/createCompany",
    name: "Create Company",
    element: CreateCompany,
  },
  {
    path: "/company/companyOverview",
    name: "Company Overview",
    element: CompanyOverview,
  },
  {
    path: "/reservationManagement/reservation/reservationItems/reservationItemOverview",
    name: "Manage Reservation",
    element: ReservationItemOverview,
  },
  {
    path: "/reservationManagement/reservation/reservationItems",
    name: "Reservation Items",
    element: ReservationItemList,
  },

  // todo
  {
    path: "/todoManagement/todos",
    name: "Todos",
    element: ToDoManagement,
  },

    //customers
    {
      path: "/customerManagement/CustomerCreation",
      name: "CustomerCreation",
      element:CustomerCreation,
    },
    {
      path: "/customerManagement/Customerlist",
      name: "CustomerList",
      element:CustomerList,
    },
    {
      path:`/customerManagement/CustomerOverview`,
      name: "CustomerOverview",
      element:CustomerOverview,
    },


    
    //Reservation Overview
    {
      path: "/reservationOverviewPart/ReservationOverview",
      name: "ReservationOverview",
      element:ReservationOverview,
    },
    {
      path: "/reservationOverviewPart/ReservationList",
      name: "ReservationList",
      element:ReservationList,
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
 
];

export default routes;
