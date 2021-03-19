import React, { useState, useEffect } from 'react';
import DataDiriHelper from './modules/DataDiriHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CCardFooter,
    CRow,
    CSelect,
    CCollapse,
} from '@coreui/react'; 
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { Link, Redirect } from 'react-router-dom';

const DataDiri = () => {
    const [accordion, setAccordion] = useState(0);
    const {
        currentUser,
        formDisabled,
        route,
        input,
        changeHandler,
        getCurrentUser,
        updateDataDiri,
        resetFormulir
    } = DataDiriHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <div>
            {route == '/pendaftaran/pengisian-formulir' ? null : <Redirect to={route} />}
            <CRow>
                <CCol xs="12" md="9">
                    <CCard>
                        <CCardHeader>Formulir Pendaftaran</CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="name">Nama</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="name" name="name" value={input.name} onChange={changeHandler} placeholder="Masukkan Nama Anda" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nik">NIK</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="nik" name="nik" value={input.nik} onChange={changeHandler} placeholder="Masukkan NIK" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tempat-lahir">Tempat Lahir</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="tempat-lahir" name="tempat_lahir" value={input.tempat_lahir} onChange={changeHandler} placeholder="Masukkan Tempat Lahir" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tgl-lahir">Tanggal Lahir</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="date" id="tgl-lahir" name="tgl_lahir" value={input.tgl_lahir} onChange={changeHandler} placeholder="Masukkan Tanggal Lahir" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="jenis_kelamin">Jenis Kelamin</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={input.jenis_kelamin} onChange={changeHandler} disabled={formDisabled} >
                                                    <option value="">Pilih Salah Satu</option>
                                                    <option value="laki-laki">Laki-laki</option>
                                                    <option value="perempuan">Perempuan</option>
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="anak_ke">Anak Ke</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="anak_ke" name="anak_ke" value={input.anak_ke} onChange={changeHandler} placeholder="Anak ke" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="jumlah_saudara">Jumlah Saudara</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="jumlah_saudara" name="jumlah_saudara" value={input.jumlah_saudara} onChange={changeHandler} placeholder="Masukkan Jumlah Saudara" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="pendidikan_terakhir">Pendidikan Terakhir</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="pendidikan_terakhir" name="pendidikan_terakhir" value={input.pendidikan_terakhir} onChange={changeHandler} placeholder="Masukkan Pendidikan Terakhir" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="sekolah_asal">Sekolah Asal</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="sekolah_asal" name="sekolah_asal" value={input.sekolah_asal} onChange={changeHandler} placeholder="Masukkan Sekolah Asal" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tahun_lulus">Tahun Lulus</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="tahun_lulus" name="tahun_lulus" value={input.tahun_lulus} onChange={changeHandler} placeholder="Masukkan Tahun Lulus" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tinggi_badan">Tinggi Badan (cm)</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="tinggi_badan" name="tinggi_badan" value={input.tinggi_badan} onChange={changeHandler} placeholder="Masukkan Tinggi Badan" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="berat_badan">Berat Badan (kg)</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="berat_badan" name="berat_badan" value={input.berat_badan} onChange={changeHandler} placeholder="Masukkan Berat Badan" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" md="6">
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nama_ayah">Nama Ayah</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="nama_ayah" name="nama_ayah" value={input.nama_ayah} onChange={changeHandler} placeholder="Masukkan Nama Ayah" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tgl_lahir_ayah">Tanggal Lahir Ayah</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="date" id="tgl_lahir_ayah" name="tgl_lahir_ayah" value={input.tgl_lahir_ayah} onChange={changeHandler} placeholder="Masukkan Tanggal Lahir Ayah" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="pekerjaan_ayah">Pekerjaan Ayah</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="pekerjaan_ayah" name="pekerjaan_ayah" value={input.pekerjaan_ayah} onChange={changeHandler} placeholder="Masukkan Pekerjaan Ayah" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nama_ibu">Nama Ibu</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="nama_ibu" name="nama_ibu" value={input.nama_ibu} onChange={changeHandler} placeholder="Masukkan Nama Ibu" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tgl_lahir_ibu">Tanggal Lahir Ibu</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="date" id="tgl_lahir_ibu" name="tgl_lahir_ibu" value={input.tgl_lahir_ibu} onChange={changeHandler} placeholder="Masukkan Tanggal Lahir Ibu" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="pekerjaan_ibu">Pekerjaan Ibu</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="pekerjaan_ibu" name="pekerjaan_ibu" value={input.pekerjaan_ibu} onChange={changeHandler} placeholder="Masukkan Pekerjaan Ibu" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="nomorhp" name="nomorhp" value={input.nomorhp} onChange={changeHandler} placeholder="Masukkan Nomor HP" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="alamat">Alamat</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="alamat" name="alamat" value={input.alamat} onChange={changeHandler} placeholder="Masukkan Alamat" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="kelurahan">Kelurahan</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="kelurahan" name="kelurahan" value={input.kelurahan} onChange={changeHandler} placeholder="Masukkan Kelurahan" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="kecamatan">Kecamatan</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="kecamatan" name="kecamatan" value={input.kecamatan} onChange={changeHandler} placeholder="Masukkan Kecamatan" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="kabupaten">Kabupaten</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="kabupaten" name="kabupaten" value={input.kabupaten} onChange={changeHandler} placeholder="Masukkan Kabupaten" disabled={formDisabled} />
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton 
                                type="submit" 
                                size="sm" 
                                color="primary" 
                                disabled={formDisabled}
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Apakah anda yakin data yang dimasukkan sudah benar?',
                                        text: "",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yakin!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            updateDataDiri(currentUser.id);
                                        }
                                    });                
                                }}
                            >
                                <CIcon name="cil-scrubber" /> Submit
                            </CButton> 
                            <CButton 
                                type="reset" 
                                size="sm" 
                                color="danger"
                                className="ml-1"
                                disabled={formDisabled}
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Apakah anda yakin ingin reset data ini?',
                                        text: "",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yakin!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            resetFormulir(currentUser.id);
                                        }
                                    });                
                                }}
                            >
                                <CIcon name="cil-ban" /> Reset
                            </CButton>
                        </CCardFooter>
                    </CCard>                    
                </CCol>

                <CCol xs="12" md="3">
                    <CCard>
                        <CCardHeader>Alur Pendaftaran</CCardHeader>
                        <CCardBody>
                        <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton 
                                            block 
                                            color="link" 
                                            className="text-left m-0 p-0" 
                                            onClick={() => setAccordion(accordion === 0 ? null : 0)}
                                        >
                                            <h5 className="m-0 p-0">Mengisi Formulir Pendaftaran</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 0}>
                                        <CCardBody>
                                            Lengkapi data diri anda dengan mengisi formulir yang telah disediakan <Link to="/pendaftaran/pengisian-formulir">di laman ini</Link>.
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton 
                                            block 
                                            color="link" 
                                            className="text-left m-0 p-0" 
                                            onClick={() => setAccordion(accordion === 1 ? null : 1)}
                                        >
                                            <h5 className="m-0 p-0">Upload Berkas</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 1}>
                                        <CCardBody>
                                            Setelah mengisi formulir data diri. Anda akan diarahkan untuk mengupload berkas-berkas yang diperlukan. yaitu berupa :
                                            <p>1. Ijazah (untuk penamaan file harus ada kata "ijazah")</p>
                                            <p>2. SKHUN (untuk penamaan file harus ada kata "skhun")</p>
                                            <p>3. Kartu Keluarga (untuk penamaan file harus ada kata "kartu keluarga" atau "kk")</p>
                                            <p>4. Raport (untuk penamaan file harus ada kata "raport")</p>
                                            Format file harus berbentuk pdf dan maksimal 2 MB.
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingThree">
                                        <CButton 
                                            block 
                                            color="link" 
                                            className="text-left m-0 p-0" 
                                            onClick={() => setAccordion(accordion === 2 ? null : 2)}
                                        >
                                            <h5 className="m-0 p-0">Ajukan Pendaftaran</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 2}>
                                        <CCardBody>
                                            Setelah data diri dan berkas-berkas sudah diunggah. Saat nya anda mengajukan pendaftaran dengan memilih program paket yang diinginkan. Ingat!, anda tidak akan bisa melakukan pengajuan pendaftaran apabila data diri atau berkas-berkas anda tidak lengkap.
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataDiri;