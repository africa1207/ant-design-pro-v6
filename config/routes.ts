/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * https://v3.umijs.org/zh-CN/plugins/plugin-layout#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE  支持扩展路由配置
 * @doc https://umijs.org/docs/guides/routes
 */
/**
 * name:string 配置菜单的 name，如果配置了国际化，name 为国际化的 key。
 * icon:string 配置菜单的图标，默认使用 antd 的 icon 名，默认不适用二级菜单的 icon。
 * access:string 权限配置，需要预先配置权限
 * hideChildrenInMenu:true 用于隐藏不需要在菜单中展示的子路由。
 * hideInMenu:true 可以在菜单中不展示这个路由，包括子路由。
 * hideInBreadcrumb:true 可以在面包屑中不展示这个路由，包括子路由。
 * headerRender:false 当前路由不展示顶栏
 * footerRender:false 当前路由不展示页脚
 * menuRender: false 当前路由不展示菜单
 * menuHeaderRender: false 当前路由不展示菜单顶栏
 * parentKeys: string[] 当此节点被选中的时候也会选中 parentKeys 的节点
 * flatMenu 子项往上提，只是不展示父菜单
 * layout: 'side' | 'top' | 'mix' 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 */
// 如果父级添加了canAccess，但routes中存在没添加canAccess属性的路由，一定要添加access: 'show',直接访问path没问题，但是刷新该path会出现403
// 如果父级添加了canAccess，使用RoutePage的组件记得添加access: 'show'
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理台',
    icon: 'crown',
    access: 'canAccess',
    routes: [
      {
        path: '/admin',
        component: './RoutePage',
        access: 'show',
      },
      {
        path: '/admin/sub-page',
        name: '子页面',
        component: './Admin',
        access: 'canAccess',
      },
    ],
  },
  {
    name: '表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
    access: 'canAccess',
  },
  {
    path: '/charts',
    name: '图表',
    icon: 'plus',
    access: 'canAccess',
    routes: [
      {
        path: '/charts',
        component: './RoutePage',
        access: 'show',
      },
      {
        path: '/charts/line-charts',
        name: '线性图表',
        component: './Charts/LineCharts/index',
        access: 'canAccess',
      },
      {
        path: '/charts/bar-charts',
        name: '柱状图表',
        component: './Charts/BarCharts/index',
        access: 'canAccess',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
