import React from "react";

// dashboard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));


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
//reservation
const ReservationCreation=React.lazy(()=>
 import("./pages/reservation/ReservationCreation")
 );

 const ResevationTImeSlots=React.lazy(()=>
 import("./pages/reservation/ReservationTimeslots")
);
const routes = [
  // dashboard
  {
    path: "/",
    name: "Dashboard",
    element: Dashboard,
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
    path:"/userManagement/UserOverview",
    name: "UserOverview",
    element:UserOverview,
  },
  //reservation
  {
    path:"/reservation",
    name:"createResevation",
    element:QuickNavigation,
  },
  {
    path:"/reservation/createReservation",
    name:"createResevation",
    element:ReservationCreation,
  },
   {path:"/reservation/timeSlots",
  name:"reservationTimeSlots",
    element:ResevationTImeSlots,
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
