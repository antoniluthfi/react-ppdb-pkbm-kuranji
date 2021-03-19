import React, { useEffect } from 'react';
import ListPendaftarHelper from './modules/ListPendaftarHelper';
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

const ListPendaftar = () => {
    const {
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
    } = ListPendaftarHelper();

    useEffect(() => {
        getDataUser();
        getperiode();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Administrator</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="info" className="ml-3 mt-2" onClick={() => setCetakLaporanModal(!cetakLaporanModal)}>Cetak Laporan</CButton>
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
                                    'no':
                                    ((item, i) => <td className="text-center">{i + 1}</td>),
                                    'id': 
                                    ((item, i) => <td className="text-center">{item.id}</td>),
                                    'created_at':
                                    (item => <td className="text-center">{moment(item.tgl_daftar).format('ll')}</td>),
                                    'tempat_lahir': 
                                    ((item, i) => <td className="text-center">{item.tempat_lahir}, {moment(item.tgl_lahir).format('L')}</td>),
                                    'program_paket': 
                                    ((item, i) => <td className="text-center">{item.program_paket.toUpperCase()}</td>),
                                    'status': 
                                    ((item, i) => <td className="text-center">{item.status.toUpperCase()}</td>),
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
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan/data-user/${item.id}`, '_blank')}>
                                                    Cetak Kartu Pendaftaran
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
                onClose={() => closeModalHandler('update')}
                color="warning"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Update Status Pendaftaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="status">Status Pendaftaran</CLabel>
                                    <CSelect custom name="status" id="status" value={input.status} onChange={changeHandler} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="diterima">Diterima</option>
                                        <option value="tidak diterima">Tidak Diterima</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => updateStatusPendaftaran(currentDataUser.id)}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('update')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('view')}
                color="info"
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>View Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" className="form-horizontal">
                        {loadCurrentDataUser ? null : 
                            <>
                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="name">Nama</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="name" name="name" value={currentDataUser.name} placeholder="Masukkan Nama Anda" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nik">NIK</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="nik" name="nik" value={currentDataUser.nik} placeholder="Masukkan NIK" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tempat-lahir">Tempat Lahir</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="tempat-lahir" name="tempat_lahir" value={currentDataUser.tempat_lahir} placeholder="Masukkan Tempat Lahir" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tgl-lahir">Tanggal Lahir</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="date" id="tgl-lahir" name="tgl_lahir" value={currentDataUser.tgl_lahir} placeholder="Masukkan Tanggal Lahir" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="jenis_kelamin">Jenis Kelamin</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={currentDataUser.jenis_kelamin} disabled >
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
                                                <CInput type="number" id="anak_ke" name="anak_ke" value={currentDataUser.anak_ke} placeholder="Anak ke" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="jumlah_saudara">Jumlah Saudara</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="jumlah_saudara" name="jumlah_saudara" value={currentDataUser.jumlah_saudara} placeholder="Masukkan Jumlah Saudara" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="pendidikan_terakhir">Pendidikan Terakhir</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="pendidikan_terakhir" name="pendidikan_terakhir" value={currentDataUser.pendidikan_terakhir} placeholder="Masukkan Pendidikan Terakhir" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="sekolah_asal">Sekolah Asal</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="sekolah_asal" name="sekolah_asal" value={currentDataUser.sekolah_asal} placeholder="Masukkan Sekolah Asal" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tahun_lulus">Tahun Lulus</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="tahun_lulus" name="tahun_lulus" value={currentDataUser.tahun_lulus} placeholder="Masukkan Tahun Lulus" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tinggi_badan">Tinggi Badan (cm)</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="tinggi_badan" name="tinggi_badan" value={currentDataUser.tinggi_badan} placeholder="Masukkan Tinggi Badan" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="berat_badan">Berat Badan (kg)</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="berat_badan" name="berat_badan" value={currentDataUser.berat_badan} placeholder="Masukkan Berat Badan" disabled />
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" md="6">
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nama_ayah">Nama Ayah</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="nama_ayah" name="nama_ayah" value={currentDataUser.nama_ayah} placeholder="Masukkan Nama Ayah" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tgl_lahir_ayah">Tanggal Lahir Ayah</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="date" id="tgl_lahir_ayah" name="tgl_lahir_ayah" value={currentDataUser.tgl_lahir_ayah} placeholder="Masukkan Tanggal Lahir Ayah" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="pekerjaan_ayah">Pekerjaan Ayah</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="pekerjaan_ayah" name="pekerjaan_ayah" value={currentDataUser.pekerjaan_ayah} placeholder="Masukkan Pekerjaan Ayah" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nama_ibu">Nama Ibu</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="nama_ibu" name="nama_ibu" value={currentDataUser.nama_ibu} placeholder="Masukkan Nama Ibu" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="tgl_lahir_ibu">Tanggal Lahir Ibu</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="date" id="tgl_lahir_ibu" name="tgl_lahir_ibu" value={currentDataUser.tgl_lahir_ibu} placeholder="Masukkan Tanggal Lahir Ibu" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="pekerjaan_ibu">Pekerjaan Ibu</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="pekerjaan_ibu" name="pekerjaan_ibu" value={currentDataUser.pekerjaan_ibu} placeholder="Masukkan Pekerjaan Ibu" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="number" id="nomorhp" name="nomorhp" value={currentDataUser.nomorhp} placeholder="Masukkan Nomor HP" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="alamat">Alamat</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="alamat" name="alamat" value={currentDataUser.alamat} placeholder="Masukkan Alamat" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="kelurahan">Kelurahan</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="kelurahan" name="kelurahan" value={currentDataUser.kelurahan} placeholder="Masukkan Kelurahan" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="kecamatan">Kecamatan</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="kecamatan" name="kecamatan" value={currentDataUser.kecamatan} placeholder="Masukkan Kecamatan" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor="kabupaten">Kabupaten</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type="text" id="kabupaten" name="kabupaten" value={currentDataUser.kabupaten} placeholder="Masukkan Kabupaten" disabled />
                                            </CCol>
                                        </CFormGroup>

                                        <CRow>
                                            <CCol xs="12" md="6">
                                                <a className="btn btn-success" href={`${process.env.REACT_APP_PUBLIC_URL}/berkas/${currentDataUser.berkas.ijazah}`} download={currentDataUser.berkas.ijazah} target="_blank">Download Ijazah</a>
                                            </CCol>
                                            <CCol xs="12" md="6">
                                                <a className="btn btn-success" href={`${process.env.REACT_APP_PUBLIC_URL}/berkas/${currentDataUser.berkas.skhun}`} download={currentDataUser.berkas.skhun} target="_blank">Download SKHUN</a>
                                            </CCol>
                                        </CRow>

                                        <CRow className="mt-2">
                                            <CCol xs="12" md="6">
                                                <a className="btn btn-success" href={`${process.env.REACT_APP_PUBLIC_URL}/berkas/${currentDataUser.berkas.kartu_keluarga}`} download={currentDataUser.berkas.kartu_keluarga} target="_blank">Download Kartu Keluarga</a>
                                            </CCol>
                                            <CCol xs="12" md="6">
                                                <a className="btn btn-success" href={`${process.env.REACT_APP_PUBLIC_URL}/berkas/${currentDataUser.berkas.raport}`} download={currentDataUser.berkas.raport} target="_blank">Download Raport</a>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </>
                        }
                    </CForm>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* modal laporan */}
            <CModal 
                show={cetakLaporanModal} 
                onClose={() => setCetakLaporanModal(!cetakLaporanModal)}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Cetak Laporan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="status">Status Pendaftaran</CLabel>
                                    <CSelect custom name="status" id="status" value={input.status} onChange={changeHandler} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="semua">Semua</option>
                                        <option value="diterima">Diterima</option>
                                        <option value="tidak diterima">Tidak Diterima</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="periode">Periode</CLabel>
                                    <CSelect custom name="periode" id="periode" value={input.periode} onChange={changeHandler} >
                                        {loadDataPeriode ? <option value="">Pilih Salah Satu</option>
                                            : 
                                            <>
                                            <option value="">Pilih Salah Satu</option>
                                            {dataPeriode.map(item => (
                                                <option key={item.periode} value={item.periode}>{item.periode}</option>
                                            ))}
                                            </>
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="info" onClick={() => window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan/excel/pendaftaran/${input.status}/${input.periode}`, '_blank')}>Cetak</CButton>{' '}
                    <CButton color="secondary" onClick={() => setCetakLaporanModal(!cetakLaporanModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ListPendaftar;