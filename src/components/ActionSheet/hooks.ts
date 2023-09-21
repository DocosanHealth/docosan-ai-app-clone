import { useDispatch } from 'react-redux';
import { appStateUpdate } from '@/store/appState/AppStateRedux';

export function useActionSheet() {
  const dispatch = useDispatch();

  const showActionSheet = (
    title: string,
    options: Array<{ title: string; onPress: () => void }>,
  ) => {
    dispatch(
      appStateUpdate({ actionSheet: { visible: true, title, options } }),
    );
  };

  return {
    showActionSheet,
  };
}
