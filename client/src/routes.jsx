import React from "react";

// dashboard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// reservation group
const ReservationList = React.lazy(() =>
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


 //roles
 const CreateRole = React.lazy(() =>
 import("./pages/rolesManagement/CreateRole")
 );
 const RoleList = React.lazy(() =>
 import("./pages/rolesManagement/RoleList")
 );
 const RoleOverview= React.lazy(() =>
 import("./pages/rolesManagement/RoleOverview")
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

  
  //roles
  {
    path: "/rolesManagement/CreateRole",
    name: "CreateRole",
    element:CreateRole,
  },
  {
    path: "/rolesManagement/Rolelist",
    name: "RoleList",
    element:RoleList,
  },
  {
    path:`/rolesManagement/RoleOverview`,
    name: "RoleOverview",
    element:RoleOverview,
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
    path: "/RolesManagement",
    name: "Roles Management",
    element: QuickNavigation,
  },
];

export default routes;