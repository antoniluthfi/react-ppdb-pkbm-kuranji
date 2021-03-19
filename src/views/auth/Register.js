import React from 'react'
import { Redirect } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
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
import AuthHelper from './AuthHelper'

const Register = () => {
    const {
        isRegistered,
        input,
        changeHandler,
        register
    } = AuthHelper();

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            {isRegistered ? <Redirect to='/login' /> : null}

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Daftar</h1>
                                    <p className="text-muted">Buat akun baru</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-user" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="text" name="name" value={input.name} onChange={changeHandler} placeholder="Nama lengkap" autoComplete="username" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>@</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="email" name="email" value={input.email} onChange={changeHandler} placeholder="Email" autoComplete="email" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" name="password" value={input.password} onChange={changeHandler} placeholder="Password" autoComplete="new-password" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" name="c_password" value={input.c_password} onChange={changeHandler} placeholder="Ulangi password" autoComplete="new-password" />
                                    </CInputGroup>
                                    <CButton color="warning" onClick={register} block>Buat Akun</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register
