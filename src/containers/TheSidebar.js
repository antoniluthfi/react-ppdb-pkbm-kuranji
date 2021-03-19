import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CLabel
} from '@coreui/react'
import axios from 'axios';

// sidebar nav config
import administratorNavigation from './navigation/administrator'
import siswaNavigation from './navigation/siswa'

const TheSidebar = () => {
    const dispatch = useDispatch();
    const show = useSelector(state => state.sidebarShow);
    const [navigation, setNavigation] = useState([]);

    const getCurrentUser = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            if(result.hak_akses === 'administrator') {
                setNavigation(administratorNavigation);
            } else if(result.hak_akses === 'siswa') {
                setNavigation(siswaNavigation);
            }
        })
        .catch(error => {
            localStorage.removeItem('ppdb-token');
            window.location.reload(true);
        });
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >
            <CSidebarBrand className="d-md-down-none" to="/">
                <img src="https://drive.google.com/thumbnail?id=1YWZIOUMli3tzSzhe-Hot-bXl_JN4HbHs" alt="logo" height="35" width="35" />
                <CLabel className="ml-2 mt-2" style={{ fontSize: 18 }}>PPDB PKBM Kuranji</CLabel>
            </CSidebarBrand>
            <CSidebarNav>

                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
