// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**
 * 获取数据字典
 * @param params {dictKeys: string[]} dictKeys如果为空则返回所有字典
 * @param options
 */
export async function getServerDicts(
  params?: {
    dictKeys?: string[];
  },
  options?: { [key: string]: any },
) {
  return request<Common.ResponseStructure<API.DictsType>>('/api/getDicts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
