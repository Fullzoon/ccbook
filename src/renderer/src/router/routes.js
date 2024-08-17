import {
  BookOutlined,
  SearchOutlined,
  EditOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue'

const routeMap = [
  {
    path: '/main',
    name: 'main',
    meta: {
      title: '主页',
      icon: BookOutlined
    },
    component: () => import('../views/main/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索',
      icon: SearchOutlined
    },
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/rule',
    name: 'rule',
    meta: {
      title: '规则',
      icon: EditOutlined
    },
    component: () => import('../views/rule/index.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      icon: SettingOutlined,
    },
    component: () => import('../views/setting/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      icon: InfoCircleOutlined,
    },
    component: () => import('../views/about/index.vue')
  }
  /* {
    path: '/dataBoard',
    name: 'dataBoard',
    redirect: '/dataBoard/1',
    component: () => import('../layouts/BlankLayout.vue'),
    meta: {
      title: '数据看板',
      icon: BarChartOutlined,
    },
    children: [
      {
        path: '/dataBoard/1',
        name: 'dataBoard-1',
        component: () => import('../views/dataBoard/1.vue'),
        meta: { title: '数据看板1' }
      },
      {
        path: '/dataBoard/2',
        name: 'dataBoard-2',
        component: () => import('../views/dataBoard/2.vue'),
        meta: { title: '数据看板2', hide: true }
      },
      {
        path: '/dataBoard/3',
        name: 'dataBoard-3',
        component: () => import('../views/dataBoard/3.vue'),
        meta: { title: '数据看板3' }
      }
    ]
  } */
]

export default routeMap