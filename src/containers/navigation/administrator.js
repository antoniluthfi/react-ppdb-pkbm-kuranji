import React from 'react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTachometerAlt,
    faFolder,
    faDoorOpen,
} from '@fortawesome/free-solid-svg-icons'


const _nav =  [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-4 ml-2"/>,
        badge: {
            color: 'info',
            text: 'NEW',
        }
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Master Data',
        route: '/master-data',
        icon: <FontAwesomeIcon icon={faFolder} className="mr-4 ml-2"/>,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Data User',
                to: '/master-data/data-user',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Data Administrator',
                to: '/master-data/data-administrator',
            },
        ],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Pendaftaran',
        to: '/pendaftaran',
        icon: <FontAwesomeIcon icon={faDoorOpen} className="mr-4 ml-2"/>,
    },
]

export default _nav
