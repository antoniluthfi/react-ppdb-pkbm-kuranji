import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const DataSiswaHelper = () => {
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
    const [formulirModal, setFormulirModal] = useState(false);
    const [berkasModal, setBerkasModal] = useState(false);
    const [pengajuanModal, setPengajuanModal] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [currentDataUser, setCurrentDataUser] = useState({});
    const [loadCurrentDataUser, setLoadCurrentDataUser] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [input, setInput] = useState({
        name: '',
        email: '',
        hak_akses: 'siswa',
        nik: '',
        tempat_lahir: '',
        tgl_lahir: '',
        alamat: '',
        jenis_kelamin: ''
    });
    const [inputFormulir, setInputFormulir] = useState({
        anak_ke: '',
        jumlah_saudara: '',
        pendidikan_terakhir: '',
        sekolah_asal: '',
        tahun_lulus: '',
        tinggi_badan: '',
        berat_badan: '',
        nama_ayah: '',
        tgl_lahir_ayah: '',
        pekerjaan_ayah: '',
        nama_ibu: '',
        tgl_lahir_ibu: '',
        pekerjaan_ibu: '',
        nomorhp: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: ''
    });
    const [inputBerkas, setInputBerkas] = useState([]);
    const [inputPengajuan, setInputPengajuan] = useState({ 
        program_paket: '',
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

    const formulirChangeHandler = e => {
        setInputFormulir({
            ...inputFormulir, [e.target.name]: e.target.value
        });
    }

    const pengajuanChangeHandler = e => {
        setInputPengajuan({
            ...inputPengajuan, [e.target.name]: e.target.value
        });
    }

    const closeModalHandler = action => {
        if(action === 'submit' || action === 'update') {
            setWarning(!warning);
        } else if(action === 'view') {
            setInfo(!info);
        } else if(action === 'isi formulir') {
            setFormulirModal(!formulirModal);
        } else if(action === 'upload berkas') {
            setBerkasModal(!berkasModal);
        } else if(action === 'ajukan pendaftaran') {
            setPengajuanModal(!pengajuanModal);
        }

        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setInput({
            name: '',
            email: '',
            hak_akses: 'siswa',
            nik: '',
            tempat_lahir: '',
            tgl_lahir: '',
            alamat: '',
            jenis_kelamin: ''    
        });
        setInputFormulir({
            anak_ke: '',
            jumlah_saudara: '',
            pendidikan_terakhir: '',
            sekolah_asal: '',
            tahun_lulus: '',
            tinggi_badan: '',
            berat_badan: '',
            nama_ayah: '',
            tgl_lahir_ayah: '',
            pekerjaan_ayah: '',
            nama_ibu: '',
            tgl_lahir_ibu: '',
            pekerjaan_ibu: '',
            nomorhp: '',
            kelurahan: '',
            kecamatan: '',
            kabupaten: ''
        });
        setInputPengajuan({
            periode: '',
            program_paket: ''
        });
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataUser();
        } else if(action === 'update') {
            updateDataUser(currentDataUser.id);
        } else if(action === 'isi formulir') {
            isiFormulirPendaftaran(currentDataUser.id);
        } else if(action === 'upload berkas') {
            uploadBerkas(currentDataUser.id);
        } else if(action === 'ajukan pendaftaran') {
            ajukanPendaftaran(currentDataUser.id);
        }
    }

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
    }

    const getDataUser = async () => {
        await axios.get(`${baseurl}/user/role/siswa`, {
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
        } else if(actionModal === 'isi formulir') {
            setFormulirModal(!formulirModal);
        } else if(actionModal === 'upload berkas') {
            setBerkasModal(!berkasModal);
        } else if(actionModal === 'ajukan pendaftaran') {
            setPengajuanModal(!pengajuanModal);
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

    const isiFormulirPendaftaran = async id => {
        let message = '';
        if(inputFormulir.anak_ke == '') message = 'Anak ke harus diisi!';
        else if(inputFormulir.jumlah_saudara == '') message = 'Jumlah saudara harus diisi!';
        else if(inputFormulir.pendidikan_terakhir == '') message = 'Pendidikan Terakhir harus diisi!';
        else if(inputFormulir.sekolah_asal == '') message = 'Sekolah asal harus diisi!';
        else if(inputFormulir.tahun_lulus == '') message = 'Tahun lulus harus diisi!';
        else if(inputFormulir.tinggi_badan == '') message = 'Tinggi badan harus diisi!';
        else if(inputFormulir.berat_badan == '') message = 'Berat badan harus diisi!';
        else if(inputFormulir.nama_ayah == '') message = 'Nama ayah harus diisi!';
        else if(inputFormulir.tgl_lahir_ayah == '') message = 'Tahun lahir ayah harus diisi!';
        else if(inputFormulir.pekerjaan_ayah == '') message = 'Pekerjaan ayah harus diisi!';
        else if(inputFormulir.nama_ibu == '') message = 'Nama ibu harus diisi!';
        else if(inputFormulir.tgl_lahir_ibu == '') message = 'Tanggal lahir ibu harus diisi!';
        else if(inputFormulir.pekerjaan_ibu == '') message = 'Pekerjaan ibu harus diisi!';
        else if(inputFormulir.nomorhp == '') message = 'Nomor hp harus diisi!';
        else if(inputFormulir.kelurahan == '') message = 'Kelurahan harus diisi!';
        else if(inputFormulir.kecamatan == '') message = 'Kecamatan harus diisi!';
        else if(inputFormulir.kabupaten == '') message = 'Kabupaten harus diisi!';

        if(message != '') {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseurl}/user/${id}`, {
                anak_ke: inputFormulir.anak_ke,
                jumlah_saudara: inputFormulir.jumlah_saudara,
                pendidikan_terakhir: inputFormulir.pendidikan_terakhir,
                sekolah_asal: inputFormulir.sekolah_asal,
                tahun_lulus: inputFormulir.tahun_lulus,
                tinggi_badan: inputFormulir.tinggi_badan,
                berat_badan: inputFormulir.berat_badan,
                nama_ayah: inputFormulir.nama_ayah,
                tgl_lahir_ayah: inputFormulir.tgl_lahir_ayah,
                pekerjaan_ayah: inputFormulir.pekerjaan_ayah,
                nama_ibu: inputFormulir.nama_ibu,
                tgl_lahir_ibu: inputFormulir.tgl_lahir_ibu,
                pekerjaan_ibu: inputFormulir.pekerjaan_ibu,
                nomorhp: inputFormulir.nomorhp,
                kelurahan: inputFormulir.kelurahan,
                kecamatan: inputFormulir.kecamatan,
                kabupaten: inputFormulir.kabupaten
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
                    'Data gagal dihapus!',
                    'error'
                );
            });
    
            closeModalHandler('isi formulir');
        }
    }

    const uploadBerkas = async id => {
        if(inputBerkas.length != 4) {
            Swal.fire(
                'Gagal',
                input.length < 4 ? 'File tidak boleh kurang dari 4' : 'File tidak boleh lebih dari 4',
                'error'
            );
        } else {
            let formData = new FormData();
            for (let i = 0; i < inputBerkas.length; i++) {
                formData.append('file[]', inputBerkas[i]);
            }

            await axios({
                method: 'post',
                url: `${baseurl}/berkas/${id}`,
                data: formData,
                headers: {
                    'Accept': 'Application/json',
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`,
                }
            })
            .then(response => {
                postDataBerkas(id);
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.message,
                    'error'
                );
            });
        }
    }

    const postDataBerkas = async id => {
        const ijazah = inputBerkas.filter(a => a.name.includes('ijazah'));
        const skhun = inputBerkas.filter(a => a.name.includes('skhun'));
        const kk = inputBerkas.filter(a => a.name.includes('kk') || a.name.includes('kartu keluarga'));
        const raport = inputBerkas.filter(a => a.name.includes('raport'));

        await axios.post(`${baseurl}/berkas`, {
            user_id: currentDataUser.id,
            ijazah: `${currentDataUser.id}_${currentDataUser.name}_${ijazah[0].name}`,
            skhun: `${currentDataUser.id}_${currentDataUser.name}_${skhun[0].name}`,
            kartu_keluarga: `${currentDataUser.id}_${currentDataUser.name}_${kk[0].name}`,
            raport: `${currentDataUser.id}_${currentDataUser.name}_${raport[0].name}`,
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
                'Berkas berhasil diupload',
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

        closeModalHandler('upload berkas');
    }

    const ajukanPendaftaran = async id => {
        await axios.post(`${baseurl}/pendaftaran`, {
            user_id: id,
            program_paket: inputPengajuan.program_paket,
            periode: inputPengajuan.periode
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
                'Berkas berhasil diupload',
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

        closeModalHandler('ajukan pendaftaran');
    }

    return {
        fields,
        warning, setWarning,
        info,
        formulirModal,
        berkasModal,
        pengajuanModal,
        dataUser,
        isLoading,
        currentDataUser,
        modalTitle,
        buttonSubmitName,
        input,
        inputFormulir,
        setInputBerkas,
        inputPengajuan,
        details,
        toggleDetails,
        changeHandler,
        formulirChangeHandler,
        pengajuanChangeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataUser,
        getDataUserById,
    }
}

export default DataSiswaHelper;