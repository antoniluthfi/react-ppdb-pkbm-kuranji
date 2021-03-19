import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const DashboardHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const [currentUser, setCurrentUser] = useState({});
    const [loadCurrentUser, setLoadCurrentUser] = useState(true);
    const [totalPendaftar, setTotalPendaftar] = useState({});
    const [loadTotalPendaftar, setLoadTotalPendaftar] = useState(true);
    
    const getCurrentUser = async () => {
        await axios.get(`${baseurl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            setCurrentUser(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentUser(false);
    }

    const getTotalPendaftar = async () => {
        await axios.get(`${baseurl}/pendaftaran/count/total/program-paket`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setTotalPendaftar(result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadTotalPendaftar(false);
    }

    return {
        currentUser,
        loadCurrentUser,
        totalPendaftar,
        loadTotalPendaftar,
        getCurrentUser,
        getTotalPendaftar,
    }
}

export default DashboardHelper;