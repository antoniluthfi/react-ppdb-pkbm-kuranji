import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTachometerAlt,
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
        name: 'Pendaftaran',
        route: '/pendaftaran',
        icon: <FontAwesomeIcon icon={faDoorOpen} className="mr-4 ml-2"/>,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Pengisian Formulir',
                to: '/pendaftaran/pengisian-formulir',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Upload Berkas',
                to: '/pendaftaran/upload-berkas',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Pengajuan',
                to: '/pendaftaran/ajukan-pendaftaran',
            },
        ],
    },
]

export default _nav
