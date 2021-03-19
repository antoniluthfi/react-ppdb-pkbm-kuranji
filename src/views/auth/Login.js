import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthHelper from './AuthHelper';

const Login = () => {
    const {
        isLoggedIn,
        input,
        changeHandler,
        login
    } = AuthHelper();

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            {isLoggedIn ? <Redirect to='/dashboard' /> : null}

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Masuk</h1>
                                        <p className="text-muted">Masuk ke akun anda</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>@</CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="email" name="email" value={input.email} onChange={changeHandler} placeholder="Email" autoComplete="email" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" name="password" value={input.password} onChange={changeHandler} placeholder="Password" autoComplete="current-password" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton color="warning" className="px-4" onClick={login}>Masuk</CButton>
                                            </CCol>
                                            <CCol xs="6" className="text-right">
                                                <CButton color="link" className="px-0">Lupa password? klik disini</CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-warning py-5 d-md-down-none" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>SELAMAT DATANG DI WEBSITE PPDB PKBM KURANJI</h2>
                                        <img src="https://drive.google.com/thumbnail?id=1YWZIOUMli3tzSzhe-Hot-bXl_JN4HbHs" width="30%" height="30%" />
                                        <p className="mt-0 mb-0 pt-0 pb-0">Silahkan daftar jika anda belum memiliki akun.</p>
                                        <Link to="/register">
                                            <CButton color="warning" className="mt-3" active tabIndex={-1}>Daftar Sekarang!</CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
