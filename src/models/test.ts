import { useState } from 'react';

// 用法:需要处直接使用useModel，参数1为/models/test.ts文件名，参数2为性能优化，亦可对返回值进行附加操作后再进行返回
// https://pro.ant.design/zh-CN/docs/simple-model
// const { info } = useModel('test', (model) => ({
//   info: {
//     ...model.info,
//     name: model.info.name + ' asf',
//   },
// }));
export default function useTest() {
  const [info, setInfo] = useState({ name: 'default name' });
  return {
    info,
    setInfo,
  };
}
