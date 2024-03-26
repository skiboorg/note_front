
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'profile', component: () => import('pages/profile.vue') },
      { path: 'claim', component: () => import('pages/claim.vue') },
      { path: 'earn', component: () => import('pages/claim.vue') },
      // { path: 'request', component: () => import('pages/dao.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
