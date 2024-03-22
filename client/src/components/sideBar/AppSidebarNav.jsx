import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CBadge } from '@coreui/react'
import PropTypes from 'prop-types'

export const AppSidebarNav = ({ items, isExpanded }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && isExpanded && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
          component: NavLink,
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  
  const navGroup = (item, index) => {
    const { component, name, icon, to, navPath, quicknavicon, ...rest } = item
    const Component = component;

    const navigateComp = () => {
      if (navPath) {
        navigate(navPath, { state: { parentGroup: name, icon: quicknavicon } });
      }
    }

    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        onClick={!isExpanded ? navigateComp : null}
        {...rest}
      >
        {isExpanded && item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
