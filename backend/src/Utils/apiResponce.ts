type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
};

type ApiResponse<T = any> = {
  result: boolean;

  message: string;
  data: T | null;
  pagination?: Pagination;
};

const createApiResponse = <T>(
  result: boolean,

  message: string,
  data: T | null = null,
  pagination?: Pagination
): ApiResponse<T> => {
  return {
    result,

    message,
    data,
    ...(pagination && { pagination }),
  };
};

// Success response with data
const successWithData = <T>(
  message: string,
  data: T,
  pagination?: Pagination
): ApiResponse<T> => {
  return createApiResponse(true, message, data, pagination);
};

// Error response with data
const errorWithData = <T>(message: string, data: T): ApiResponse<T> => {
  return createApiResponse(false, message, data);
};

// Success response without data
const successWithoutData = (message: string): ApiResponse<null> => {
  return createApiResponse(true, message);
};

// Error response without data
const errorWithoutData = (message: string): ApiResponse<null> => {
  return createApiResponse(false, message);
};

export {
  successWithData,
  successWithoutData,
  errorWithData,
  errorWithoutData,
  ApiResponse,
  Pagination,
};
