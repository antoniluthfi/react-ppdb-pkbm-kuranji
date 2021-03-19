import React, { useEffect } from 'react';
import DataAdministratorHelper from './modules/DataAdministratorHelper';
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
import moment from 'moment';

const DataAdministrator = () => {
    const {
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
    } = DataAdministratorHelper();

    useEffect(() => {
        getDataUser();
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Administrator</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="warning" onClick={() => setWarning(!warning)} className="ml-3 mt-2">Tambah Data</CButton>
                                <CButton color="info" className="ml-1 mt-2" onClick={() => window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan/excel/data-user/administrator`, '_blank')}>Cetak Laporan</CButton>
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
                                                <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataUserById(item.id, 'update')}>
                                                    Update
                                                </CButton>
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
        </>
    )
}

export default DataAdministrator;