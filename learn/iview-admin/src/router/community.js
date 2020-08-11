import Main from '@/components/main'

export default [
  // 菜单分三种情况
  //  链接式的跳转 -> doc
  //  内嵌的子页面 -> Main Layout -> children
  //  一级菜单上添加的路由 (hideInMenu hideInBread)

  // 内容管理
  // 1.文章管理 -> 文章内容管理，文章标签管理（热门、精华 etc）
  {
    path: '/manage',
    name: 'manage',
    meta: {
      icon: 'logo-buffer',
      title: '文章管理'
    },
    component: Main,
    children: [
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '文章内容管理'
        },
        component: () => import('@/view/components/tables/tables.vue')
      }
    ]
  }
]
