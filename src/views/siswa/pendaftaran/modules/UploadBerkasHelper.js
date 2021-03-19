import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UploadBerkasHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const [currentUser, setCurrentUser] = useState({});
    const [formDisabled, setFormDisabled] = useState(false);
    const [route, setRoute] = useState('/pendaftaran/upload-berkas');
    const [input, setInput] = useState([]);

    const changeHandler = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const getCurrentUser = async () => {
        await axios.get(`${baseurl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentUser(result);

            if(result.pendaftaran != null) {
                setFormDisabled(true);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataBerkas = async id => {
        const ijazah = input.filter(a => a.name.includes('ijazah'));
        const skhun = input.filter(a => a.name.includes('skhun'));
        const kk = input.filter(a => a.name.includes('kk') || a.name.includes('kartu keluarga'));
        const raport = input.filter(a => a.name.includes('raport'));

        await axios.post(`${baseurl}/berkas`, {
            user_id: currentUser.id,
            ijazah: `${currentUser.id}_${currentUser.name}_${ijazah[0].name}`,
            skhun: `${currentUser.id}_${currentUser.name}_${skhun[0].name}`,
            kartu_keluarga: `${currentUser.id}_${currentUser.name}_${kk[0].name}`,
            raport: `${currentUser.id}_${currentUser.name}_${raport[0].name}`,
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

            setRoute('/pendaftaran/ajukan-pendaftaran');
            getCurrentUser();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const postBerkas = async id => {
        let message = '';
        if(currentUser.nik == null) message = 'NIK masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.tempat_lahir == null) message = 'Tempat Lahir masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.tgl_lahir == null) message = 'Tanggal Lahir masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.jenis_kelamin == null) message = 'Jenis kelamin masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.anak_ke == null) message = 'Input Anak ke masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.jumlah_saudara == null) message = 'Jumlah saudara masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.pendidikan_terakhir == null) message = 'Pendidikan terakhir masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.sekolah_asal == null) message = 'Sekolah asal masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.tahun_lulus == null) message = 'Tahun lulus masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.tinggi_badan == null) message = 'Tinggi badan masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.berat_badan == null) message = 'Berat badan masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.nama_ayah == null) message = 'Nama ayah masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.tgl_lahir_ayah == null) message = 'Tanggal lahir ayah masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.pekerjaan_ayah == null) message = 'Pekerjaan ayah masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.nama_ibu == null) message = 'Nama ibu masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.tgl_lahir_ibu == null) message = 'Tanggal lahir ibu masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.pekerjaan_ibu == null) message = 'Pekerjaan ibu masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.nomorhp == null) message = 'Nomor HP masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.alamat == null) message = 'Alamat masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.kelurahan == null) message = 'Kelurahan masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.kecamatan == null) message = 'Kecamatan masih kosong, lengkapi data diri anda terlebih dahulu!';
        else if(currentUser.kabupaten == null) message = 'Kabupaten masih kosong, lengkapi data diri anda terlebih dahulu!';

        const ijazah = input.filter(a => a.name.includes('ijazah'));
        const skhun = input.filter(a => a.name.includes('skhun'));
        const kk = input.filter(a => a.name.includes('kk') || a.name.includes('kartu keluarga'));
        const raport = input.filter(a => a.name.includes('raport'));

        let error = '';
        if(!ijazah.length) error = 'File ijazah tidak ada!';
        else if(!skhun.length) error = 'File skhun tidak ada!';
        else if(!kk.length) error = 'File kartu keluarga tidak ada!';
        else if(!raport.length) error = 'File raport tidak ada!';

        if(error != '') {
            Swal.fire(
                'Gagal',
                error,
                'error'
            );
        } else if(message != '') {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );

            setRoute('/pendaftaran/pengisian-formulir');
        } else if(input.length != 4) {
            Swal.fire(
                'Gagal',
                input.length < 4 ? 'File tidak boleh kurang dari 4' : 'File tidak boleh lebih dari 4',
                'error'
            );
        } else {
            let formData = new FormData();
            for (let i = 0; i < input.length; i++) {
                formData.append('file[]', input[i]);
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

    const resetBerkas = async id => {
        await axios.delete(`${baseurl}/berkas/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`,
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            getCurrentUser();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Gagal menghapus berkas, silahkan coba lagi!',
                'error'
            );
        });
    }

    return {
        currentUser,
        formDisabled,
        route,
        input, setInput,
        changeHandler,
        getCurrentUser,
        postBerkas,
        resetBerkas
    }
}

export default UploadBerkasHelper;