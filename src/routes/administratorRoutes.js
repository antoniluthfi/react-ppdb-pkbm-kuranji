import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/administrator/dashboard/Dashboard'));
const DataUser = lazy(() => import('../views/administrator/data-user/DataSiswa'));
const DataAdministrator = lazy(() => import('../views/administrator/data-user/DataAdministrator'));
const ListPendaftar = lazy(() => import('../views/administrator/list-pendaftar/ListPendaftar'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/master-data', name: 'Master Data', exact: true },
  { path: '/master-data/data-user', name: 'Data User', component: DataUser },
  { path: '/master-data/data-administrator', name: 'Data Administrator', component: DataAdministrator },
  { path: '/pendaftaran', name: 'Pendaftaran', component: ListPendaftar },
];

export default routes;
