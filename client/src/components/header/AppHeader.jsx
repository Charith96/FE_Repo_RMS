import React, { useState } from 'react'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CForm,
  CFormInput,
} from '@coreui/react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppNotification from './AppNotification'
import AppHeaderDropdown from './AppHeaderDropdown'
import AppLogo from '../../assets/brand/AppLogo'
import Information from './Information'
import Messages from './Messages'

const AppHeader = () => {
  const [searchParam, setSearchParam] = useState('');

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParam(e.target.value)
  }

  return (
    <CHeader className="mb-4 fixed-top border-0 header-nav">
      <CContainer fluid>
        <CHeaderBrand className="text-white d-flex align-items-center" to="/">
          <AppLogo />
        </CHeaderBrand>
        <CForm className="d-flex align-items-center text-white w-25 search-component">
          <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className='text-white' />
          <CFormInput type="search" id='commonSearch' className="form-control mx-2 bg-transparent border-0 outline-0 shadow-none text-white" placeholder="Type to search" value={searchParam} onChange={handleSearch} />
        </CForm>
        <CHeaderNav className="ms-3 me-2 header-left">
          <Information />
          <AppNotification />
          <Messages />
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
