import { useContext } from 'react';
import { ApiErrorContext } from '../context/apiErrorContext';

export function useApiError() {
  const reportError = useContext(ApiErrorContext);
  if (!reportError) throw new Error('useApiError 必須在 ApiErrorProvider 內使用。');
  return reportError;
}
