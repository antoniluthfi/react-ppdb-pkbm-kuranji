import React, { useState, useEffect, useCallback } from 'react';
import UploadBerkasHelper from './modules/UploadBerkasHelper';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CForm,
    CFormGroup,
    CCardFooter,
    CRow,
    CCollapse,
} from '@coreui/react'; 
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { Redirect, Link } from 'react-router-dom';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;

const UploadBerkas = () => {
    const [accordion, setAccordion] = useState(1);
    const {
        currentUser,
        formDisabled,
        route,
        input, setInput,
        changeHandler,
        getCurrentUser,
        postBerkas,
        resetBerkas
    } = UploadBerkasHelper();
    const onDrop = useCallback(acceptedFiles => {
        setInput(acceptedFiles);
    }, []);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
    
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>        
    ));


    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <div>
            {route == '/pendaftaran/upload-berkas' ? null : <Redirect to={route} />}
            <CRow>
                <CCol xs="12" md="9">
                    <CCard>
                        <CCardHeader>Upload Berkas</CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <CRow>
                                    <CCol xs="12" md="12">
                                        <CFormGroup row>
                                            <CCol xs="12" md="12">
                                                <Container className="container">
                                                    <div {...getRootProps({className: 'dropzone'})}>
                                                        <input {...getInputProps()} name="file[]" accept="application/pdf" disabled={formDisabled} />
                                                        <p>Upload berkas anda disini. format berkas harus berbentuk pdf</p>
                                                    </div>
                                                    <aside>
                                                        <ul>{files}</ul>
                                                    </aside>
                                                </Container>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            {currentUser.berkas == null ? 
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
                                                postBerkas(currentUser.id);
                                            }
                                        });                
                                    }}
                                >
                                    <CIcon name="cil-scrubber" /> Submit
                                </CButton> :
                                <CButton 
                                    type="reset" 
                                    size="sm" 
                                    color="danger"
                                    className="ml-1"
                                    disabled={currentUser.pendaftaran == null ? false : true}
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Apakah anda yakin data ingin menghapus semua berkas anda?',
                                            text: "",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yakin!'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                resetBerkas(currentUser.id);
                                            }
                                        });                
                                    }}
                                >
                                    <CIcon name="cil-ban" /> Reset
                                </CButton>                            
                            }
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

export default UploadBerkas;