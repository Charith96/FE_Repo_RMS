import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = ({ isExpanded }) => {
  return (
    <CFooter className='app-footer'>
      <small className={`${isExpanded ? 'footer-expanded' : 'footer-collapsed'}`}>Copyright &copy; {new Date().getFullYear()} Deft Techiez. All Rights Reserved. | Version 1.1.0</small>
    </CFooter>
  )
}

export default React.memo(AppFooter)
