import React from 'react'
import {
    CDropdown,
    CDropdownHeader,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const AppNotification = () => {
    return (
        <CDropdown variant="nav-item" className='nav-notification'>
            <div className='notification-container'>
                <CDropdownToggle placement="bottom-end" className="ms-2 me-2 d-flex rounded-circle p-0" caret={false}>
                    <FontAwesomeIcon icon={faBell} className="notify-icon p-2" />
                </CDropdownToggle>
            </div>
            <CDropdownMenu className="mt-2 navigation-dropdown-item" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">Notifications</CDropdownHeader>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppNotification