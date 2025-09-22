import { useSelector } from 'react-redux';
import type { Content } from '@plone/types';
import { useLocation } from 'react-router-dom';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

export function useLiveData<T>(
  content: Content,
  behavior: string | undefined,
  field: string,
) {
  const location = useLocation();
  const addMode = location?.pathname?.endsWith('/add');
  const current = behavior
    ? content?.['@components']?.inherit?.[behavior]?.data?.[field]
    : (content[field] as T);

  const formData = useSelector<FormState, T>((state) => {
    return state.form.global?.[field];
  });

  if (addMode) return formData;

  const data = formData ?? current;

  return data;
}
