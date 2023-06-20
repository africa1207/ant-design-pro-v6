declare namespace Common {
  // 错误处理方案： 错误类型

  // 与后端约定的响应数据格式
  type ResponseStructure<T> = {
    success: boolean;
    data: T;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    [key: string]: any;
  };
}
