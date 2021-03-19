import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const DashboardHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const [currentUser, setCurrentUser] = useState({});
    const [loadCurrentUser, setLoadCurrentUser] = useState(true);
    
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


    return {
        currentUser,
        loadCurrentUser,
        getCurrentUser,
    }
}

export default DashboardHelper;