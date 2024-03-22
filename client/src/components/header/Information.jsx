import React from 'react'
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const Information = () => {
    return (
        <CDropdown variant="nav-item" className='nav-notification'>
            <div className='notification-container'>
                <CDropdownToggle placement="bottom-end" className="ms-2 me-2 d-flex rounded-circle p-0" caret={false}>
                    <FontAwesomeIcon icon={faQuestion} className="notify-icon p-2" />
                </CDropdownToggle>
            </div>
            <CDropdownMenu className="mt-2 navigation-dropdown-item" placement="bottom-end">
            </CDropdownMenu>
        </CDropdown>
    )
}

export default Information