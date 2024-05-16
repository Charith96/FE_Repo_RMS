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
        component: CNavGroup,
        name: "Company",
        to: "/company/",
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
        name: "Customer",
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
            name: "Create Customer",
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
            name: "Customers",
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
            component: CNavGroup,
            name: "Reservation Group",
            to: "/reservationManagement/reservation/reservationGroup",
            
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
                to: "/reservationManagement/reservation/reservationGroup/createReservationGroup",
              },
              {
                component: CNavItem,
                name: "Reservation Group List",
                icon: <i className="ps-2" />,
                quicknavicon: (
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size="2x"
                    className="nav-icon pb-0 pt-3"
                  />
                ),
                to: "/reservationManagement/reservation/reservationGroup/reservationGroups",
              },
            ]
          },
          {
            component: CNavGroup,
            name: "Reservation Item",
            to: "/reservationManagement/reservation/reservationItem",
            
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
                name: "Create Reservation Item",
                icon: <i className="ps-2" />,
                quicknavicon: (
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size="2x"
                    className="nav-icon pb-0 pt-3"
                  />
                ),
                to: "/reservationManagement/reservation/reservationItem/createReservationItem",
              },
              {
                component: CNavItem,
                name: "Reservation Item List",
                icon: <i className="ps-2" />,
                quicknavicon: (
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size="2x"
                    className="nav-icon pb-0 pt-3"
                  />
                ),
                to: "/reservationManagement/reservation/reservationItem/reservationItems",
              },
            ]
          },
          {
            component: CNavGroup,
        name: "Reservation",
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
                name: "Resevations",
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
            ]
          }
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
        name: "User",
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
            name: "Create User",
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
            name: "Users",
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
        name: "Role",
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
            name: "Create Role",
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
            name: "Roles",
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
