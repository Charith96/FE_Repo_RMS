import React from "react";

// dashboard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// reservation group
const Companies = React.lazy(() =>
  import("./pages/company/Companies")
);
const CreateCompany = React.lazy(() =>
  import("./pages/company/CreateCompany")
);
const CompanyOverview = React.lazy(() =>
  import("./pages/company/CompanyOverview")
);

// reservation item
// const ReservationItemTabView = React.lazy(() =>
//   import("./pages/reservationManagement/ReservationItemManagement")
// );

// todo
const ToDoManagement = React.lazy(() =>
  import("./pages/common/ToDoManagement")
);

// card layout
const QuickNavigation = React.lazy(() =>
  import("./components/QuickNavigation")
);

const routes = [
  // dashboard
  {
    path: "/",
    name: "Dashboard",
    element: Dashboard,
  },

  // reservation group
  // {
  //   path: "/reservationManagement/reservation/reservationGroups",
  //   name: "Reservations",
  //   element: ReservationList,
  // },
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

  // {
  //   path: "/reservationManagement/reservation/createReservationGroup",
  //   name: "Create Reservation Group",
  //   element: CreateReservationGroup,
  // },
  // {
  //   path: "/reservationManagement/reservation/reservationGroups/reservationGroupOverview",
  //   name: "Manage Reservation",
  //   element: ReservationGroupOverview,
  // },

  // reservation item
  // {
  //   path: "/reservationManagement/reservation/createReservationItem",
  //   name: "Create Reservation Item",
  //   element: ReservationItemTabView,
  // },

  // todo
  {
    path: "/todoManagement/todos",
    name: "Todos",
    element: ToDoManagement,
  },

  // card layouts
  {
    path: "/company",
    name: "Company",
    element: QuickNavigation,
  },
  // {
  //   path: "/reservationManagement",
  //   name: "Reservations Management",
  //   element: QuickNavigation,
  // },
  // {
  //   path: "/reservationManagement/reservation",
  //   name: "Reservation",
  //   element: QuickNavigation,
  // },
  {
    path: "/todoManagement",
    name: "Todo Management",
    element: QuickNavigation,
  },
];

export default routes;
