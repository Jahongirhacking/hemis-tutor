import { localStorageNames } from '@/utils/storageFunc';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';
import { t } from 'i18next';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  // (api: MiddlewareAPI) => (next) => (action: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => next => (action: any) => {
    // RTK Query uses createAsyncThunk from redux-toolkit under the hood, so we're able to utilize these matchers!
    const status = action.payload?.status;

    console.log(action, 'action');

    if (isRejectedWithValue(action)) {
      // ✅ Skip if flagged
      const headers = action?.meta?.baseQueryMeta?.request?.headers;
      if (
        headers instanceof Headers &&
        [...headers.entries()]?.find(
          h => h?.[0] === 'x-skip-error-logger'
        )?.[1] === 'true'
      ) {
        return next(action);
      }

      const error_message =
        action.payload?.data?.description ??
        action.payload?.data?.exception?.message ??
        action.payload?.data?.errors?.[0]?.message ??
        '';

      console.log(error_message, 'err');

      if (error_message) {
        message.destroy();
        message.warning(error_message);
        if (
          error_message ===
          'Your request was made with invalid or expired JSON Web Token.'
        ) {
          localStorage.removeItem(localStorageNames.HEMIS_TOKEN);
          window.location.href = '/';
        }
      }

      message.destroy();
      if (status === 500 || status === 422) {
        message.warning(
          "Server bilan bog'liq xatolik. Iltimos bu haqida ma'sul xodimlarga xabar bering"
        );
      } else if (status === 401 || status === 403) {
        window.location.href = '/';
        message.destroy();
        message.warning('Iltimos avval tizimga kiring!');
      } else if (action.payload.status === 'FETCH_ERROR') {
        message.destroy();
        message.warning(
          `${t('const.sorry')}, ${t('const.problem_with_server')} ${t('const.try_again_later')}`
        );
      }
    }

    return next(action);
  };
