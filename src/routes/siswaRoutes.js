import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/siswa/dashboard/Dashboard'));
const DataDiri = lazy(() => import('../views/siswa/pendaftaran/DataDiri'));
const UploadBerkas = lazy(() => import('../views/siswa/pendaftaran/UploadBerkas'));
const AjukanPendaftaran = lazy(() => import('../views/siswa/pendaftaran/AjukanPendaftaran'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/pendaftaran', name: 'Pendaftaran', exact: true },
  { path: '/pendaftaran/pengisian-formulir', name: 'Pengisian Formulir', component: DataDiri },
  { path: '/pendaftaran/upload-berkas', name: 'Upload Berkas', component: UploadBerkas },
  { path: '/pendaftaran/ajukan-pendaftaran', name: 'Pengajuan Pendaftaran', component: AjukanPendaftaran }
];

export default routes;
