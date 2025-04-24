import { useSelector } from 'react-redux';
import type { Content } from '@plone/types';

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
  behavior: string,
  field: string,
) {
  const current = content?.['@components']?.inherit?.[behavior]?.data?.[
    field
  ] as T;

  const formData = useSelector<FormState, T>(
    (state) => state.form.global?.[field],
  );

  const data = formData ?? current;

  return data;
}
