import React from "react";
import { CNavGroup, CNavItem } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const _nav = [
  {
    component: CNavGroup,
    name: "Company Management",
    navPath: "/company",
    icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Create Company",
        icon: <i className="ps-2" />,
        quicknavicon: (
          <FontAwesomeIcon
            icon={faCalendarDays}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        to: "/company/createCompany",
      },
      {
        component: CNavItem,
        name: "Compaies",
        icon: <i className="ps-2" />,
        quicknavicon: (
          <FontAwesomeIcon
            icon={faCalendarDays}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        to: "/company/companies",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Customer Management",
    navPath: "/customerManagement",
    icon: <FontAwesomeIcon icon={faUser} className="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Customers",
        to: "/customerManagement/",
        quicknavicon: (
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        className: "mt-3 ms-2",
        items: [
          {
            component: CNavItem,
            name: "Customer Creation",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/customerManagement/CustomerCreation",
          },
          {
            component: CNavItem,
            name: "Customer List",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/customerManagement/CustomerList",
          },
        ],
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Reservation Management",
    navPath: "/reservationManagement",
    icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Reservations",
        to: "/reservationManagement/reservation",
        quicknavicon: (
          <FontAwesomeIcon
            icon={faCalendarDays}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        className: "mt-3 ms-2",
        items: [
          {
            component: CNavItem,
            name: "Create Reservation Group",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservationManagement/reservation/createReservationGroup",
          },
          {
            component: CNavItem,
            name: "Reservation Groups",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservationManagement/reservation/reservationGroups",
          },
          {
            component: CNavItem,
            name: "Create Reservation Item",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservationManagement/reservation/createReservationItem",
          },

          {
            component: CNavItem,
            name: "Reservation Items",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservationManagement/reservation/reservationItems",
          },
        ],
      },
      {
        component: CNavGroup,
        name: "Reservations",
        to: "/reservations/",
        quicknavicon: (
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        className: "mt-3 ms-2",
        items: [
          {
            component: CNavItem,
            name: "Create Reservations",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faTasks}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservations/createReservation",
          },

          {
            component: CNavItem,
            name: "Resevation List",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservations/ReservationList",
          },
        ],
      },
    ],
  },
 
  {
    component: CNavGroup,
    name: "User Management",
    navPath: "/userManagement",
    icon: <FontAwesomeIcon icon={faUser} className="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Users",
        to: "/userManagement/",
        quicknavicon: (
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        className: "mt-3 ms-2",
        items: [
          {
            component: CNavItem,
            name: "User Creation",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/userManagement/createUsers",
          },
          {
            component: CNavItem,
            name: "User List",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/userManagement/Userlist",
          },
        ],
      },
    ],
  },
  
  {
    component: CNavGroup,
    name: "Roles Management",
    navPath: "/rolesManagement",
    icon: <FontAwesomeIcon icon={faUser} className="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Roles",
        to: "/rolesManagement/",
        quicknavicon: (
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        className: "mt-3 ms-2",
        items: [
          {
            component: CNavItem,
            name: "Roles Creation",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/rolesManagement/CreateRole",
          },
          {
            component: CNavItem,
            name: "Roles List",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/rolesManagement/RoleList",
          },
        ],
      },
    ],
  },
];

export default _nav;
