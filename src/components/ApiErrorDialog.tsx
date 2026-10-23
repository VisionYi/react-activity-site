import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { SWRConfig } from 'swr';
import { ApiError } from '../api/types';
import { ApiErrorContext } from '../context/apiErrorContext';
import './ApiErrorDialog.scss';

function toApiError(error: unknown) {
  if (error instanceof ApiError) return error;
  return new ApiError(error instanceof Error ? error.message : '發生未知錯誤，請稍後再試。');
}

export function ApiErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ApiError | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function reportError(nextError: unknown) {
    setError(toApiError(nextError));
  }

  return (
    <ApiErrorContext.Provider value={reportError}>
      <SWRConfig value={{ onError: reportError }}>
        {children}
        <Dialog
          open={error !== null}
          onClose={() => setError(null)}
          initialFocus={closeButtonRef}
          className="api-error-dialog"
        >
          <div className="api-error-dialog__backdrop" aria-hidden="true" />
          <div className="api-error-dialog__container">
            <DialogPanel className="api-error-dialog__panel">
              <DialogTitle className="api-error-dialog__title">發生錯誤</DialogTitle>
              {error && (
                <>
                  <p className="api-error-dialog__message">{error.message}</p>
                  {error.status !== undefined && (
                    <p className="api-error-dialog__status">錯誤代碼：{error.status}</p>
                  )}
                </>
              )}
              <div className="api-error-dialog__actions">
                <button
                  ref={closeButtonRef}
                  className="button button--accent"
                  type="button"
                  onClick={() => setError(null)}
                >
                  關閉
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </SWRConfig>
    </ApiErrorContext.Provider>
  );
}
