/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
/**
 * 服务端返回的menu菜单有两个作用
 * 第一作为菜单使用，所以不需要配置component这些属性，路由属性是routes.ts写死的，menu只是菜单显示而已
 * 第二作为权限校验使用，只有menu中存在的路由才能访问到，否则403，所以如果有详情页必须配置，只是添加hideInMenu: true不在菜单中显示而已
 */
export default function access(
  initialState: { currentUser?: API.CurrentUser; userRoutes?: API.MenuRouteItem[] } | undefined,
) {
  const { currentUser, userRoutes } = initialState ?? {};

  // canAccess参数route是routes.ts中需要校验的route项
  function canAccess(route: API.MenuRouteItem) {
    /// 管理员角色直接返回 true
    if (currentUser?.role?.includes('admin')) {
      return true;
    }
    // 检查是否需要特定角色才能访问
    if (route.roles && !route.roles.some((role) => currentUser?.role?.includes(role))) {
      return false;
    }
    // 检查是否在用户菜单中
    if (!userRoutes) {
      return false;
    }
    // 遍历用户菜单，递归检查子路由
    for (const userRoute of userRoutes) {
      if (userRoute.path === route.path) {
        return true;
      }
      if (userRoute.routes) {
        const hasAccess = canAccess(userRoute);
        if (hasAccess) {
          return true;
        }
      }
    }

    return false;
  }
  return {
    canAdmin: currentUser && currentUser.role?.includes('admin'),
    canAccess,
    show: true,
  };
}
