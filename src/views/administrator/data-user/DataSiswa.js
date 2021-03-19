import React, { useEffect, useCallback } from 'react';
import DataSiswaHelper from './modules/DataSiswaHelper';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CCollapse,
    CSelect
} from '@coreui/react';  

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

const DataSiswa = () => {
    const {
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
    } = DataSiswaHelper();

    const onDrop = useCallback(acceptedFiles => {
        setInputBerkas(acceptedFiles);
    }, []);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
    
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>        
    ));

    useEffect(() => {
        getCurrentUser();
        getDataUser();
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data User</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="warning" onClick={() => setWarning(!warning)} className="ml-3 mt-2">Tambah Data</CButton>
                                <CButton color="info" className="ml-1 mt-2" onClick={() => window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan/excel/data-user/siswa`, '_blank')}>Cetak Laporan</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <CDataTable
                                items={dataUser}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={isLoading}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id': 
                                    ((item, i) => <td className="text-center">{i + 1}</td>),
                                    'show_details':
                                    (item, index)=>{
                                        return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={()=>{toggleDetails(index)}}
                                            >
                                                {details.includes(index) ? 'Hide' : 'Show'}
                                            </CButton>
                                        </td>
                                        )
                                    },
                                    'details':
                                        (item, index)=>{
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getDataUserById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                {console.log(item.berkas)}
                                                {item.tgl_lahir == null ?
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataUserById(item.id, 'update')}>
                                                        Update
                                                    </CButton> :    
                                                    item.kabupaten == null ?                                         
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataUserById(item.id, 'isi formulir')}>
                                                        Isi Formulir Pendaftaran
                                                    </CButton> : 
                                                    item.berkas == null ?   
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataUserById(item.id, 'upload berkas')}>
                                                        Unggah Berkas
                                                    </CButton> : 
                                                    item.pendaftaran == null ? 
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataUserById(item.id, 'ajukan pendaftaran')}>
                                                        Ajukan Pendaftaran
                                                    </CButton> :                  
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan/data-user/${item.id}`, '_blank')}>
                                                        Cetak Data Diri
                                                    </CButton>
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataUserById(item.id, 'delete')}>
                                                    Delete
                                                </CButton>         
                                            </CCardBody>
                                        </CCollapse>
                                        )
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <CModal 
                show={warning} 
                onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
                color="warning"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Nama</CLabel>
                                    <CInput type="text" name="name" id="name" value={input.name} onChange={changeHandler} placeholder="Masukkan Nama" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput type="email" name="email" id="email" value={input.email} onChange={changeHandler} placeholder="Masukkan Email" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nik">NIK</CLabel>
                                    <CInput type="number" name="nik" id="nik" value={input.nik} onChange={changeHandler} placeholder="Masukkan NIK" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tempat-lahir">Tempat Lahir</CLabel>
                                    <CInput type="text" name="tempat_lahir" id="tempat-lahir" value={input.tempat_lahir} onChange={changeHandler} placeholder="Masukkan Tempat Lahir" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tgl-lahir">Tanggal Lahir</CLabel>
                                    <CInput type="date" name="tgl_lahir" id="tgl-lahir" value={input.tgl_lahir} onChange={changeHandler} placeholder="Masukkan Tanggal Lahir" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="alamat">Alamat</CLabel>
                                    <CInput type="text" name="alamat" id="alamat" value={input.alamat} onChange={changeHandler} placeholder="Masukkan Alamat" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="jenis-kelamin">Jenis Kelamin</CLabel>
                                    <CSelect custom name="jenis_kelamin" id="jenis-kelamin" value={input.jenis_kelamin} onChange={changeHandler} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="laki-laki">Laki-laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => submitHandler(buttonSubmitName.toLowerCase())}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler(buttonSubmitName.toLowerCase())}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('view')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>View Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Nama</CLabel>
                                    <CInput type="text" name="name" id="name" value={currentDataUser.name} placeholder="Masukkan Nama" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput type="email" name="email" id="email" value={currentDataUser.email} placeholder="Masukkan Email" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nik">NIK</CLabel>
                                    <CInput type="number" name="nik" id="nik" value={currentDataUser.nik} placeholder="Masukkan NIK" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tempat-lahir">Tempat Lahir</CLabel>
                                    <CInput type="text" name="tempat_lahir" id="tempat-lahir" value={currentDataUser.tempat_lahir} placeholder="Masukkan Tempat Lahir" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tgl-lahir">Tanggal Lahir</CLabel>
                                    <CInput type="date" name="tgl_lahir" id="tgl-lahir" value={currentDataUser.tgl_lahir} placeholder="Masukkan Tanggal Lahir" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="alamat">Alamat</CLabel>
                                    <CInput type="text" name="alamat" id="alamat" value={currentDataUser.alamat} placeholder="Masukkan Alamat" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="jenis-kelamin">Jenis Kelamin</CLabel>
                                    <CSelect custom name="cabang" id="cab-penempatan" value={currentDataUser.cabang} disabled={true} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="laki-laki">Laki-laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* isi formulir */}
            <CModal 
                show={formulirModal} 
                onClose={() => closeModalHandler('isi formulir')}
                color="warning"
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Isi Formulir Pendaftaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="anak_ke">Anak Ke</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" id="anak_ke" name="anak_ke" value={inputFormulir.anak_ke} onChange={formulirChangeHandler} placeholder="Anak ke" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="jumlah_saudara">Jumlah Saudara</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" id="jumlah_saudara" name="jumlah_saudara" value={inputFormulir.jumlah_saudara} onChange={formulirChangeHandler} placeholder="Masukkan Jumlah Saudara" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="pendidikan_terakhir">Pendidikan Terakhir</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="pendidikan_terakhir" name="pendidikan_terakhir" value={inputFormulir.pendidikan_terakhir} onChange={formulirChangeHandler} placeholder="Masukkan Pendidikan Terakhir" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="sekolah_asal">Sekolah Asal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="sekolah_asal" name="sekolah_asal" value={inputFormulir.sekolah_asal} onChange={formulirChangeHandler} placeholder="Masukkan Sekolah Asal" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="tahun_lulus">Tahun Lulus</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" id="tahun_lulus" name="tahun_lulus" value={inputFormulir.tahun_lulus} onChange={formulirChangeHandler} placeholder="Masukkan Tahun Lulus" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="tinggi_badan">Tinggi Badan (cm)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" id="tinggi_badan" name="tinggi_badan" value={inputFormulir.tinggi_badan} onChange={formulirChangeHandler} placeholder="Masukkan Tinggi Badan" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="berat_badan">Berat Badan (kg)</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" id="berat_badan" name="berat_badan" value={inputFormulir.berat_badan} onChange={formulirChangeHandler} placeholder="Masukkan Berat Badan" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="kelurahan">Kelurahan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="kelurahan" name="kelurahan" value={inputFormulir.kelurahan} onChange={formulirChangeHandler} placeholder="Masukkan Kelurahan" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="kecamatan">Kecamatan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="kecamatan" name="kecamatan" value={inputFormulir.kecamatan} onChange={formulirChangeHandler} placeholder="Masukkan Kecamatan" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="kabupaten">Kabupaten</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="kabupaten" name="kabupaten" value={inputFormulir.kabupaten} onChange={formulirChangeHandler} placeholder="Masukkan Kabupaten" />
                                </CCol>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="nama_ayah">Nama Ayah</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="nama_ayah" name="nama_ayah" value={inputFormulir.nama_ayah} onChange={formulirChangeHandler} placeholder="Masukkan Nama Ayah" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="tgl_lahir_ayah">Tanggal Lahir Ayah</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" id="tgl_lahir_ayah" name="tgl_lahir_ayah" value={inputFormulir.tgl_lahir_ayah} onChange={formulirChangeHandler} placeholder="Masukkan Tanggal Lahir Ayah" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="pekerjaan_ayah">Pekerjaan Ayah</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="pekerjaan_ayah" name="pekerjaan_ayah" value={inputFormulir.pekerjaan_ayah} onChange={formulirChangeHandler} placeholder="Masukkan Pekerjaan Ayah" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="nama_ibu">Nama Ibu</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="nama_ibu" name="nama_ibu" value={inputFormulir.nama_ibu} onChange={formulirChangeHandler} placeholder="Masukkan Nama Ibu" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="tgl_lahir_ibu">Tanggal Lahir Ibu</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" id="tgl_lahir_ibu" name="tgl_lahir_ibu" value={inputFormulir.tgl_lahir_ibu} onChange={formulirChangeHandler} placeholder="Masukkan Tanggal Lahir Ibu" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="pekerjaan_ibu">Pekerjaan Ibu</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" id="pekerjaan_ibu" name="pekerjaan_ibu" value={inputFormulir.pekerjaan_ibu} onChange={formulirChangeHandler} placeholder="Masukkan Pekerjaan Ibu" />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" id="nomorhp" name="nomorhp" value={inputFormulir.nomorhp} onChange={formulirChangeHandler} placeholder="Masukkan Nomor HP" />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => submitHandler('isi formulir')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('isi formulir')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* upload berkas */}
            <CModal 
                show={berkasModal} 
                onClose={() => closeModalHandler('upload berkas')}
                color="warning"
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Unggah Berkas</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup row>
                                    <CCol xs="12" md="12">
                                        <Container className="container">
                                            <div {...getRootProps({className: 'dropzone'})}>
                                                <input {...getInputProps()} name="file[]" accept="application/pdf" />
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
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => submitHandler('upload berkas')}>Upload</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('upload berkas')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* ajukan pendaftaran */}
            <CModal 
                show={pengajuanModal} 
                onClose={() => closeModalHandler('upload berkas')}
                color="warning"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Pangajuan Pendaftaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="program_paket">Pilih Program Paket</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CSelect custom name="program_paket" id="program_paket" value={inputPengajuan.program_paket} onChange={pengajuanChangeHandler} >
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
                                    <CSelect custom name="periode" id="periode" value={inputPengajuan.periode} onChange={pengajuanChangeHandler} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>
                                    </CSelect>
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => submitHandler('ajukan pendaftaran')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('ajukan pendaftaran')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default DataSiswa;