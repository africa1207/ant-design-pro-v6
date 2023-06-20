import { useModel } from '@umijs/max';
import localforage from 'localforage';

export default function () {
  const { initialState, setInitialState } = useModel('@@initialState');
  const clearAccount = async () => {
    await setInitialState({ ...initialState, currentUser: {} });
    await localforage.removeItem(TOKEN_KEY);
  };

  return { clearAccount };
}
