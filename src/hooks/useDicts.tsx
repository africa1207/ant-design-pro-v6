import { useState, useEffect } from 'react';
import { useModel } from '@umijs/max';

type DictsType = API.DictsType;

/**
 * 获取数据字典hook
 * @param dictKeys
 * @description 不传入dictKeys则返回全部dicts，传入则返回指定的dicts
 */
export function useDicts(dictKeys?: string[]) {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [dicts, setDicts] = useState<DictsType>({});

  useEffect(() => {
    const fetchDicts = async () => {
      try {
        const data = await initialState?.fetchDicts?.();
        setDicts(data!);
        setInitialState({
          ...initialState,
          dicts: data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (!initialState?.dicts) {
      fetchDicts();
    } else {
      setDicts(initialState.dicts);
    }
  }, []);

  if (dictKeys) {
    const filteredDicts: API.DictsType = {};
    dictKeys.forEach((key) => {
      if (dicts[key]) {
        filteredDicts[key] = dicts[key];
      }
    });
    return filteredDicts;
  }

  return dicts;
}
