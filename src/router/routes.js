
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
      { path: 'raffles', component: () => import('pages/raffles.vue') },
      { path: 'raffles/:id', component: () => import('pages/raffle.vue') },
      { path: 'd3adchain', component: () => import('pages/history.vue') },
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
