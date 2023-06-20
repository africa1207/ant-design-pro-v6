type TransformedDict = Record<string, Record<string, string>>;

/**
 * 将数据字典转换为map形式，便于使用ProFormSelect的valueEnum属性
 * @example 如果不传key，则直接返回{user:{"1":"one","2":"two"}}，传入key则取指定值{"1":"one","2":"two"}，不存在则返回{}
 * @param dicts  {user: [{label:"one",value:"1"},{label:"two",value:"2"}]}
 */
export default function convertDictToMap(dicts: API.DictsType): TransformedDict;
export default function convertDictToMap(dicts: API.DictsType, key: string): Record<string, string>;
export default function convertDictToMap(
  dicts: API.DictsType,
  key?: string,
): TransformedDict | Record<string, string> {
  if (!key && !Object.keys(dicts).length) {
    return {};
  }

  const transformedDict: TransformedDict = {};
  Object.entries(dicts).forEach(([k, v]) => {
    const obj = {};
    v.forEach((item) => {
      // @ts-ignore
      obj[item.value] = item.label;
    });
    transformedDict[k] = obj;
  });

  if (!key) {
    return transformedDict;
  }

  const values = transformedDict[key];
  if (!values) {
    return {};
  }

  const result = {};
  Object.entries(values).forEach(([k, v]) => {
    // @ts-ignore
    result[k] = v;
  });

  return result;
}
