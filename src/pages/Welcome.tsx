import { PageContainer, ProTable, ProColumns, TableDropdown } from '@ant-design/pro-components';
import { Card, theme } from 'antd';
import React from 'react';
import { useModel } from '@umijs/max';
import { rule } from '@/services/api';
import convertDictToMap from '@/utils/convertDictToMap';

const Welcome: React.FC = () => {
  const { initialState: { dicts = {} } = {} } = useModel('@@initialState');
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'name',
      title: '姓名',
    },
    {
      dataIndex: 'desc',
      title: '描述',
      ellipsis: true,
      copyable: true,
      // hideInSearch: true,
    },
    {
      dataIndex: 'status',
      title: '性别状态',
      // hideInSearch: true,
      valueType: 'select',
      // valueEnum: convertDictToMap(dicts, 'user.gender'),
      fieldProps: { options: dicts['user.gender'] },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            // @ts-ignore
            action?.startEditable?.(record.key);
          }}
        >
          编辑
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <ProTable
            // params 是需要自带的参数
            // 这个参数优先级更高，会覆盖查询表单的参数
            // params={{}}
            rowSelection={{
              onChange: (_, selectedRows) => {},
            }}
            columns={columns}
            request={async (
              // 第一个参数 params 查询表单和 params 参数的结合
              // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
              params: {
                pageSize: number;
                current: number;
              },
              sort,
              filter,
            ) => {
              // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
              // 如果需要转化参数可以在这里进行修改
              const msg = await rule({
                ...params,
                current: params.current,
                pageSize: params.pageSize,
              });
              return {
                data: msg.data,
                // success 请返回 true，
                // 不然 table 会停止解析数据，即使有数据
                success: msg.success,
                // 不传会使用 data 的长度，如果是分页一定要传
                total: msg.total,
              };
            }}
            search={{}}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
