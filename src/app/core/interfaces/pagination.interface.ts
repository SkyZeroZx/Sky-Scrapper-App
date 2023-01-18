export interface Pagination<T> {
  data: T;
  meta: PaginationMetaParams;
}

export interface PaginationMetaParams {
  page?: number;
  take?: number;
  itemCount?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  search?: string;
}

export enum Order {
  ASC = 1,
  DESC = -1,
}

export interface QueryParamsPagination {
  page?: number;
  take?: number;
  search?: string;
  order?: Order;
}
