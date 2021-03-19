import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const DataDiriHelper = () => {
    const baseurl = process.env.REACT_APP_API_URL;
    const [currentUser, setCurrentUser] = useState({});
    const [formDisabled, setFormDisabled] = useState(false);
    const [route, setRoute] = useState('/pendaftaran/pengisian-formulir');
    const [input, setInput] = useState({
        name: '',
        nik: '',
        tempat_lahir: '',
        tgl_lahir: '',
        jenis_kelamin: '',
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
        alamat: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: ''
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

            if(result.pendaftaran != null) {
                setFormDisabled(true);
            }

            setInput({
                name: result.name,
                nik: result.nik,
                tempat_lahir: result.tempat_lahir,
                tgl_lahir: result.tgl_lahir,
                jenis_kelamin: result.jenis_kelamin,
                anak_ke: result.anak_ke,
                jumlah_saudara: result.jumlah_saudara,
                pendidikan_terakhir: result.pendidikan_terakhir,
                sekolah_asal: result.sekolah_asal,
                tahun_lulus: result.tahun_lulus,
                tinggi_badan: result.tinggi_badan,
                berat_badan: result.berat_badan,
                nama_ayah: result.nama_ayah,
                tgl_lahir_ayah: result.tgl_lahir_ayah,
                pekerjaan_ayah: result.pekerjaan_ayah,
                nama_ibu: result.nama_ibu,
                tgl_lahir_ibu: result.tgl_lahir_ibu,
                pekerjaan_ibu: result.pekerjaan_ibu,
                nomorhp: result.nomorhp,
                alamat: result.alamat,
                kelurahan: result.kelurahan,
                kecamatan: result.kecamatan,
                kabupaten: result.kabupaten,        
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    const updateDataDiri = async id => {
        let message = '';
        if(input.nik == null) message = 'NIK harus diisi!';
        else if(input.tempat_lahir == null) message = 'Tempat Lahir harus diisi!';
        else if(input.tgl_lahir == null) message = 'Tanggal Lahir harus diisi!';
        else if(input.jenis_kelamin == null) message = 'Jenis kelamin harus diisi!';
        else if(input.anak_ke == null) message = 'Input Anak ke harus diisi!';
        else if(input.jumlah_saudara == null) message = 'Jumlah saudara harus diisi!';
        else if(input.pendidikan_terakhir == null) message = 'Pendidikan terakhir harus diisi!';
        else if(input.sekolah_asal == null) message = 'Sekolah asal harus diisi!';
        else if(input.tahun_lulus == null) message = 'Tahun lulus harus diisi!';
        else if(input.tinggi_badan == null) message = 'Tinggi badan harus diisi!';
        else if(input.berat_badan == null) message = 'Berat badan harus diisi!';
        else if(input.nama_ayah == null) message = 'Nama ayah harus diisi!';
        else if(input.tgl_lahir_ayah == null) message = 'Tanggal lahir ayah harus diisi!';
        else if(input.pekerjaan_ayah == null) message = 'Pekerjaan ayah harus diisi!';
        else if(input.nama_ibu == null) message = 'Nama ibu harus diisi!';
        else if(input.tgl_lahir_ibu == null) message = 'Tanggal lahir ibu harus diisi!';
        else if(input.pekerjaan_ibu == null) message = 'Pekerjaan ibu harus diisi!';
        else if(input.nomorhp == null) message = 'Nomor HP harus diisi!';
        else if(input.alamat == null) message = 'Alamat harus diisi!';
        else if(input.kelurahan == null) message = 'Kelurahan harus diisi!';
        else if(input.kecamatan == null) message = 'Kecamatan harus diisi!';
        else if(input.kabupaten == null) message = 'Kabupaten harus diisi!';

        if(message != '') {
            return Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseurl}/user/${id}`, {
                name: input.name,
                nik: input.nik,
                tempat_lahir: input.tempat_lahir,
                tgl_lahir: input.tgl_lahir,
                jenis_kelamin: input.jenis_kelamin,
                anak_ke: input.anak_ke,
                jumlah_saudara: input.jumlah_saudara,
                pendidikan_terakhir: input.pendidikan_terakhir,
                sekolah_asal: input.sekolah_asal,
                tahun_lulus: input.tahun_lulus,
                tinggi_badan: input.tinggi_badan,
                berat_badan: input.berat_badan,
                nama_ayah: input.nama_ayah,
                tgl_lahir_ayah: input.tgl_lahir_ayah,
                pekerjaan_ayah: input.pekerjaan_ayah,
                nama_ibu: input.nama_ibu,
                tgl_lahir_ibu: input.tgl_lahir_ibu,
                pekerjaan_ibu: input.pekerjaan_ibu,
                nomorhp: input.nomorhp,
                alamat: input.alamat,
                kelurahan: input.kelurahan,
                kecamatan: input.kecamatan,
                kabupaten: input.kabupaten,        
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
    
                setRoute('/pendaftaran/upload-berkas');
                getCurrentUser();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    'Data diri gagal diperbarui, silahkan coba lagi!',
                    'error'
                );
            });
        }
    }

    const resetFormulir = async id => {
        await axios.put(`${baseurl}/user/${id}`, {
            nik: '',
            tempat_lahir: '',
            tgl_lahir: '',
            jenis_kelamin: '',
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
            alamat: '',
            kelurahan: '',
            kecamatan: '',
            kabupaten: '',        
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

            getCurrentUser();

            setInput({
                nik: '',
                tempat_lahir: '',
                tgl_lahir: '',
                jenis_kelamin: '',
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
                alamat: '',
                kelurahan: '',
                kecamatan: '',
                kabupaten: ''        
            });
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Data diri gagal diperbarui, silahkan coba lagi!',
                'error'
            );
        });
    }

    return {
        currentUser,
        formDisabled,
        route,
        input,
        changeHandler,
        getCurrentUser,
        updateDataDiri,
        resetFormulir
    }
}

export default DataDiriHelper;