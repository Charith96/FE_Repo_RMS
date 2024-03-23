import React from "react";
import { CNavGroup, CNavItem } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

const _nav = [
  {
    component: CNavGroup,
    name: "Todo Management",
    navPath: "/todoManagement",
    icon: <FontAwesomeIcon icon={faTasks} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Todos",
        icon: <i className="ps-2" />,
        quicknavicon: (
          <FontAwesomeIcon
            icon={faTasks}
            size="2x"
            className="nav-icon pb-0 pt-3"
          />
        ),
        to: "/todoManagement/todos",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Roles Management",
    navPath: "/reservationManagement",
    icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Roles",
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
            name: "Create Roles",
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
            name: "Roles",
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
            name: "Roles Overview",
            icon: <i className="ps-2" />,
            quicknavicon: (
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="2x"
                className="nav-icon pb-0 pt-3"
              />
            ),
            to: "/reservationManagement/reservation/",
          },
        ],
      },
    ],
  },
];

export default _nav;
