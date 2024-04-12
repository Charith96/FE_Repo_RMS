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

// reservation item
const ReservationItemTabView = React.lazy(() =>
  import("./pages/reservationManagement/ReservationItemManagement")
);

// todo
const ToDoManagement = React.lazy(() =>
  import("./pages/common/ToDoManagement")
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
 

const routes = [
  // dashboard
  {
    path: "/",
    name: "Dashboard",
    element: Dashboard,
  },

  // reservation group
  {
    path: "/reservationManagement/reservation/reservationGroups",
    name: "Reservations",
    element: ReservationList,
  },
  {
    path: "/reservationManagement/reservation/createReservationGroup",
    name: "Create Reservation Group",
    element: CreateReservationGroup,
  },
  {
    path: "/reservationManagement/reservation/reservationGroups/reservationGroupOverview",
    name: "Manage Reservation",
    element: ReservationGroupOverview,
  },

  // reservation item
  {
    path: "/reservationManagement/reservation/createReservationItem",
    name: "Create Reservation Item",
    element: ReservationItemTabView,
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
