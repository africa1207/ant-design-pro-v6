/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

export default function access(
  initialState: { currentUser?: API.CurrentUser; userRoutes?: API.MenuRouteItem[] } | undefined,
) {
  const { currentUser, userRoutes } = initialState ?? {};

  function canAccess(route: API.MenuRouteItem) {
    /// 管理员角色直接返回 true
    if (currentUser?.roles?.includes('admin')) {
      return true;
    }
    // 检查是否需要特定角色才能访问
    if (route.roles && !route.roles.some((role) => currentUser?.roles?.includes(role))) {
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
    canAdmin: currentUser && currentUser.roles?.includes('admin'),
    canAccess,
    show: true,
  };
}
