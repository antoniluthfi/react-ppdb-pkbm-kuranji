import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
      <CLink to="/dashboard" rel="noopener noreferrer">PKBM Kuranji</CLink>
        <span className="ml-1">&copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Aplikasi PPDB Online</span>
        <CLink to="/dashboard" rel="noopener noreferrer">PKBM Kuranji</CLink>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
