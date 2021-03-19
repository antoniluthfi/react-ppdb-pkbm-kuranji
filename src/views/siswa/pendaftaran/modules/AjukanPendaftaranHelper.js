import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AjukanPendaftaranHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const [currentUser, setCurrentUser] = useState({});
    const [loadCurrentUser, setLoadCurrentUser] = useState(true);
    const [formDisabled, setFormDisabled] = useState(false);
    const [route, setRoute] = useState('/pendaftaran/ajukan-pendaftaran');
    const [input, setInput] = useState({
        program_paket: '',
        priode: '',
        status: 'pending',
    });

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

            if(result.pendaftaran != null || result.berkas == null || result.kabupaten == null) {
                setFormDisabled(true);
            }
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentUser(false);
    }

    const ajukanPendaftaran = async id => {
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

        let berkasMessage = '';
        if(currentUser.berkas == null) berkasMessage = 'Anda belum mengunggah berkas apapun. silahkan lengkapi berkas terlebih dahulu!';
        else if(currentUser.berkas.ijazah == null) berkasMessage = 'Berkas ijazah belum diunggah, silahkan lengkapi berkas terlebih dahulu!';
        else if(currentUser.berkas.skhun == null) berkasMessage = 'Berkas skhun belum diunggah, silahkan lengkapi berkas terlebih dahulu!';
        else if(currentUser.berkas.kartu_keluarga == null) berkasMessage = 'Berkas kartu keluarga belum diunggah, silahkan lengkapi berkas terlebih dahulu!';
        else if(currentUser.berkas.raport == null) berkasMessage = 'Berkas raport belum diunggah, silahkan lengkapi berkas terlebih dahulu!';

        if(message != '') {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );

            setRoute('/pendaftaran/pengisian-formulir');
        } else if(berkasMessage != '') {
            Swal.fire(
                'Gagal',
                berkasMessage,
                'error'
            );

            setRoute('/pendaftaran/upload-berkas');
        } else {
            await axios.post(`${baseurl}/pendaftaran`, {
                user_id: id,
                program_paket: input.program_paket,
                periode: input.periode,
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
                    'Pendaftaran berhasil dilakukan',
                    'success'
                );
    
                getCurrentUser();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    'Pendaftaran gagal dilakukan, silahkan coba lagi',
                    'error'
                );
            });
        }
    }

    const cetakKartuPendaftaran = async id => {
        window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan/data-user/${id}`, '_blank')
    }

    return {
        currentUser,
        loadCurrentUser,
        formDisabled,
        route, 
        input,
        changeHandler,
        getCurrentUser,
        ajukanPendaftaran,
        cetakKartuPendaftaran
    }
}

export default AjukanPendaftaranHelper;