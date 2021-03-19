import React, { useEffect } from 'react'
import DashboardHelper from './modules/DashboardHelper'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCarousel,
    CCarouselCaption,
    CCarouselControl,
    CCarouselIndicators,
    CCarouselInner,
    CCarouselItem,
    CCol,
    CRow 
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import MainChartExample from '../../charts/MainChartExample.js'

// const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))

const slides = [
    'https://drive.google.com/thumbnail?id=1P8co2LKlBwViOFN5IGc8tGldilnkDFRt',
    'https://drive.google.com/thumbnail?id=1ciSCPVXNBw3Eb-3Q4BmIkQAgtGLur4T1',
];

const Dashboard = () => {
    const {
        currentUser,
        loadCurrentUser,
        totalPendaftar,
        loadTotalPendaftar,
        getCurrentUser,
        getTotalPendaftar,
    } = DashboardHelper();

    useEffect(() => {
        getCurrentUser();
        getTotalPendaftar();
    }, []);

    return (
        <>
            <CCard>
                <CCardHeader></CCardHeader>
                <CCardBody>
                    <CCarousel animate autoSlide={3000}>
                        <CCarouselIndicators/>
                            <CCarouselInner>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={slides[0]} height="450" alt="slide 1" style={{ objectFit: 'cover' }}/>
                                    <CCarouselCaption><h3>Selamat Datang {currentUser.name}</h3><p>Di website PPDB Online PKBM Kuranji</p></CCarouselCaption>
                                </CCarouselItem>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={slides[1]} height="450" alt="slide 2" style={{ objectFit: 'cover' }} />
                                    <CCarouselCaption><h3>Pusat Kegiatan Belajar Masyarakat (PKBM) Kuranji</h3><p>Jl. Ahmad Yani Km.28 Kuranji Kota Banjarbaru Provinsi Kalimantan Selata, Guntungmanggis, Kec. Landasan Ulin, Kota Banjarbaru Prov. Kalimantan Selatan</p></CCarouselCaption>
                                </CCarouselItem>
                            </CCarouselInner>
                            <CCarouselControl direction="prev"/>
                        <CCarouselControl direction="next"/>
                    </CCarousel>
                </CCardBody>
            </CCard>

            <CRow>
                <CCol xs="12" sm="12" md="6">
                    <CCard accentColor="primary">
                        <CCardHeader>Profil Anda</CCardHeader>
                        <CCardBody>
                            <p className="display-4" style={{ fontSize: 35 }}>{loadCurrentUser ? null : currentUser.name.toUpperCase()}</p>
                            <p className="lead">Anda login sebagai : {loadCurrentUser ? null : currentUser.hak_akses}</p>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs="12" sm="12" md="6">
                    <CCard accentColor="primary">
                        <CCardHeader>Data Pendaftaran</CCardHeader>
                        <CCardBody>
                            <p className="display-4 mt-0 mb-0" style={{ fontSize: 22 }}>Total Pendaftar : {loadTotalPendaftar ? 0 : totalPendaftar.total_pendaftar == null ? 0 : totalPendaftar.total_pendaftar} Orang</p>
                            <CRow>
                                <CCol xs="12" md="6">
                                    <p className="lead mt-0 mb-0">Pendaftar Paket A : {loadTotalPendaftar ? 0 : totalPendaftar.paket_a == null ? 0 : totalPendaftar.paket_a} Orang</p>
                                    <p className="lead mt-0 mb-0">Pendaftar Paket B : {loadTotalPendaftar ? 0 : totalPendaftar.paket_b == null ? 0 : totalPendaftar.paket_b} Orang</p>
                                    <p className="lead mt-0 mb-0">Pendaftar Paket C : {loadTotalPendaftar ? 0 : totalPendaftar.paket_c == null ? 0 : totalPendaftar.paket_c} Orang</p>
                                </CCol>
                                <CCol xs="12" md="6">
                                    <p className="lead mt-0 mb-0">Diterima : {loadTotalPendaftar ? 0 : totalPendaftar.diterima == null ? 0 : totalPendaftar.diterima} Orang</p>
                                    <p className="lead mt-0 mb-0">Ditolak : {loadTotalPendaftar ? 0 : totalPendaftar.tidak_diterima == null ? 0 : totalPendaftar.tidak_diterima} Orang</p>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Dashboard
