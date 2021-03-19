import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AuthHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        c_password: ''
    });

    const changeHandler = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const register = async () => {
        await axios.post(`${baseurl}/register`, {
            name: input.name,
            email: input.email,
            password: input.password,
            c_password: input.c_password
        }, 
        {
            headers: {
                'Accept': 'Application/json'
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                'Akun berhasil didaftarkan',
                'success'
            );

            setIsRegistered(true);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Akun gagal didaftarkan, silahkan coba lagi!',
                'error'
            );
        });
    }

    const login = async () => {
        await axios.post(`${baseurl}/login`, {
            email: input.email,
            password: input.password,
        }, 
        {
            headers: {
                'Accept': 'Application/json'
            }
        })
        .then(response => {
            localStorage.setItem('ppdb-token', response.data.success.token);

            Swal.fire(
                'Berhasil',
                'Login berhasil',
                'success'
            );

            setIsLoggedIn(true);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Login gagal, silahkan coba lagi!',
                'error'
            );
        })
    }

    const logout = async () => {
        await axios.post(`${baseurl}/logout`, {}, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            localStorage.clear();
            window.location.reload(true);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    return {
        isRegistered,
        isLoggedIn,
        input,
        changeHandler,
        register,
        login,
        logout
    }
}

export default AuthHelper;