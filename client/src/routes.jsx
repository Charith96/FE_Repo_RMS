import React from "react";

// dashboard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const Companies = React.lazy(() => import("./pages/company/Companies"));
const CreateCompany = React.lazy(() => import("./pages/company/CreateCompany"));
const CompanyOverview = React.lazy(
  () => import("./pages/company/CompanyOverview")
);

// todo
const ToDoManagement = React.lazy(
  () => import("./pages/common/ToDoManagement")
);

// card layout
const QuickNavigation = React.lazy(
  () => import("./components/QuickNavigation")
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
  {
    path: "/todoManagement",
    name: "Todo Management",
    element: QuickNavigation,
  },
];

export default routes;
