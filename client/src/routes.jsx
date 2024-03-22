import React from "react";
const contextMenuRow = { id: "244e" };

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
//users
const CreateUsers = React.lazy(() =>
  import("./pages/userManagement/CreateUser")
);
const UserList = React.lazy(() =>
  import("./pages/userManagement/UserList")
);
const UserOverview = React.lazy(() =>
  import("./pages/userManagement/UserOverview")
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
   //users
   {
    path: "/userManagement/createUsers",
    name: "createUsers",
    element:CreateUsers,
  },
  {
    path: "/userManagement/Userlist",
    name: "Userlist",
    element:UserList,
  },
  {
    path:`/userManagement/UserOverview`,
    name: "UserOverview",
    element:UserOverview,
  },
  // card layouts
  {
    path: "/reservationManagement",
    name: "Reservations Management",
    element: QuickNavigation,
  },
  {
    path: "/userManagement",
    name: "User Management",
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
];

export default routes;
