import React, { useEffect, useState } from 'react'
import {
  cilUser,
  cilAccountLogout,
  cilReload,
} from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { tempProfileImg } from '../../assets/images';
import { Dropdown, Image } from 'react-bootstrap';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';

const AppHeaderDropdown = () => {
  const [selectedUser, setSelectedUser] = useState('Rixano Silva');
  const [selectedCompany, setSelectedCompany] = useState('Default Company');

  useEffect(() => {
    // api dispatch
  }, [])

  useEffect(() => {
    // message handling
  }, [])

  const handleActiveCompany = (value) => {
    setSelectedCompany(value);
    sessionStorage.setItem('activeCompany', value?.companyId);
  }

  return (
    <>
      <Dropdown className='nav-profile'>
        <div className='profile-container'>
          <div className='profile-info'>
            <small className='profile-name'>
              {selectedUser}&emsp;
            </small>
            <form>
              <Dropdown align={'end'} className='company-selection'>
                <Dropdown.Toggle className='text-info compay'>
                  {selectedCompany}&ensp;
                </Dropdown.Toggle>
                <Dropdown.Menu className='company-menu'>
                  {(selectedCompany) ? (
                    <Dropdown.Item href="#" onClick={() => handleActiveCompany('companyid')}>
                      <span className='d-flex align-items-center'>
                        <small>{selectedCompany}</small>&ensp;
                        <div className='d-flex align-item-center active-company'>
                          <FontAwesomeIcon icon={faCheck} size='lg' className='text-success' />&nbsp;
                          <small className='status-text'>Active</small>
                        </div>
                      </span>
                    </Dropdown.Item>
                  ) : (<Dropdown.Item>No Company Found</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </form>
          </div>
          <Dropdown align="end">
            <Dropdown.Toggle placement="bottom-end" className="ms-2 me-2 rounded-circle custom-dropdown-toggle p-0">
              {!tempProfileImg ?
                (<CIcon icon={cilUser} size='lg' className="profile-image text-white p-2" />) :
                (<Image src={tempProfileImg} className='profile-image' alt='profile' draggable="false" />)}
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-2 profile-dropdown-item" placement="bottom-end">
              <Dropdown.Item as={Link} to={`#`} className="bg-light fw-semibold py-2"  >
                Account
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/login`}>
                <CIcon icon={cilAccountLogout} />&emsp;Logout
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/reset-password`}>
                <CIcon icon={cilReload} />&emsp;Reset Password
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Dropdown>
    </>
  )
}

export default AppHeaderDropdown