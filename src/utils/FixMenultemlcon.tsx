import React from 'react';
import * as allIcons from '@ant-design/icons';

//FIX从接口获取菜单时icon为string类型
const FixMenuItemIcon = (
  menus: API.MenuRouteItem[],
  iconType = 'Outlined',
): API.MenuRouteItem[] => {
  menus.forEach((item) => {
    const { icon, routes } = item;
    if (icon && typeof icon === 'string') {
      const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
      // @ts-ignore
      item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    routes && routes.length > 0 ? (item.routes = FixMenuItemIcon(routes)) : null;
  });
  return menus;
};

export default FixMenuItemIcon;
