import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const DataAdministratorHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'name',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'email',
            label: 'Email',
            _style: { textAlign: 'center' },
        },
        {
            key: 'alamat',
            label: 'Alamat',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nik',
            label: 'NIK',
            _style: { textAlign: 'center' },
        },
        {
            key: 'tempat_lahir',
            label: 'TTL',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jenis_kelamin',
            label: 'Jenis Kelamin',
            _style: { textAlign: 'center' },
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ];

    const [warning, setWarning] = useState(false);
    const [info, setInfo] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDataUser, setCurrentDataUser] = useState({});
    const [loadCurrentDataUser, setLoadCurrentDataUser] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [input, setInput] = useState({
        name: '',
        email: '',
        hak_akses: 'administrator',
        nik: '',
        tempat_lahir: '',
        tgl_lahir: '',
        alamat: '',
        jenis_kelamin: ''
    });
    const [details, setDetails] = useState([]);

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const changeHandler = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const closeModalHandler = action => {
        if(action === 'submit' || action === 'update') {
            setWarning(!warning);
        } else if(action === 'view') {
            setInfo(!info);
        }

        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setInput({
            name: '',
            email: '',
            hak_akses: 'administrator',
            nik: '',
            tempat_lahir: '',
            tgl_lahir: '',
            alamat: '',
            jenis_kelamin: ''    
        });
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataUser();
        } else if(action === 'update') {
            updateDataUser(currentDataUser.id);
        }
    }

    const getDataUser = async () => {
        await axios.get(`${baseurl}/user/role/administrator`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            setDataUser(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataUserById = async (id, actionModal) => {
        await axios.get(`${baseurl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentDataUser(result);

            if(actionModal === 'update') {
                setInput({
                    name: result.name,
                    email: result.email,
                    hak_akses: result.hak_akses,
                    nik: result.nik,
                    tempat_lahir: result.tempat_lahir,
                    tgl_lahir: result.tgl_lahir,
                    alamat: result.alamat,
                    jenis_kelamin: result.jenis_kelamin,            
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

        if(actionModal === 'update') {
            setModalTitle('Update Data')
            setButtonSubmitName('Update');
            setWarning(!warning);
        } else if(actionModal === 'view') {
            setInfo(!info);
        } else if(actionModal === 'delete') {
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Data yg terhapus tidak dapat dipulihkan kembali!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus saja!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteDataUser(id);
                }
            });
        }

        setLoadCurrentDataUser(false);
    }

    const postDataUser = async () => {
        await axios.post(`${baseurl}/user`, {
            name: input.name,
            email: input.email,
            hak_akses: input.hak_akses,
            password: input.name,
            nik: input.nik,
            tempat_lahir: input.tempat_lahir,
            tgl_lahir: input.tgl_lahir,
            alamat: input.alamat,
            jenis_kelamin: input.jenis_kelamin    
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            getDataUser();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Data gagal ditambahkan!',
                'error'
            );
        });

        closeModalHandler('submit');
    }

    const updateDataUser = async id => {
        await axios.put(`${baseurl}/user/${id}`, {
            name: input.name,
            email: input.email,
            hak_akses: input.hak_akses,
            password: input.name,
            nik: input.nik,
            tempat_lahir: input.tempat_lahir,
            tgl_lahir: input.tgl_lahir,
            alamat: input.alamat,
            jenis_kelamin: input.jenis_kelamin    
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            getDataUser();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Data gagal diupdate!',
                'error'
            );
        });

        closeModalHandler('update');
    }

    const deleteDataUser = async id => {
        await axios.delete(`${baseurl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            getDataUser();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Data gagal dihapus!',
                'error'
            );
        });
    }

    return {
        fields,
        warning, setWarning,
        info,
        dataUser,
        isLoading,
        currentDataUser,
        loadCurrentDataUser,
        modalTitle,
        buttonSubmitName,
        input,
        details,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getDataUser,
        getDataUserById,
    }
}

export default DataAdministratorHelper;