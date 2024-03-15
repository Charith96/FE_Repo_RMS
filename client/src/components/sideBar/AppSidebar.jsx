import React, { useEffect, useState } from 'react'
import { CHeaderToggler, CSidebar, CSidebarNav } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'
import { AppSidebarNav } from './AppSidebarNav'
import { useSelector } from 'react-redux'
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react'
import navigation from '../../_nav';
import 'simplebar-react/dist/simplebar.min.css';

const AppSidebar = ({ setSidebarExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    const sidebarLockEnable = localStorage.getItem('appSidebarLocked');
    if (sidebarLockEnable) {
      if (sidebarLockEnable === true || sidebarLockEnable === 'true') {
        setIsExpanded(true);
        setSidebarExpanded(true);
        setIsLocked(true);
      }
    }
    if (isLocked) {
      localStorage.setItem('appSidebarLocked', true);
    }
  }, [isLocked])

  const handleToggle = () => {
    if (!isLocked) {
      setIsExpanded(!isExpanded);
      setSidebarExpanded(!isExpanded);
    }
  }

  const handleSidebarLock = () => {
    setIsLocked(!isLocked);
    if (isLocked) {
      localStorage.setItem('appSidebarLocked', false);
    }
  }


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      className={`${isExpanded ? 'expanded-sidebar' : 'collapsed-sidebar'}`}
    >
      <div className='d-flex justify-content-between align-items-center pb-4'>
        <CHeaderToggler
          className={`d-flex justify-content-start ps-4 ${isLocked ? 'pe-none' : ''}`}
          onClick={handleToggle}
        >
          <CIcon icon={cilMenu} size="xl" className='text-white' />
        </CHeaderToggler>
        {isExpanded && (
          <CHeaderToggler variant='transparent' className='d-flex justify-content-end px-4 border-white' onClick={() => handleSidebarLock()}>
            <FontAwesomeIcon icon={faThumbTack} size="sm" className={`${isLocked ? 'text-white toggle-rotate' : 'text-gray toggle-normal'}`} />
          </CHeaderToggler>
        )}
      </div>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} isExpanded={isExpanded} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)