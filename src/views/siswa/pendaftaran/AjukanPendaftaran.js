import React, { useState, useEffect } from 'react';
import AjukanPendaftaranHelper from './modules/AjukanPendaftaranHelper';
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
import { Redirect, Link } from 'react-router-dom';

const AjukanPendaftaran = () => {
    const [accordion, setAccordion] = useState(2);
    const {
        currentUser,
        loadCurrentUser,
        formDisabled,
        route,
        input,
        changeHandler,
        getCurrentUser,
        ajukanPendaftaran,
        cetakKartuPendaftaran
    } = AjukanPendaftaranHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <div>
            {route == '/pendaftaran/ajukan-pendaftaran' ? null : <Redirect to={route} />}
            <CRow>
                <CCol xs="12" md="5">
                    <CCard>
                        <CCardHeader>Formulir Pendaftaran</CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                                <CRow>
                                    <CCol xs="12" md="12">
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="program_paket">Pilih Program Paket</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="program_paket" id="program_paket" value={input.program_paket} onChange={changeHandler} disabled={formDisabled} >
                                                    <option value="">Pilih Salah Satu</option>
                                                    <option value="paket a">Paket A</option>
                                                    <option value="paket b">Paket B</option>
                                                    <option value="paket c">Paket C</option>
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="12">
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="periode">Pilih Periode</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="periode" id="periode" value={input.periode} onChange={changeHandler} disabled={formDisabled} >
                                                    <option value="">Pilih Salah Satu</option>
                                                    <option value="1">Semester 1</option>
                                                    <option value="2">Semester 2</option>
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            {currentUser.pendaftaran == null ?
                                <CButton 
                                    type="submit" 
                                    size="sm" 
                                    color="primary" 
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
                                                ajukanPendaftaran(currentUser.id);
                                            }
                                        });                
                                    }}
                                >
                                    <CIcon name="cil-scrubber" /> Submit
                                </CButton> :
                                <CButton 
                                    type="submit" 
                                    size="sm" 
                                    color="info"
                                    className="ml-1"
                                    onClick={() => cetakKartuPendaftaran(currentUser.id)}
                                >
                                    <CIcon name="cil-ban" /> Cetak kartu Pendaftaran
                                </CButton>                            
                            }
                        </CCardFooter>
                    </CCard>                    
                </CCol>

                <CCol xs="12" md="4">
                    <CCard>
                        <CCardHeader>Detail Pendaftaran</CCardHeader>
                        <CCardBody>
                            <table>
                                <tr>
                                    <th><h5>No Pendaftaran</h5></th>
                                    <td><h5>: {loadCurrentUser ? null : currentUser.pendaftaran == null ? null : currentUser.pendaftaran.id}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Program Paket</h5></th>
                                    <td><h5>: {loadCurrentUser ? 'Belum Mendaftar' : currentUser.pendaftaran == null ? null : currentUser.pendaftaran.program_paket.toUpperCase()}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Status</h5></th>
                                    <td><h5>: {loadCurrentUser ? 'Belum Mendaftar' : currentUser.pendaftaran == null ? null : currentUser.pendaftaran.status === 'pending' ? 'Menunggu Pengumuman' : 'Diterima'}</h5></td>
                                </tr>
                            </table>
                        </CCardBody>
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
                                            Lengkapi data diri anda dengan mengisi formulir yang telah disediakan <Link to="/pendaftaran/pengisian-formulir">di laman pengisian formulir</Link>.
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

export default AjukanPendaftaran;