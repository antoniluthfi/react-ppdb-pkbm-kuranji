import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ListPendaftarHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const fields = [
        {
            key: 'no',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'id',
            label: 'No Pendaftaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'created_at',
            label: 'Tanggal Daftar',
            _style: { textAlign: 'center' },
        },
        {
            key: 'name',
            label: 'Nama',
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
            key: 'program_paket',
            label: 'Program Paket',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status',
            label: 'Status',
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
    const [cetakLaporanModal, setCetakLaporanModal] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDataUser, setCurrentDataUser] = useState({});
    const [loadCurrentDataUser, setLoadCurrentDataUser] = useState(true);
    const [dataPeriode, setDataPeriode] = useState([]);
    const [loadDataPeriode, setLoadDataPeriode] = useState(true);
    const [input, setInput] = useState({
        status: '',
        periode: ''
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
        if(action === 'update') {
            setWarning(!warning);
        }

        setInput({ 
            status: '', 
            periode: ''
        });
    }

    const getDataUser = async () => {
        await axios.get(`${baseurl}/pendaftaran`, {
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

            setInput({
                status: result.status,
                periode: result.periode
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataUser(false);

        if(actionModal === 'update') {
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
    }

    const getperiode = async () => {
        await axios.get(`${baseurl}/pendaftaran/group/by/periode`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            setDataPeriode(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataPeriode(false);
    }

    const updateStatusPendaftaran = async id => {
        await axios.put(`${baseurl}/pendaftaran/${id}`, {
            status: input.status
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
                'Gagal update status, silahkan coba lagi',
                'error'
            );
        });

        closeModalHandler('update');
    }

    const deleteDataUser = async id => {
        await axios.delete(`${baseurl}/pendaftaran/${id}`, {
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
                error.message,
                'error'
            );
        });
    }

    return {
        fields,
        warning,
        info,
        cetakLaporanModal, setCetakLaporanModal,
        dataUser,
        isLoading,
        currentDataUser,
        loadCurrentDataUser,
        dataPeriode,
        loadDataPeriode,
        input,
        details,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        getDataUser,
        getDataUserById,
        updateStatusPendaftaran,
        getperiode
    }
}

export default ListPendaftarHelper;