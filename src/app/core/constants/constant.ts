import { QueryParamsPagination } from '@core/interfaces';

export enum USER_OPTIONS {
  DARK_THEME = 'DARK_THEME',
  NOTIFICATIONS = 'NOTIFICATIONS',
  FINGERPRINT = 'FINGERPRINT',
}

export const QUERY_PARAMS_PAGINATON: QueryParamsPagination = {
  page: 1,
  take: 16,
  search: null,
  order: 1,
};