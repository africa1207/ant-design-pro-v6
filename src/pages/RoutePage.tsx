import { PageContainer } from '@ant-design/pro-components';
import { useModel, useLocation, Link } from '@umijs/max';
import React, { memo, useMemo } from 'react';
import { Row, Card, Col } from 'antd';

export default memo(function () {
  const { initialState } = useModel('@@initialState');
  const { pathname } = useLocation();
  const userRoutes = initialState?.userRoutes;

  // 递归搜索嵌套路由
  const getNestedRoutes = (routes: API.MenuRouteItem[], path: string) => {
    let nestedRoutes: API.MenuRouteItem[] = [];
    for (const route of routes) {
      if (route.path === path) {
        nestedRoutes = route.routes || [];
        break;
      } else if (route.routes) {
        nestedRoutes = getNestedRoutes(route.routes, path);
        if (nestedRoutes.length) {
          break;
        }
      }
    }
    return nestedRoutes;
  };

  // 返回当前路径名的嵌套路由
  const routePages = useMemo(() => {
    let nestedRoutes: API.MenuRouteItem[] = [];
    if (userRoutes?.length) {
      nestedRoutes = getNestedRoutes(userRoutes, pathname);
    }
    return nestedRoutes;
  }, [userRoutes, pathname]);

  return (
    <PageContainer breadcrumbRender={false}>
      <Row gutter={16}>
        {routePages?.length &&
          routePages.map((route) => (
            <Col key={route.path} span={3}>
              <Link to={route.path}>
                <Card hoverable bordered={true}>
                  {route.routes && route.routes.length && '目录-'}
                  {route.name}
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </PageContainer>
  );
});
