import React from 'react'
import {
    CDropdown,
    CDropdownHeader,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

const Messages = () => {
    return (
        <CDropdown variant="nav-item" className='nav-notification'>
            <div className='notification-container'>
                <CDropdownToggle placement="bottom-end" className="ms-2 me-3 d-flex rounded-circle p-0 position-relative" caret={false}>                    
                    <FontAwesomeIcon icon={faCommentDots} className="notify-icon p-2" />
                    <span className="position-absolute top-1 mt-1 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                    </span>
                </CDropdownToggle>
            </div>
            <CDropdownMenu className="mt-2 navigation-dropdown-item" placement="bottom-end">
            </CDropdownMenu>
        </CDropdown>
    )
}

export default Messages