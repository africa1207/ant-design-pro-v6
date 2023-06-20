import { Request, Response } from 'express';
import { waitTime } from './user';

export default {
  '/api/auth_routes': {
    '/form/advanced-form': { authority: ['admin', 'user'] },
  },
  'GEt /api/getMenuList': async (req: Request, res: Response) => {
    res.send({
      success: true,
      data: [
        {
          path: '/welcome',
          name: '欢迎页',
          icon: 'smile',
        },
        {
          path: '/admin',
          name: '管理台',
          icon: 'crown',
          routes: [
            {
              path: '/admin/sub-page',
              name: '子页面',
            },
          ],
        },
        {
          name: '表格',
          icon: 'table',
          path: '/list',
        },
        {
          path: '/charts',
          name: '图表',
          icon: 'plus',
          routes: [
            {
              path: '/charts/line-charts',
              name: '线性图表',
            },
            {
              path: '/charts/bar-charts',
              name: '柱状图表',
            },
          ],
        },
      ],
    });
  },
};
