import { useSelector } from 'react-redux';
import type { Content } from '@plone/types';
import { useLocation } from 'react-router-dom';

type FormState = {
  content: {
    data: Content;
  };
  errorContext: Content;
  form: {
    global: Content;
  };
};

export function useLiveData<T>(
  content: Content,
  behavior: string | undefined,
  field: string,
) {
  const errorContext = useSelector((state: FormState) => state.errorContext);
  const context = content ?? errorContext;

  const location = useLocation();
  const addMode = location?.pathname?.endsWith('/add');

  const current = behavior
    ? (context?.['@components']?.inherit?.[behavior]?.data?.[field] as T)
    : (context[field] as T);

  const formData = useSelector<FormState, T>(
    (state) => state.form.global?.[field],
  );

  if (addMode && !behavior) return formData;

  const data = formData ?? current;

  return data;
}
