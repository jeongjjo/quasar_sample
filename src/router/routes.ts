import { RouteRecordRaw } from 'vue-router';

import ClaerLayout from '../components/ClarLayout/ClaerLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'sampleTable', component: () => import('pages/sampleTablePage/SampleTablePage.vue') },
      { path: 'sampleModal', component: () => import('pages/sampleModalPage/SampleModalPage.vue') },
    ],
  },
  {
    path: '/signIn',
    component: () => import('layouts/ClearLayout.vue'),
    children: [
      { path: '', component: () => import('pages/accountPage/signInPage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
